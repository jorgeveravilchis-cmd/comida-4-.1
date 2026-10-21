/* =====================================================
   Tiza Food - Servidor opcional (sin dependencias)
   Uso:  node server.js   ->  abre http://localhost:3000
   Sirve la app y guarda reseñas y pedidos en db.json.
   Si no lo usas, la app funciona igual guardando en el navegador.
   ===================================================== */
const http = require("http");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
// En una copia nueva, crea datos locales vacíos desde los ejemplos del repositorio.
// Nunca reemplaza los datos que ya existen.
for (const name of ['db','usuarios']) {
  const localFile=path.join(ROOT,name+'.json');
  if (!fs.existsSync(localFile)) fs.copyFileSync(path.join(ROOT,name+'.example.json'),localFile,fs.constants.COPYFILE_EXCL);
}
const DB_FILE = path.join(ROOT, "db.json");
const USERS_FILE = path.join(ROOT, "usuarios.json");
const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".webp": "image/webp", ".gif": "image/gif", ".svg": "image/svg+xml", ".ico": "image/x-icon"
};
const PRIVATE = new Set(["/db.json", "/usuarios.json", "/server.js", "/access.js"]);   // no se descargan directo (db.json tiene pedidos)

const readDB = () => { try { return JSON.parse(fs.readFileSync(DB_FILE, "utf8")); } catch (e) { return {}; } };
function writeDB(db) {
  const tmp = DB_FILE + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(db, null, 2));
  fs.renameSync(tmp, DB_FILE);
}
const send = (res, code, data) => {
  res.writeHead(code, { "Content-Type": TYPES[".json"], "Cache-Control": "no-store" });
  res.end(JSON.stringify(data));
};
const clean = (v, n) => String(v == null ? "" : v).slice(0, n);

function readBody(req) {
  return new Promise((resolve, reject) => {
    let s = "";
    req.on("data", (c) => { s += c; if (s.length > 1e6) { reject(new Error("demasiado grande")); req.destroy(); } });
    req.on("end", () => { try { resolve(s ? JSON.parse(s) : {}); } catch (e) { reject(e); } });
    req.on("error", reject);
  });
}

// Lo que ve cualquiera: catálogo y reseñas (sin pedidos ni correos)
function publicDB(db) {
  const out = Object.assign({}, db);
  delete out.orders;
  out.reviews = (db.reviews || []).map((r) => { const c = Object.assign({}, r); delete c.owner; return c; });
  return out;
}

const FoodManagement = require("./management");
const access = require("./access")(__dirname, { send, readBody, readDB, writeDB });
async function api(req, res, url) {
  if (await access.handler(req, res, url)) return;
  const db = readDB();
  if (req.method === "GET" && url.pathname === "/api/db") return send(res, 200, publicDB(db));

  if (req.method === "POST" && url.pathname === "/api/reviews") {
    const b = await readBody(req);
    const stars = Number(b.stars);
    if (!(stars >= 1 && stars <= 5) || clean(b.comment, 400).trim().length < 3 || !clean(b.product, 100)) return send(res, 400, { error: "reseña inválida" });
    const review = {
      id: clean(b.id, 40) || String(Date.now()), user: clean(b.user, 40) || "Cliente", product: clean(b.product, 100),
      stars: Math.round(stars), comment: clean(b.comment, 400), date: clean(b.date, 40) || new Date().toISOString(), owner: clean(b.owner, 120)
    };
    db.reviews = (db.reviews || []).filter((r) => String(r.id) !== review.id).concat(review);
    writeDB(db);
    return send(res, 201, { ok: true });
  }

  const del = url.pathname.match(/^\/api\/reviews\/([^/]+)$/);
  if (req.method === "DELETE" && del) {
    const id = decodeURIComponent(del[1]);
    const owner = url.searchParams.get("owner") || "";
    const before = (db.reviews || []).length;
    db.reviews = (db.reviews || []).filter((r) => !(String(r.id) === id && owner && r.owner === owner));
    if (db.reviews.length !== before) writeDB(db);
    return send(res, 200, { ok: true });
  }

  if (req.method === "POST" && url.pathname === "/api/orders") {
    const b = await readBody(req);
    const customer = access.current(req);
    if (!customer) return send(res, 401, { error: "Inicia sesión para pedir." });
    if ((db.orders || []).some(o => o.folio === b.folio && o.owner !== customer.email)) return send(res, 403, { error: "Pedido de otra cuenta." });
    if (typeof b.folio !== "string" || !Array.isArray(b.items)) return send(res, 400, { error: "pedido inválido" });
    if (!(db.orders || []).some(o=>o.folio===b.folio)) Object.assign(b,FoodManagement.pricing(b.items,b.fee,b.couponCode));
    // Nunca se guardan datos de tarjeta: solo marca y últimos 4 dígitos
    const payment = b.payment ? { method: clean(b.payment.method, 20), brand: clean(b.payment.brand, 20), last4: clean(b.payment.last4, 4), status: b.payment.method === "Efectivo" ? "Pendiente de cobro" : b.payment.method === "Transferencia" ? "Pendiente de verificación" : "" } : null;
    if (payment && payment.method === "Efectivo") {
      const amount = b.payment.cashAmount, total = b.total;
      if (typeof amount !== "number" || !Number.isFinite(amount) || amount <= 0 || !Number.isSafeInteger(Math.round(amount * 100)) || Math.abs(amount * 100 - Math.round(amount * 100)) > 0.00001 || typeof total !== "number" || !Number.isFinite(total) || total < 0 || !Number.isSafeInteger(Math.round(total * 100)) || Math.round(amount * 100) < Math.round(total * 100)) {
        return send(res, 400, { error: "La cantidad en efectivo debe ser válida y cubrir el total." });
      }
      payment.cashAmount = Math.round(amount * 100) / 100;
      payment.change = (Math.round(amount * 100) - Math.round(total * 100)) / 100;
    }
    if (payment && payment.method === "Transferencia") {
      const config = db.transfer || {};
      if (!String(config.bank || "").trim() || !String(config.holder || "").trim() || (config.demo !== true && !/^\d{18}$/.test(String(config.clabe || "").trim()))) return send(res, 400, { error: "Datos bancarios pendientes de configurar." });
      const reference = typeof b.payment.reference === "string" ? b.payment.reference.trim() : "";
      if (reference.length < 3 || reference.length > 100 || /[\u0000-\u001f\u007f]/.test(reference)) return send(res, 400, { error: "Referencia de transferencia inválida." });
      payment.reference = reference;
      payment.demo = config.demo === true;
    }
    const order = FoodManagement.accept((db.orders || []).find(o => o.folio === b.folio), Object.assign({}, b, { payment: payment }), db, customer);
    db.orders = [order].concat((db.orders || []).filter((o) => o.folio !== order.folio)).slice(0, 500);
    writeDB(db);
    return send(res, 201, { ok: true, order });
  }

  return send(res, 404, { error: "no existe" });
}

function serveStatic(req, res, url) {
  let p = decodeURIComponent(url.pathname);
  if (p === "/") p = "/index.html";
  if (PRIVATE.has("/" + p.replace(/\\/g, "/").split("/").pop()) || p.endsWith(".tmp")) { res.writeHead(404); return res.end("No encontrado"); }
  const file = path.join(ROOT, path.normalize(p));
  if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end("Prohibido"); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end("No encontrado"); }
    res.writeHead(200, { "Content-Type": TYPES[path.extname(file).toLowerCase()] || "application/octet-stream", "Cache-Control": "no-store" });
    res.end(data);
  });
}

http.createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");
  if (url.pathname.startsWith("/api/")) {
    api(req, res, url).catch((err) => send(res, 400, { error: err.message || "Solicitud inválida." }));
  } else {
    serveStatic(req, res, url);
  }
}).listen(PORT, () => console.log("Tiza Food listo en http://localhost:" + PORT));
