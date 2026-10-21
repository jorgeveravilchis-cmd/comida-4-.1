/* =====================================================
   Tiza Food - App de comida rápida (Tizayuca, Hidalgo)
   ===================================================== */

/* ---------- DATOS ---------- */

const PRODUCTS = [
  { id: 1,  name: "Hamburguesa Clásica", cat: "Hamburguesas", price: 59, img: "img/hamburguesa.jpg",
    desc: "Carne de res a la parrilla, queso, lechuga, jitomate y nuestra salsa especial.", rating: 4.7,
    reviews: [{ user: "jin s.", stars: "⭐⭐⭐⭐⭐", comment: "Súper crujientes y calientitas." }] },
  { id: 2,  name: "Doble Queso",         cat: "Hamburguesas", price: 79, img: "img/doble-queso.jpg",
    desc: "Doble carne, doble queso cheddar, cebolla caramelizada y pan de mantequilla.", rating: 5.0,
    reviews: [{ user: "yoongi m.", stars: "⭐⭐⭐⭐⭐", comment: "Muy buenas la recomiendo." }] },
  { id: 3,  name: "Pollo Crujiente",     cat: "Hamburguesas", price: 69, img: "img/pollo.jpg",
    desc: "Pechuga empanizada y crujiente con mayonesa de chipotle y lechuga fresca.", rating: 5.0,
    reviews: [{ user: "Luis R.", stars: "⭐⭐⭐⭐⭐", comment: "Súper crujientes y me llegaron en buen estado." }] },
  { id: 11, name: "Hamburguesa BBQ",     cat: "Hamburguesas", price: 75, img: "img/bbq.jpg",
    desc: "Carne de res, aros de cebolla, tocino y salsa BBQ ahumada.", rating: 4.8, reviews: [] },
  { id: 12, name: "Hamburguesa Hawaiana", cat: "Hamburguesas", price: 72, img: "img/hawaiana-burger.jpg",
    desc: "Carne de res con piña asada, jamón y queso derretido.", rating: 4.4, reviews: [] },
  { id: 4,  name: "Hot Dog Jumbo",       cat: "Snacks",       price: 39, img: "img/hotdog.jpg",
    desc: "Salchicha jumbo, tocino, cebolla, jitomate y aderezos al gusto.", rating: 3.7,
    reviews: [{ user: "hoseok j.", stars: "⭐⭐⭐⭐⭐", comment: "Súper buenas 10/10 y calientitas." }] },
  { id: 5,  name: "Papas Grandes",       cat: "Snacks",       price: 35, img: "img/papas.jpg",
    desc: "Papas doradas y crujientes con sal. Perfectas para compartir.", rating: 4.8,
    reviews: [{ user: "jimin p.", stars: "⭐⭐⭐⭐⭐", comment: "Súper crujientes y calientitas." }] },
  { id: 6,  name: "Nuggets (10 pzas)",   cat: "Snacks",       price: 55, img: "img/nuggets.jpg",
    desc: "Diez nuggets de pollo con dos salsas a elegir: BBQ o mostaza miel.", rating: 5.0,
    reviews: [{ user: "Taehyung k.", stars: "⭐⭐⭐⭐⭐", comment: "Igual a la imagen, recomiendo 10/10." }] },
  { id: 7,  name: "Alitas (8 pzas)",     cat: "Snacks",       price: 89, img: "img/alitas.jpg",
    desc: "Ocho alitas bañadas en salsa BBQ o búfalo, con aderezo ranch.", rating: 4.5,
    reviews: [{ user: "jungkook j.", stars: "⭐⭐⭐⭐⭐", comment: "Tienen un sabor bueno pero pueden mejorar." }] },
  { id: 15, name: "Aros de Cebolla",     cat: "Snacks",       price: 42, img: "img/aros.jpg",
    desc: "Aros empanizados y dorados con aderezo ranch.", rating: 4.5, reviews: [] },
  { id: 16, name: "Nachos con Queso",    cat: "Snacks",       price: 49, img: "img/nachos.jpg",
    desc: "Totopos crujientes con queso cheddar derretido y jalapeños.", rating: 4.6, reviews: [] },
  { id: 17, name: "Tacos al Pastor (5)", cat: "Snacks",       price: 75, img: "img/tacos.jpg",
    desc: "Cinco tacos al pastor con piña, cebolla, cilantro y salsa verde.", rating: 4.9, reviews: [] },
  { id: 8,  name: "Pizza de carne",      cat: "Pizzas",       price: 120, img: "img/pizza.jpg",
    desc: "Pizza individual de carne con mucho queso mozzarella.", rating: 4.0,
    reviews: [{ user: "Loki R.", stars: "⭐⭐⭐⭐⭐", comment: "Muy buena para comer en familia y disfrutar en casa." }] },
  { id: 8,  name: "Pizza tradicional/casera",      cat: "Pizzas",       price: 100, img: "img/Pizza casera.jpg",
    desc: "Pizza casera de peperoni con mucho queso mozzarella y orillas rellenas de queso.", rating: 4.5, reviews: []},
  { id: 13, name: "Pizza Hawaiana",      cat: "Pizzas",       price: 75, img: "img/pizza-hawaiana.jpg",
    desc: "Jamón, piña y queso mozzarella sobre masa recién horneada.", rating: 4.3, reviews: [] },
  { id: 14, name: "Pizza Mexicana",      cat: "Pizzas",       price: 80, img: "img/pizza-mexicana.jpg",
    desc: "Chorizo, jalapeño, cebolla y frijoles con queso mozzarella.", rating: 4.6, reviews: [] },
  { id: 9,  name: "Refresco Grande",     cat: "Bebidas",      price: 25, img: "img/refresco.jpg",
    desc: "Refresco frío de 600 ml. Pregunta por el sabor del día.", rating: 3.7,
    reviews: [{ user: "maria R.", stars: "⭐⭐⭐⭐⭐", comment: "Buena" }] },
  { id: 10, name: "Malteada de Fresa",   cat: "Bebidas",      price: 45, img: "img/malteada.jpg",
    desc: "Malteada cremosa de fresa con crema batida.", rating: 4.6,
    reviews: [{ user: "Luis R.", stars: "⭐⭐⭐⭐⭐", comment: "Súper dulce 10/10." }] },
  { id: 18, name: "Malteada de Chocolate", cat: "Bebidas",    price: 45, img: "img/malteada-chocolate.jpg",
    desc: "Malteada espesa de chocolate con crema batida.", rating: 4.7, reviews: [] },
  { id: 19, name: "Limonada Mineral",    cat: "Bebidas",      price: 30, img: "img/limonada.jpg",
    desc: "Limonada natural con agua mineral y mucho hielo.", rating: 4.4, reviews: [] },
  { id: 20, name: "Agua de Horchata",    cat: "Bebidas",      price: 28, img: "img/horchata.jpg",
    desc: "Horchata fresca de arroz con canela. 600 ml.", rating: 4.5, reviews: [] },
  { id: 21, name: "Pay de Limón", cat: "Postres", price: 38, img: "img/pay-limon.jpg", 
    desc: "Rebanada de pay de limón cremoso con base de galleta.", rating: 4.8, reviews: [] },
  { id: 22, name: "Frappé de Café", cat: "Cafés", price: 45, img: "img/frappe.jpg", 
    desc: "Café frío blended con crema batida y toque de caramelo.", rating: 4.9, reviews: [] },
  { name: "Combo Pareja",         cat: "Combos",       price: 159, img: "img/combopareja.jpg", tag: "save", tagText: "Ahorra $30",
    short: "2 hamburguesas + papas + 2 refrescos", desc: "Dos hamburguesas clásicas, papas grandes para compartir y dos refrescos fríos." },
  { name: "Combo Familiar",       cat: "Combos",       price: 239, img: "img/combo-familiar.webp", tag: "popular", tagText: "FAMILIAR",
    short: "Pizza + 8 alitas + refresco 2 L", desc: "Pizza grande de pepperoni, ocho alitas BBQ o búfalo y refresco de 2 litros." },


  // ---- MÁS OPCIONES ----
  
  { id: 21, name: "Helado de Vainilla", cat: "Postres", price: 35, img: "img/helado.jpg", more: true,
    desc: "Tres bolas de helado cremoso de vainilla con galleta.", rating: 4.6, reviews: [] },
  { id: 22, name: "Brownie con Helado", cat: "Postres", price: 55, img: "img/brownie.jpg", more: true,
    desc: "Brownie tibio de chocolate con bola de helado y salsa de chocolate.", rating: 4.9, reviews: [] },
  { id: 23, name: "Pastel de Chocolate", cat: "Postres", price: 49, img: "img/pastelchot.jpg", more: true, 
    desc: "Rebanada de pastel de chocolate húmedo con betún cremoso.", rating: 4.7, reviews: [] },
  { id: 24, name: "Churros (6 pzas)", cat: "Postres", price: 45, img: "img/churros.jpg", more: true,
    desc: "Seis churros crujientes con azúcar y canela, con cajeta o chocolate para mojar.", rating: 4.8, reviews: [] },
  { id: 25, name: "Waffle con Fresas", cat: "Postres", price: 59, img: "img/waffle.jpg", more: true, 
    desc: "Waffle dorado con fresas, crema batida y miel.", rating: 4.5, reviews: [] },
  { id: 26, name: "Flan Napolitano", cat: "Postres", price: 38, img: "img/flan.jpg", more: true,
    desc: "Flan casero con caramelo, suave y cremoso.", rating: 4.4, reviews: [] },
  { id: 27, name: "Galletas (3 pzas)", cat: "Postres", price: 30, img: "img/galletas.jpg", more: true,
    desc: "Tres galletas grandes con chispas de chocolate, recién horneadas.", rating: 4.3, reviews: [] },
  { id: 28, name: "Brochetas de frutas", cat: "Dulces", price: 25, img: "img/dulces.webp", more: true,
    desc: "Ricas brochetas de frutas con chocolate", rating: 5.0, reviews: [] },
  { id: 29, name: "Brochetas de Dulce", cat: "Dulces", price: 25, img: "img/dulces.jpg", more: true,
    desc: "Mix de gomitas y dulces enchilados.", rating: 4.5, reviews: [] },
  { id: 30, name: "Revanadas de pastel", cat: "Postres", price: 30, img: "img/revanadas de pastel.jpg", more: true,
    desc: "Ricas revanadas de pastel.", rating: 3.5, reviews: [] },
  { id: 31, name: "Pastel", cat: "Postres", price: 150, img: "img/pastel.jpg", more: true,
    desc: "Rico pastel completo de chocolate y fresa.", rating: 4.8, reviews: [] },


  { id: 33, name: "Té Helado de Durazno", cat: "Bebidas", price: 28, img: "img/te.jpg", more: true,
    desc: "Té negro frío con sabor a durazno. 600 ml.", rating: 4.2, reviews: [] },
  { id: 34, name: "Jugo de Naranja", cat: "Bebidas", price: 32, img: "img/jugo.jpg", more: true,
    desc: "Jugo de naranja natural recién exprimido. 500 ml.", rating: 4.7, reviews: [] },
  { id: 35, name: "Agua Natural", cat: "Bebidas", price: 15, img: "img/agua.jpg", more: true,
    desc: "Botella de agua natural de 600 ml.", rating: 4.0, reviews: [] },
  { id: 36, name: "Frappé de Oreo", cat: "Bebidas", price: 52, emoji: "🥤", img: "img/frappe.jpg", more: true,
    desc: "Frappé helado de galleta Oreo con crema batida.", rating: 4.8, reviews: [] },
  { id: 37, name: "Capuchino", cat: "Cafés", price: 40 , img: "img/capuchino.jpg", 
    desc: "Rico capuchino caliente, algo rico que refresca el alma.", rating: 4.9, reviews: [] },
  { id: 38, name: "Chocolate caliente", cat: "Cafés", price: 40 , img: "img/chocolate.jpg", 
    desc: "Rico chocolate caliente, rica bedida para las temporadas de frio .", rating: 5.0, reviews: [] },
  { id: 39, name: "Cafe frio", cat: "Cafés", price: 40 , img: "img/cafefrio.jpg", 
    desc: "Rico cafe frio, mucho mas dulce, sin amargar y con doble cafeina.", rating: 5.0, reviews: [] },

  { id: 40, name: "Hamburguesa Vegetariana", cat: "Hamburguesas", price: 69, img: "img/veggie.jpg", more: true,
    desc: "Medallón de lentejas y avena con aguacate, jitomate y lechuga.", rating: 4.4, reviews: [] },
  { id: 41, name: "Mini Burgers (3 pzas)", cat: "Hamburguesas", price: 65,  img: "img/mini-bu.jpg", more: true,
    desc: "Tres mini hamburguesas con queso, ideales para compartir.", rating: 4.6, reviews: [] },
  { id: 42, name: "Esquites", cat: "Snacks", price: 35, img: "img/esquites.jpg", more: true,
    desc: "Elote en vaso con mayonesa, queso, chile y limón.", rating: 4.5, reviews: [] },
  { id: 43, name: "Dedos de Queso (6)", cat: "Snacks", price: 45, img: "img/dedos-queso.jpg", more: true,
    desc: "Seis dedos de queso mozzarella empanizados con salsa marinara.", rating: 4.6, reviews: [] },
  { id: 44, name: "Pizza 4 Quesos", cat: "Pizzas", price: 85, img: "img/pizza-4quesos.jpg", more: true,
    desc: "Mozzarella, cheddar, parmesano y queso crema sobre masa artesanal.", rating: 4.7, reviews: [] },
  { id: 45, name: "Pizza Familiar", cat: "Pizzas", price: 150, img: "img/pizza-familiar.jpg", more: true,
    desc: "Pizza grande de 8 rebanadas, elige tu especialidad.", rating: 4.8, reviews: [] },
  { name: "Combo Kids",           cat: "Combos",       price: 69,  img: "img/combo-kids.jpg", tag: "bestseller", tagText: "KIDS",
    short: "6 nuggets + papas + jugo", desc: "Seis nuggets de pollo, papas chicas y jugo. Incluye sorpresa." }
];

// Ingredientes extras
const EXTRAS = {
  "Hamburguesas": [
    { name: "Extra queso", price: 15 }, { name: "Carne extra", price: 25 }, { name: "Tocino crujiente", price: 20 },
    { name: "Aguacate", price: 15 },    { name: "Jalapeños", price: 8 }
  ],
  "Snacks": [
    { name: "Queso cheddar", price: 12 }, { name: "Salsa extra", price: 5 }, { name: "Tocino", price: 15 }, { name: "Aderezo ranch", price: 8 }
  ],
  "Pizzas": [
    { name: "Extra queso", price: 20 }, { name: "Peperoni extra", price: 20 }, { name: "Champiñones", price: 15 }, { name: "Orilla rellena", price: 25 }
  ],
  "Bebidas": [
    { name: "Crema batida", price: 10 }, { name: "Shot de chocolate", price: 12 }, { name: "Tamaño grande", price: 10 }
  ],
  "Postres": [
    { name: "Bola de helado", price: 15 }, { name: "Cajeta", price: 8 }, { name: "Crema batida", price: 10 }, { name: "Chispas de chocolate", price: 8 }
  ],
  "Combos": [
    { name: "Extra queso", price: 15 }, { name: "Papas grandes", price: 15 }, { name: "Salsa extra", price: 5 }, { name: "Cambiar a malteada", price: 20 }
  ],
  "Postres": [
    { name: "fresa extras", price: 14 }, { name: "mermedala", price: 15 }, { name: "extra chocolate", price: 9 }
  ],
  "Dulces": [
    { name: "fresa extras", price: 10 }, { name: "chispas", price: 15 }, { name: "extra dulces", price: 10 }
  ],
  "Cafés": [
    { name: "leche", price: 20 }, { name: "crema batida", price: 19 }, { name: "mas azucarado", price: 5 }
  ]
};

// Promociones 
const PROMOS = [
  { name: "Hamburguesa Especial", cat: "Hamburguesas", price: 85,  img: "img/hamburguesa.jpg", tag: "bestseller", tagText: "MÁS VENDIDO",
    short: "Carne de res + Queso + Tocino", desc: "Jugosa carne de res a la parrilla con queso fundido, lechuga fresca y jitomate." },
  { name: "Pizza Peperoni",       cat: "Pizzas",       price: 120, img: "img/pizza.jpg", tag: "popular", tagText: "POPULAR",
    short: "Queso Mozzarella + Peperoni", desc: "Masa crujiente horneada al momento con abundante queso mozzarella y peperoni." },
  { name: "Papas Preparadas",     cat: "Snacks",       price: 45,  img: "img/papas.jpg",  tag: "save", tagText: "Ahorra hasta el 15%",
    short: "Crujientes con Especias", desc: "Papas a la francesa doraditas y sazonadas con especias de la casa." },
  { name: "Combo Pareja",         cat: "Combos",       price: 159, img: "img/combopareja.jpg", tag: "save", tagText: "Ahorra $30",
    short: "2 hamburguesas + papas + 2 refrescos", desc: "Dos hamburguesas clásicas, papas grandes para compartir y dos refrescos fríos." },
  { name: "Combo Familiar",       cat: "Combos",       price: 239, img: "img/combo-familiar.webp", tag: "popular", tagText: "FAMILIAR",
    short: "Pizza + 8 alitas + refresco 2 L", desc: "Pizza grande de pepperoni, ocho alitas BBQ o búfalo y refresco de 2 litros." },
  { name: "Combo Kids",           cat: "Combos",       price: 69,  img: "img/combo-kids.jpg", tag: "bestseller", tagText: "KIDS",
    short: "6 nuggets + papas + jugo", desc: "Seis nuggets de pollo, papas chicas y jugo. Incluye sorpresa." },
  { name: "2x1 en Hot Dogs",      cat: "Snacks",       price: 59,  img: "img/hotdog.jpg",  tag: "save", tagText: "2x1",
    short: "Dos hot dogs jumbo", desc: "Dos hot dogs jumbo con tocino, cebolla, jitomate y aderezos al gusto." },
  { name: "Martes de Alitas",     cat: "Snacks",       price: 75,  img: "img/alitas.jpg", tag: "popular", tagText: "-15%",
    short: "8 alitas BBQ o búfalo", desc: "Ocho alitas bañadas en la salsa que elijas, con aderezo ranch." },
  { name: "Combo Taquero",        cat: "Combos",       price: 99,  img: "img/tacos.jpg", tag: "bestseller", tagText: "NUEVO",
    short: "5 tacos al pastor + 2 refrescos", desc: "Cinco tacos al pastor con piña y salsa verde, más dos refrescos." },
  { name: "Helados",        cat: "Dulces",       price: 25,  img: "img/helado.jpg", tag: "bestseller", tagText: "NUEVO ",
    short: "Helado sabor fresa, vainilla y chocolate", desc: "Llevate un helados con el descuento del 10% " },
  { name: "Malteada Doble",       cat: "Bebidas",      price: 69,  img: "img/malteada.jpg", tag: "save", tagText: "Ahorra hasta 25%",
    short: "2 malteadas a elegir", desc: "Dos malteadas cremosas con crema batida. Elige fresa o chocolate." }
];

const BRANCHES = [
  { name: "Sucursal Centro",        zone: "Centro, Tizayuca",             km: 0.8 },
  { name: "Sucursal Haciendas",     zone: "Haciendas de Tizayuca",        km: 2.4 },
  { name: "Sucursal Tizayuca Sur",  zone: "Carretera México-Pachuca",     km: 3.9 },
  { name: "Sucursal Ex Hacienda",   zone: "Fracc. Ex Hacienda, Tizayuca", km: 5.5 }
];

const feeOf = (b) => Math.round(15 + b.km * 5);
const etaOf = (b) => Math.round(15 + b.km * 4);
const etaText = (b) => etaOf(b) + "–" + (etaOf(b) + 10) + " min";


const DRIVERS = ["Luis Hernández", "Mario Cruz", "Diego Ramírez", "Pedro Sánchez", "Carlos Vega"];


const DEMO_SEGUNDOS = true;
const STAGES = [
  { name: "Pedido recibido", icon: "✅", sub: "Tu pedido llegó a la sucursal",   at: 0,  frac: 0 },
  { name: "En preparación",  icon: "👨‍🍳", sub: "Estamos cocinando tu comida",      at: 6,  frac: 0.15 },
  { name: "En camino",       icon: "🛵", sub: "El repartidor va hacia tu casa",   at: 36, frac: 0.45 },
  { name: "Entregado",       icon: "🎉", sub: "¡Que lo disfrutes!",               at: 96, frac: 1 }
];

/* ----------  mapa regsitro de lugares o sitios ---------- */

const $ = (sel, root) => (root || document).querySelector(sel);
const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
const money = (n) => "$" + Number(n).toFixed(2);

function esc(text) {
  return String(text).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

function load(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch (e) { return fallback; }
}
function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { }
}

let toastTimer = null;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
}

function setFrame(frame, url) {
  if (frame.dataset.url !== url) { frame.dataset.url = url; frame.src = url; }
}
const enc = encodeURIComponent;
const branchQuery = (b) => b.name + ", " + b.zone + ", Tizayuca, Hidalgo";
const addressQuery = (a) => a + ", Tizayuca, Hidalgo, México";
const mapPlaceUrl = (b) => "https://maps.google.com/maps?q=" + enc(branchQuery(b)) + "&z=14&output=embed";
const destQuery = (d) => (d.coords ? d.coords : addressQuery(d.text));
const mapRouteUrl = (b, d) => "https://maps.google.com/maps?saddr=" + enc(branchQuery(b)) + "&daddr=" + enc(destQuery(d)) + "&output=embed";
const mapRouteLink = (b, d) => "https://www.google.com/maps/dir/?api=1&origin=" + enc(branchQuery(b)) + "&destination=" + enc(destQuery(d));

function mediaHTML(p) {
  return '<img src="' + esc(p.img) + '" alt="' + esc(p.name) + '" loading="lazy" ' +
         "onerror=\"this.outerHTML='<span class=&quot;emoji&quot;>" + p.emoji + "</span>'\">";
}

/* ----------  ESTADO ---------- */

const state = {
  user: load("tizafood_user", null),
  orders: load("tizafood_orders", []),
  cart: load("tizafood_cart", []),
  favs: load("tizafood_favs", []),
  branch: Math.min(load("tizafood_branch", 0), BRANCHES.length - 1),
  cat: "Todo",
  query: "",
  menuQuery: "",    
  view: "home",
  checkout: null    
};

/* ---------- BASE DE DATOS (db.json) ---------- */

let dbSource = "local";

const normReview = (r) => ({
  id: String(r.id), user: String(r.user || "Cliente"), product: String(r.product || ""), comment: String(r.comment || ""),
  date: r.date || null, mine: false, stars: Math.max(1, Math.min(5, Number(r.stars) || 5))
});

let transferConfig = { bank: "", holder: "", clabe: "" };
function applyDB(db) {
  if (!db || typeof db !== "object") return;
  const put = (arr, src) => { if (Array.isArray(src)) arr.splice(0, arr.length, ...src); };
  if (db.transfer && typeof db.transfer === "object") transferConfig = { bank: String(db.transfer.bank || "").trim(), holder: String(db.transfer.holder || "").trim(), clabe: String(db.transfer.clabe || "").trim(), demo: db.transfer.demo === true };
  put(PRODUCTS, db.products);
  put(PROMOS, db.promos);
  put(BRANCHES, db.branches);
  if (db.extras && typeof db.extras === "object") {
    Object.keys(EXTRAS).forEach((k) => delete EXTRAS[k]);
    Object.assign(EXTRAS, db.extras);
  }
  if (Array.isArray(db.reviews)) {
    const list = db.reviews.map(normReview).sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
    SEED_REVIEWS.splice(0, SEED_REVIEWS.length, ...list);
  }
  state.branch = Math.max(0, Math.min(state.branch, BRANCHES.length - 1));
}

async function loadDB() {
  if (location.protocol === "file:" && !window.localSchoolDemo) {
    // La vista local utiliza únicamente los datos públicos de demostración.
    const preview = $("#transferDemoConfig");
    if (preview) {
      try {
        const transfer = JSON.parse(preview.textContent);
        if (transfer.demo === true) applyDB({ transfer });
      } catch (e) { /* La vista sigue disponible si la configuración no es válida. */ }
    }
    return;
  }   
  for (const url of ["api/db", "db.json"]) {
    try {
      const r = await fetch(url, { cache: "no-store" });
      if (!r.ok) continue;
      applyDB(await r.json());
      dbSource = url === "api/db" ? "api" : "file";
      return;
    } catch (e) {  }
  }
}


function dbSend(method, path, body) {
  if (dbSource !== "api") return;
  try {
    fetch("api/" + path, { method: method, headers: { "Content-Type": "application/json" }, body: body ? JSON.stringify(body) : undefined }).catch(() => {});
  } catch (e) { /* nada */ }
}
const ownerOf = () => (state.user && state.user.email ? state.user.email.toLowerCase() : "");

const dbReady = loadDB();

/* ---------- SONIDO  ---------- */

const Sound = {
  ctx: null, on: load("tizafood_sound", true), pending: null, pendingAt: 0,
  ensure() {
    if (!this.ctx) {
      try { const C = window.AudioContext || window.webkitAudioContext; if (C) this.ctx = new C(); } catch (e) { }
    }
    return this.ctx;
  },
  tone(freq, t0, dur, type, vol) {
    const c = this.ctx, o = c.createOscillator(), g = c.createGain(), t = c.currentTime + t0;
    o.type = type || "sine";
    o.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol || 0.15, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(c.destination);
    o.start(t); o.stop(t + dur + 0.05);
  },
  welcome() {  
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => this.tone(f, i * 0.11, 0.5, "triangle", 0.15));
    this.tone(1318.5, 0.5, 0.8, "sine", 0.1);
  },
  pay() { 
    this.tone(988, 0, 0.12, "square", 0.06);
    this.tone(1319, 0.1, 0.45, "square", 0.06);
    [659.25, 830.6, 987.77, 1318.5].forEach((f, i) => this.tone(f, 0.35 + i * 0.07, 0.7, "triangle", 0.12));
  },
  tap() {
    this.tone(660, 0, 0.09, "triangle", 0.1);
    this.tone(880, 0.07, 0.12, "triangle", 0.1);
  },
  play(name) {
    if (!this.on) return;
    const c = this.ensure();
    if (!c) return;
    if (c.state === "running") { this[name](); return; }
  
    this.pending = name; this.pendingAt = Date.now();
    c.resume().then(() => {
      if (c.state === "running" && this.pending === name) { this.pending = null; this[name](); }
    }).catch(() => {});
  },
  unlock() {
    const c = this.ensure();
    if (!c) return;
    c.resume().then(() => {
      if (this.pending && Date.now() - this.pendingAt < 20000 && this.on) { const n = this.pending; this.pending = null; this[n](); }
      this.pending = null;
    }).catch(() => {});
  }
};
["pointerdown", "keydown", "touchstart"].forEach((ev) => window.addEventListener(ev, () => Sound.unlock(), { passive: true }));

function paintSound() {
  const b = $("#btnSound");
  b.textContent = Sound.on ? "🔊" : "🔇";
  b.setAttribute("aria-pressed", String(Sound.on));
}
$("#btnSound").addEventListener("click", () => {
  Sound.on = !Sound.on;
  save("tizafood_sound", Sound.on);
  paintSound();
  if (Sound.on) Sound.play("tap");
  toast(Sound.on ? "Sonido activado " : "Sonido desactivado ");
});
paintSound();

/* ----------  PANTALLAS: splash, bienvenida, registro, app ---------- */

function startApp() {
  Sound.play("welcome");
  $("#splash").classList.add("leave");
  setTimeout(() => $("#splash").classList.add("hidden"), 900);
  showWelcome();
}

function showWelcome() {
  if (state.user) {
    $("#welcomeTitle").textContent = "¡Qué bueno verte, " + state.user.name.split(" ")[0] + "!";
    $("#welcomeText").textContent = "Gracias por elegir nuestra app. Tu comida favorita te está esperando.";
    $("#btnWelcome").textContent = "Entrar a la app";
  }
  $("#welcome").classList.remove("hidden");
}

$("#btnWelcome").addEventListener("click", () => {
  staffLoginRole="";renderAuthMode();
  $("#welcome").classList.add("hidden");
  if (state.user) showApp();
  else $("#register").classList.remove("hidden");
});

$("#btnRegBack").addEventListener("click", () => {
  staffLoginRole="";renderAuthMode();
  $("#register").classList.add("hidden");
  $("#welcome").classList.remove("hidden");
});

async function showApp() {
  await dbReady;
  if (dbSource === "api") {
    try {
      const response = await fetch("api/me", {cache:"no-store"});
      if (!response.ok) throw new Error("Inicia sesión");
      const result = await response.json();
      state.user = result.user;
      if (state.user.role !== "cliente") { window.showStaffPanel(state.user); return; }
      const orders = await fetch("api/orders", {cache:"no-store"});
      if (orders.ok) { state.orders = (await orders.json()).orders; save("tizafood_orders",state.orders); }
    } catch (err) {
      state.user = null; save("tizafood_user",null);
      $("#register").classList.remove("hidden"); $("#welcome").classList.add("hidden"); $("#app").classList.add("hidden"); return;
    }
  }
  buildApp();
}

function buildApp() {
  $("#welcome").classList.add("hidden");
  $("#register").classList.add("hidden");
  $("#app").classList.remove("hidden");
  renderUserChip();
  renderCats();
  renderMenu();
  renderPromos();
  renderHomeBranch();
  const mh = $("#menuHeading");
  if (mh) mh.textContent = "Menú de " + BRANCHES[state.branch].name;
  renderReviews();
  renderBranches();
  renderCart();
  renderFavs();
  updateCartBadge(false);
  showView("home");
  window.scrollTo(0, 0);
  startClientSync();
}

async function finishAuth(user) {
  if (!state.user || state.user.email !== user.email) {
    state.cart=[];state.orders=[];state.favs=[];
    ["tizafood_cart","tizafood_orders","tizafood_favs"].forEach(k=>save(k,[]));
  }
  state.user=user;save("tizafood_user",state.user);$("#rPassword").value="";$("#rPasswordConfirm").value="";hidePassword("rPassword");hidePassword("rPasswordConfirm");
  await showApp();
}
function hidePassword(id) {
  const input = document.getElementById(id); if(!input)return;
  input.type="password";
  const button=document.querySelector('[data-password-toggle="'+id+'"]');
  if(button){button.setAttribute("aria-pressed","false");button.setAttribute("aria-label",id.endsWith("Confirm")?"Mostrar confirmación de contraseña":"Mostrar contraseña");}
}
$$("[data-password-toggle]").forEach(button=>button.addEventListener("click",()=>{
  const input=document.getElementById(button.dataset.passwordToggle);
  const show=input.type==="password";input.type=show?"text":"password";
  button.setAttribute("aria-pressed",String(show));button.setAttribute("aria-label",show?"Ocultar contraseña":(input.id.endsWith("Confirm")?"Mostrar confirmación de contraseña":"Mostrar contraseña"));
}));
["registerForm","employeeForm"].forEach(id=>document.getElementById(id).addEventListener("reset",()=>{
  document.querySelectorAll('#'+id+' [data-password-toggle]').forEach(button=>hidePassword(button.dataset.passwordToggle));
}));
let authLogin=true,ownerSetup=false,staffLoginRole='',migrationRole='';
function renderAuthMode(){
  ownerSetup=false;
  const creating=!authLogin;
  $("#confirmPasswordField").classList.toggle("hidden",!creating);$("#rPasswordConfirm").disabled=!creating;$("#rPasswordConfirm").value='';hidePassword('rPassword');hidePassword('rPasswordConfirm');
  $("#register").classList.toggle('staff-login',!!staffLoginRole);$("#registrationDetails").classList.toggle('hidden',!creating);$("#registrationContact").classList.toggle('hidden',!creating);
  $("#register h2").textContent=staffLoginRole?(staffLoginRole==='dueno'?'Acceso del dueño':'Acceso del empleado'):(authLogin?'Iniciar sesión':'Crear cuenta de cliente');
  $("#register .muted").textContent=authLogin?'Entra con tu correo y contraseña de Firebase. Si tenías una cuenta anterior, pulsa Pasar mi cuenta anterior a Firebase.':'Completa tus datos para recibir pedidos. Tu acceso se creará en Firebase.';
  $("label[for=rUsername]").textContent=authLogin?'Correo de Firebase':'Usuario';$("#rUsername").type=authLogin?'email':'text';$("#rUsername").placeholder=authLogin?'correo@ejemplo.com':'Tu usuario';
  $("#rPassword").autocomplete=authLogin?'current-password':'new-password';$("#btnAuthMode").textContent=authLogin?'Crear cuenta de cliente':'Ya tengo cuenta: iniciar sesión';$("#registerError").textContent='';$("#btnOwnerSetup").classList.add('hidden');
}
$("#btnAuthMode").addEventListener('click',()=>{staffLoginRole='';authLogin=!authLogin;renderAuthMode();});renderAuthMode();
$$("[data-staff-login]").forEach(button=>button.addEventListener('click',()=>{staffLoginRole=button.dataset.staffLogin;authLogin=true;$("#welcome").classList.add('hidden');$("#register").classList.remove('hidden');$("#rUsername").value='';$("#rPassword").value='';renderAuthMode();$("#rUsername").focus();}));
$("#registerForm").addEventListener('submit',async e=>{
  e.preventDefault();const error=$("#registerError");error.textContent='';
  const body={username:$("#rUsername").value.trim(),password:$("#rPassword").value,authProvider:'firebase'};if(staffLoginRole)body.staffRole=staffLoginRole;
  if(authLogin&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.username)){error.textContent='Escribe tu correo de Firebase. Para una cuenta anterior, usa Pasar mi cuenta anterior a Firebase.';return;}
  if(!body.username||body.password.length<8){error.textContent='Completa tus datos y escribe una contraseña de al menos 8 caracteres.';return;}
  if(!authLogin){
    if(body.password!==$("#rPasswordConfirm").value){error.textContent='Las contraseñas no coinciden. Vuelve a escribirlas.';return;}
    body.name=$("#rName").value.trim();body.email=$("#rEmail").value.trim();body.addressParts={};
    for(const key of ['Street','HouseNumber','Neighborhood','Municipality','State','PostalCode'])body.addressParts[key[0].toLowerCase()+key.slice(1)]=$("#r"+key).value.trim();
    if(Object.values(body.addressParts).some(v=>!v)||!/^\d{5}$/.test(body.addressParts.postalCode)){error.textContent='Completa la dirección y escribe un código postal de 5 dígitos.';return;}
  }
  await dbReady;const button=$("#registerForm button[type=submit]");button.disabled=true;
  try{const response=await fetch('api/'+(authLogin?'login':'register'),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}),result=await response.json();if(!response.ok)throw Error(result.error);if(!result.user)throw Error('Recarga la app con Ctrl + F5 para cargar el acceso de Firebase.');await finishAuth(result.user);}catch(err){error.textContent=err.message;}finally{button.disabled=false;}
});
$("#btnMigrateAccount").addEventListener('click',()=>{migrationRole=staffLoginRole;$("#firebaseMigrationForm").reset();$("#migrationError").textContent='';$("#migrationConfirmField").classList.remove('hidden');$("#migrationPasswordConfirm").disabled=false;$("#migrationLegacyUsername").value=staffLoginRole?(staffLoginRole==='dueno'?'dueno.demo':'empleado.demo'):$("#rUsername").value;openModal('#firebaseMigrationModal');});
$("#migrationMode").addEventListener('change',()=>{const creating=$("#migrationMode").value==='create';$("#migrationConfirmField").classList.toggle('hidden',!creating);$("#migrationPasswordConfirm").disabled=!creating;$("#migrationPasswordConfirm").value='';});
$("#firebaseMigrationForm").addEventListener('submit',async e=>{
  e.preventDefault();if(window.firebaseMigrationBusy)return;const error=$("#migrationError");error.textContent='';const creating=$("#migrationMode").value==='create';
  const body={legacyUsername:$("#migrationLegacyUsername").value.trim(),legacyPassword:$("#migrationLegacyPassword").value,email:$("#migrationEmail").value.trim(),password:$("#migrationPassword").value,createAccount:creating};if(migrationRole)body.staffRole=migrationRole;
  if(!body.legacyUsername||body.legacyPassword.length<8||body.password.length<8||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)){error.textContent='Completa el usuario y contraseña anteriores, un correo válido y la contraseña de Firebase de al menos 8 caracteres.';return;}
  if(creating&&body.password!==$("#migrationPasswordConfirm").value){error.textContent='Las contraseñas de Firebase no coinciden.';return;}
  window.firebaseMigrationBusy=true;$("#migrationSubmit").disabled=true;
  try{const response=await fetch('api/firebase-migrate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}),result=await response.json();if(!response.ok)throw Error(result.error);closeModal($("#firebaseMigrationModal"));await finishAuth(result.user);toast('Cuenta vinculada. A partir de ahora entra con tu correo y contraseña de Firebase.');}catch(err){error.textContent=err.message;}finally{window.firebaseMigrationBusy=false;$("#migrationSubmit").disabled=false;}
});

let clientSyncTimer = null, clientSyncBusy = false;
async function syncClientData() {
  if (clientSyncBusy || dbSource !== "api" || !state.user || state.user.role !== "cliente") return;
  const email = state.user.email;clientSyncBusy = true;
  try {
    const [ordersResponse,dbResponse] = await Promise.all([fetch("api/orders",{cache:"no-store"}),fetch("api/db",{cache:"no-store"})]);
    if(!ordersResponse.ok || !dbResponse.ok)return;
    const [orderData,db] = await Promise.all([ordersResponse.json(),dbResponse.json()]);
    if(!state.user || state.user.email !== email)return;
    const changed = JSON.stringify(PRODUCTS)!==JSON.stringify(db.products);
    applyDB(db);
    state.orders=orderData.orders.map(order=>{const old=state.orders.find(o=>o.folio===order.folio);return old?Object.assign(old,order):order;});
    save("tizafood_orders",state.orders);
    if(changed){renderCats();renderMenu();renderFavs();if(state.view==="search")renderSearch();}
    if($("#accountScreen").classList.contains("open"))renderOrders();
    if($("#trackScreen").classList.contains("open"))updateTracking();
  } catch(err) { /* Conserva la vista actual si no hay conexión. */ }
  finally {clientSyncBusy=false;}
}
function startClientSync(){clearInterval(clientSyncTimer);clientSyncTimer=setInterval(syncClientData,5000);}
window.addEventListener("storage",e=>{if(e.key==="tiza_school_db_v1")syncClientData();});
window.addEventListener("focus",syncClientData);

/* ---------- 5. NAVEGACIÓN (barra inferior) ---------- */

function showView(name) {
  state.view = name;
  $$(".view").forEach((v) => v.classList.toggle("active", v.id === "view-" + name));
  $$(".nav-btn").forEach((b) => b.classList.toggle("active", b.dataset.view === name));
  if (name === "search") { renderSearch(); }
  if (name === "cart") renderCart();
  if (name === "favs") renderFavs();
  if (name === "places") renderBranches();
  window.scrollTo(0, 0);
}

$$(".nav-btn").forEach((b) => b.addEventListener("click", () => showView(b.dataset.view)));

$("#heroSearch").addEventListener("click", () => { showView("search"); setTimeout(() => $("#searchInput").focus(), 50); });
$("#heroSearch").addEventListener("focus", () => { showView("search"); setTimeout(() => $("#searchInput").focus(), 50); });
$("#homeBranch").addEventListener("click", () => showView("places"));


function openScreen(id) {
  const s = $(id);
  s.classList.add("open");
  s.setAttribute("aria-hidden", "false");
}
function closeScreen(s) {
  s.classList.remove("open");
  s.setAttribute("aria-hidden", "true");
  if (s.id === "trackScreen") stopTracking();
}
function openModal(id) {
  const m = $(id);
  m.classList.add("open");
  m.setAttribute("aria-hidden", "false");
}
function closeModal(m) {
  m.classList.remove("open");
  m.setAttribute("aria-hidden", "true");
  if(m.id==='firebaseMigrationModal'){$('#firebaseMigrationForm').reset();['migrationLegacyPassword','migrationPassword','migrationPasswordConfirm'].forEach(hidePassword);}
}

$$(".modal").forEach((m) => {
  m.addEventListener("click", (e) => {
    if (m.id === "payModal" && pay.busy) return;
    if(m.id==="firebaseMigrationModal"&&window.firebaseMigrationBusy)return;
    if (e.target === m || e.target.closest("[data-close]")) closeModal(m);
  });
});
$$(".screen [data-back]").forEach((b) => b.addEventListener("click", () => closeScreen(b.closest(".screen"))));

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape" || pay.busy || window.firebaseMigrationBusy) return;
  const modals = $$(".modal.open");
  if (modals.length) { modals.forEach(closeModal); return; }
  const screens = $$(".screen.open");
  if (screens.length) closeScreen(screens[screens.length - 1]);
});

/* ----------  INICIO: categorías y menú ---------- */

function renderHomeBranch() {
  $("#homeBranchName").textContent = BRANCHES[state.branch].name + " · " + etaText(BRANCHES[state.branch]);
}


const inBranch = (p, idx) => !p.only || p.only.includes(idx === undefined ? state.branch : idx);

function renderCats() {
  const names = [...new Set(PRODUCTS.map((p) => p.cat))];
  const count = (c) => PRODUCTS.filter((p) => inBranch(p) && (c === "Todo" ? !p.more : p.cat === c)).length;
  const cats = ["Todo"].concat(names.filter((c) => count(c) > 0));
  if (!cats.includes(state.cat)) state.cat = "Todo";

  const box = $("#cats");
  box.innerHTML = "";
  cats.forEach((c) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "cat" + (c === state.cat ? " active" : "");
    btn.innerHTML = esc(c) + ' <span class="cat-count">' + count(c) + "</span>";
    btn.addEventListener("click", () => { state.cat = c; renderCats(); renderMenu(); });
    box.appendChild(btn);
  });

  const hidden = names.map((c) => ({ c: c, n: PRODUCTS.filter((p) => inBranch(p) && p.more && p.cat === c).length })).filter((x) => x.n > 0);
  const hint = $("#catHint");
  if (state.cat === "Todo" && hidden.length) {
    hint.innerHTML = "✨ Hay más opciones en: " + hidden.map((x) => "<strong>" + esc(x.c) + "</strong> (+" + x.n + ")").join(", ") + ". Toca la categoría para verlas.";
    hint.classList.remove("hidden");
  } else {
    hint.classList.add("hidden");
  }
}

function itemCard(p, i) {
  const el = document.createElement("div");
  const fav = state.favs.includes(p.id);
  el.className = "item" + (p.soldOut ? " sold-out" : "");
  el.tabIndex = 0;
  el.setAttribute("role", "button");
  el.style.animationDelay = (i * 0.04) + "s";
  el.innerHTML =
    '<button class="heart" aria-label="Favorito">' + (fav ? "♥" : "♡") + "</button>" +
    '<div class="item-img">' + mediaHTML(p) + "</div>" +
    '<div class="item-name">' + esc(p.name) + "</div>" +
    '<div class="item-price">' + money(p.price) + "</div>" +
    '<div class="item-add">' + (p.soldOut ? 'Agotado' : 'Personalizar +') + '</div>';
  el.addEventListener("click", (e) => {
    if (e.target.closest(".heart")) { e.stopPropagation(); toggleFav(p.id); return; }
    openSheet(p);
  });
  el.addEventListener("keydown", (e) => {
    if (e.target === el && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openSheet(p); }
  });
  return el;
}

function fillGrid(box, list) {
  box.innerHTML = "";
  list.forEach((p, i) => box.appendChild(itemCard(p, i)));
}

function renderMenu() {
  const q = state.menuQuery.toLowerCase();
  const list = PRODUCTS.filter((p) =>
    inBranch(p) &&
    (state.cat === "Todo" ? (!p.more || q) : p.cat === state.cat) &&   // lo "más" solo sale en su categoría o al buscar
    (!q || (p.name + " " + p.desc).toLowerCase().includes(q))
  );
  fillGrid($("#menu"), list);
  $("#noProducts").classList.toggle("hidden", list.length > 0);
  $("#menuCount").textContent = list.length + (list.length === 1 ? " producto" : " productos");
}

/* ---------- FAVORITOS ---------- */

function toggleFav(id) {
  const i = state.favs.indexOf(id);
  if (i >= 0) { state.favs.splice(i, 1); toast("Quitado de favoritos"); }
  else { state.favs.push(id); toast("Guardado en favoritos ♥"); }
  save("tizafood_favs", state.favs);
  renderMenu();
  renderFavs();
  if (state.view === "search") renderSearch();
  if (sheet.item && sheet.item.id) updateSheetFav();
}

function renderFavs() {
  const list = PRODUCTS.filter((p) => state.favs.includes(p.id));
  fillGrid($("#favList"), list);
  $("#favEmpty").classList.toggle("hidden", list.length > 0);
}

/* ----------  BUSCAR ---------- */

$("#searchInput").addEventListener("input", (e) => {
  state.query = e.target.value.trim();
  renderSearch();
});

function renderSearch() {
  const q = state.query.toLowerCase();
  let prods;
  if (!q) {
    prods = PRODUCTS.filter((p) => inBranch(p) && !p.more).sort((a, b) => b.rating - a.rating).slice(0, 8);
    $("#searchLabel").textContent = "Populares";
  } else {
    prods = PRODUCTS.filter((p) => inBranch(p) && (p.name + " " + p.cat + " " + p.desc).toLowerCase().includes(q));
    $("#searchLabel").textContent = "Resultados";
  }
  fillGrid($("#searchResults"), prods);

  const box = $("#searchBranches");
  box.innerHTML = "";
  const bl = q ? BRANCHES.map((b, i) => ({ b, i })).filter((x) => (x.b.name + " " + x.b.zone).toLowerCase().includes(q)) : [];
  bl.forEach((x) => box.appendChild(branchCard(x.b, x.i)));
  $("#searchEmpty").classList.toggle("hidden", prods.length > 0 || bl.length > 0);
}

/* ----------  SUCURSALES / LUGARES ---------- */

function branchCard(b, i) {
  const card = document.createElement("div");
  card.className = "branch" + (i === state.branch ? " active" : "");
  card.innerHTML =
    "<strong>" + esc(b.name) + "</strong>" +
    "<small>" + esc(b.zone) + "</small>" +
    '<div class="branch-meta"><span>📍 ' + b.km.toFixed(1) + " km · " + etaText(b) + "</span>" +
    '<span class="fee-tag">Envío ' + money(feeOf(b)) + "</span></div>";
  card.addEventListener("click", () => selectBranch(i));
  return card;
}

function selectBranch(i) {
  state.branch = i;
  save("tizafood_branch", i);
  renderBranches();
  renderHomeBranch();
  const mh = $("#menuHeading");
  if (mh) mh.textContent = "Menú de " + BRANCHES[i].name;
  renderCats();
  renderMenu();
  if (state.view === "search") renderSearch();
  renderCart();
}

function renderBranches() {
  const box = $("#branches");
  box.innerHTML = "";
  BRANCHES.forEach((b, i) => box.appendChild(branchCard(b, i)));

  const b = BRANCHES[state.branch];
  $("#plName").textContent = b.name.replace("Sucursal ", "");
  $("#plEta").textContent = etaText(b);
  $("#plFee").textContent = money(feeOf(b));
  if (state.view === "places") setFrame($("#plMap"), mapPlaceUrl(b));
  $("#plLink").href = "https://www.google.com/maps/search/?api=1&query=" + enc(branchQuery(b));
}

/* ----------  PROMOCIONES ---------- */

let promosListas = false;

function crearTarjetaPromo(p, esClon) {
  const card = document.createElement("div");
  card.className = "product-card";
  card.setAttribute("role", "button");
  if (esClon) { card.setAttribute("aria-hidden", "true"); card.tabIndex = -1; }
  else { card.tabIndex = 0; }

  card.innerHTML =
    '<span class="card-tag ' + p.tag + '">' + esc(p.tagText) + "</span>" +
    '<img src="' + esc(p.img) + '" alt="' + esc(p.name) + '" class="card-img" draggable="false">' +
    "<h3>" + esc(p.name) + "</h3>" +
    '<p class="card-desc">' + esc(p.short) + "</p>" +
    '<div class="card-bottom"><span class="card-price">' + money(p.price) + "</span>" +
    '<button class="add-btn" tabindex="-1" aria-label="Personalizar ' + esc(p.name) + '">+</button></div>';

  const img = card.querySelector(".card-img");
  img.addEventListener("error", () => {
    const e = document.createElement("div");
    e.className = "card-emoji";
    e.textContent = p.emoji;
    img.replaceWith(e);
  });

  const abrir = () => openSheet(p);
  card.addEventListener("click", abrir);
  card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); abrir(); } });
  return card;
}

function renderPromos() {
  if (promosListas) return;
  const track = $("#promoTrack");
  const marquee = $("#promoMarquee");
  promosListas = true;

  PROMOS.forEach((p) => track.appendChild(crearTarjetaPromo(p, false)));
  PROMOS.forEach((p) => track.appendChild(crearTarjetaPromo(p, true))); // copia para que nunca se corte

  track.style.setProperty("--promo-dur", (PROMOS.length * 5) + "s");

  marquee.addEventListener("touchstart", () => marquee.classList.add("paused"), { passive: true });
  marquee.addEventListener("touchend", () => setTimeout(() => marquee.classList.remove("paused"), 1200), { passive: true });
  marquee.addEventListener("touchcancel", () => marquee.classList.remove("paused"), { passive: true });
}

/* ----------  PRODUCTO: PERSONALIZACIONES  ---------- */

const sheet = { item: null, extras: [], qty: 1 };

function extrasFor(item) { return EXTRAS[item.cat] || EXTRAS["Snacks"]; }

function openSheet(item) {
  const current = item.id ? PRODUCTS.find(p=>p.id===item.id) : item;
  if (!current || current.soldOut) { toast("Este producto está agotado o ya no está disponible."); return; }
  item = current;
  sheet.item = item;
  sheet.extras = [];
  sheet.qty = 1;

  $("#pImage").innerHTML = mediaHTML(item);
  $("#pName").textContent = item.name;
  $("#pDesc").textContent = item.desc;
  $("#pPrice").textContent = money(item.price);
  renderSheetReviews();

  $("#pExtras").innerHTML = extrasFor(item).map((x, i) =>
    '<label class="extra"><input type="checkbox" data-i="' + i + '">' +
    '<span class="extra-name">' + esc(x.name) + '</span><span class="extra-price">+' + money(x.price) + "</span></label>"
  ).join("");

  $("#pFav").classList.toggle("hidden", !item.id);
  updateSheetFav();
  updateSheet();
  $("#productModal .modal-card").scrollTop = 0;
  openModal("#productModal");
}

function updateSheetFav() {
  const on = sheet.item && state.favs.includes(sheet.item.id);
  $("#pFav").textContent = on ? "♥" : "♡";
}
$("#pFav").addEventListener("click", () => { if (sheet.item && sheet.item.id) toggleFav(sheet.item.id); });

function sheetExtras() {
  const list = extrasFor(sheet.item);
  return $$("#pExtras input:checked").map((cb) => list[Number(cb.dataset.i)]);
}

function updateSheet() {
  sheet.extras = sheetExtras();
  const unit = sheet.item.price + sheet.extras.reduce((s, x) => s + x.price, 0);
  $("#qtyNum").textContent = sheet.qty;
  $("#buyTotal").textContent = money(unit * sheet.qty);
}

$("#pExtras").addEventListener("change", updateSheet);
$("#qtyMinus").addEventListener("click", () => { if (sheet.qty > 1) { sheet.qty--; updateSheet(); } });
$("#qtyPlus").addEventListener("click", () => { if (sheet.qty < 20) { sheet.qty++; updateSheet(); } });

function lineFromSheet() {
  return {
    productId: sheet.item.id || null, name: sheet.item.name, emoji: sheet.item.emoji, img: sheet.item.img, only: sheet.item.only || null,
    base: sheet.item.price, extras: sheet.extras.map((x) => ({ name: x.name, price: x.price })), qty: sheet.qty
  };
}

$("#btnAddCart").addEventListener("click", () => {
  if (addToCart(lineFromSheet()) === false) return;
  Sound.play("tap");
  closeModal($("#productModal"));
  toast("Agregado al carrito 🛒");
});

$("#btnBuy").addEventListener("click", () => {
  const line = lineFromSheet();
  closeModal($("#productModal"));
  startCheckout([line], false);
});

/* ---------- CARRITO ---------- */

const unitOf = (l) => l.base + l.extras.reduce((s, x) => s + x.price, 0);
const lineTotal = (l) => unitOf(l) * l.qty;
const itemsSubtotal = (items) => items.reduce((s, l) => s + lineTotal(l), 0);
const lineKey = (l) => l.name + "|" + l.extras.map((x) => x.name).sort().join(",");

function addToCart(line) {
  try { FoodManagement.available([line], {products:PRODUCTS,promos:PROMOS}); } catch(err) { toast(err.message); return false; }
  const found = state.cart.find((l) => lineKey(l) === lineKey(line));
  if (found) found.qty = Math.min(20, found.qty + line.qty);
  else state.cart.push(line);
  save("tizafood_cart", state.cart);
  renderCart();
  updateCartBadge(true);
}

function updateCartBadge(animate) {
  const n = state.cart.reduce((s, l) => s + l.qty, 0);
  const b = $("#cartBadge");
  b.textContent = n;
  b.classList.toggle("hidden", n === 0);
  if (animate) { b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump"); }
}

function thumbHTML(l) {
  return '<div class="cart-thumb">' + mediaHTML({ img: l.img, name: l.name, emoji: l.emoji || "🍽️" }) + "</div>";
}

function renderCart() {
  const list = $("#cartList");
  const sum = $("#cartSummary");
  const btn = $("#btnCartCheckout");
  list.innerHTML = "";

  if (state.cart.length === 0) {
    list.innerHTML = '<div class="empty">Tu carrito está vacío 🛒<br>Agrega algo rico del menú.<br><br><button class="btn btn-main" id="goMenu">Ver menú</button></div>';
    $("#goMenu").addEventListener("click", () => { showView("home"); setTimeout(() => $("#menuSection").scrollIntoView({ behavior: "smooth" }), 60); });
    sum.classList.add("hidden");
    btn.classList.add("hidden");
    updateCartBadge(false);
    return;
  }

  state.cart.forEach((l, i) => {
    const row = document.createElement("div");
    row.className = "cart-line";
    row.innerHTML =
      thumbHTML(l) +
      "<div><div class=\"cart-name\">" + esc(l.name) + "</div>" +
      (l.extras.length ? '<span class="cart-extras">+ ' + esc(l.extras.map((x) => x.name).join(", ")) + "</span>" : "") +
      '<span class="cart-price">' + money(lineTotal(l)) + "</span></div>" +
      '<div class="cart-ctrl"><div class="mini-qty"><button data-act="minus" data-i="' + i + '">−</button><span>' + l.qty +
      '</span><button data-act="plus" data-i="' + i + '">+</button></div>' +
      '<button class="cart-remove" data-act="del" data-i="' + i + '">Quitar</button></div>';
    list.appendChild(row);
  });

  const b = BRANCHES[state.branch];
  const sub = itemsSubtotal(state.cart);
  sum.innerHTML =
    '<div class="sum-row"><span>Subtotal</span><span>' + money(sub) + "</span></div>" +
    '<div class="sum-row"><span>Envío<small>' + esc(b.name) + "</small></span><span>" + money(feeOf(b)) + "</span></div>" +
    '<div class="sum-row total"><span>Total</span><span>' + money(sub + feeOf(b)) + "</span></div>";
  sum.classList.remove("hidden");
  btn.classList.remove("hidden");
  updateCartBadge(false);
}

$("#cartList").addEventListener("click", (e) => {
  const b = e.target.closest("[data-act]");
  if (!b) return;
  const i = Number(b.dataset.i);
  const l = state.cart[i];
  if (!l) return;
  if (b.dataset.act === "plus" && l.qty < 20) l.qty++;
  if (b.dataset.act === "minus") { if (l.qty > 1) l.qty--; else state.cart.splice(i, 1); }
  if (b.dataset.act === "del") state.cart.splice(i, 1);
  save("tizafood_cart", state.cart);
  renderCart();
});

$("#btnCartCheckout").addEventListener("click", () => startCheckout(state.cart.map((l) => JSON.parse(JSON.stringify(l))), true));

/* ---------- CONFIRMAR ENTREGA (MAPA, TIEMPO, ENVÍO Y LUGAR) ---------- */

async function startCheckout(items, fromCart) {
  await syncClientData();
  try { FoodManagement.available(items, {products:PRODUCTS,promos:PROMOS}); } catch(err) { toast(err.message); return; }
  // dest = lugar de entrega de ESTE pedido (por defecto tu dirección; se puede cambiar aquí mismo)
  state.checkout = { items, fromCart, couponCode:"", dest: { text: state.user.address, coords: null } };
  $("#couponInput").value="";$("#couponMessage").textContent="";
  $("#addrMsg").textContent = "También puedes tocar el mapa para marcar el punto exacto.";
  $("#coAddrInput").value = state.user.address;
  renderCheckout();
  openScreen("#checkoutScreen");
  $("#checkoutScreen .screen-body").scrollTop = 0;
  setTimeout(initCoMap, 80);
}

function checkoutPricing(){return FoodManagement.pricing(state.checkout.items,feeOf(BRANCHES[state.branch]),state.checkout.couponCode);}
$("#applyCoupon").addEventListener("click",()=>{
  if(!state.checkout)return;
  try{const totals=FoodManagement.pricing(state.checkout.items,feeOf(BRANCHES[state.branch]),$("#couponInput").value);if(!totals.couponCode)throw Error("Escribe un código de cupón.");state.checkout.couponCode=totals.couponCode;$("#couponInput").value=totals.couponCode;$("#couponMessage").textContent="Cupón aplicado: ahorras "+money(totals.discount)+".";renderCheckout();}
  catch(err){$("#couponMessage").textContent=err.message;}
});
$("#couponInput").addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();$("#applyCoupon").click();}});
$("#removeCoupon").addEventListener("click",()=>{if(!state.checkout)return;state.checkout.couponCode="";$("#couponInput").value="";$("#couponMessage").textContent="Cupón eliminado.";renderCheckout();});
function summaryHTML(items, fee, discount=0, couponCode="") {
  const sub = itemsSubtotal(items);
  return items.map((l) =>
    '<div class="sum-row"><span>' + l.qty + " × " + esc(l.name) +
    (l.extras.length ? "<small>+ " + esc(l.extras.map((x) => x.name || x).join(", ")) + "</small>" : "") +
    "</span><span>" + money(lineTotal(l)) + "</span></div>").join("") +
    '<div class="sum-row"><span>Subtotal</span><span>' + money(sub) + "</span></div>" +
    '<div class="sum-row"><span>Envío</span><span>' + money(fee) + "</span></div>" +
    (discount>0 ? '<div class="sum-row coupon-discount"><span>Cupón '+esc(couponCode)+'</span><span>−'+money(discount)+'</span></div>' : "") +
    '<div class="sum-row total"><span>Total</span><span>' + money(sub + fee - discount) + "</span></div>";
}

function renderCheckout() {
  const co = state.checkout;
  if (!co) return;
  const b = BRANCHES[state.branch];
  const fee = feeOf(b);

  $("#coBranchName").textContent = b.name;
  $("#coBranchZone").textContent = b.zone;
  $("#coEta").textContent = etaText(b);
  $("#coFee").textContent = money(fee);
  $("#coKm").textContent = b.km.toFixed(1) + " km";
  $("#coAddress").textContent = co.dest.text;
  syncCoMapMarker();

  const chips = $("#coBranches");
  chips.innerHTML = "";
  BRANCHES.forEach((x, i) => {
    const c = document.createElement("button");
    c.className = "chip" + (i === state.branch ? " active" : "");
    c.textContent = x.name.replace("Sucursal ", "");
    c.addEventListener("click", () => { selectBranch(i); renderCheckout(); });
    chips.appendChild(c);
  });

  const bad = co.items.filter((l) => l.only && !l.only.includes(state.branch));
  const warn = $("#coWarn");
  if (bad.length) {
    warn.textContent = "⚠️ No disponible en " + b.name + ": " + bad.map((l) => l.name).join(", ") + ". Elige otra sucursal para continuar.";
    warn.classList.remove("hidden");
  } else {
    warn.classList.add("hidden");
  }

  const totals=checkoutPricing();
  $("#removeCoupon").classList.toggle("hidden",!co.couponCode);
  if(co.couponCode)$("#couponMessage").textContent="Cupón aplicado: ahorras "+money(totals.discount)+".";
  $("#coItems").innerHTML = summaryHTML(co.items, fee,totals.discount,totals.couponCode);
  const fin = $("#btnFinalize");
  fin.disabled = bad.length > 0;
  fin.textContent = "Finalizar pedido · " + money(checkoutPricing().total);
}

const shortLabel = (t) => { const s = t.split(",")[0].trim(); return s.length > 20 ? s.slice(0, 19) + "…" : s; };
const placesOf = () => [{ label: "Mi dirección", text: state.user.address, coords: null }].concat(state.user.places || []);
const sameDest = (a, b) => a.text === b.text && (a.coords || null) === (b.coords || null);

function savePlace(pl) {
  const list = state.user.places || [];
  if (list.some((x) => sameDest(x, pl)) || sameDest(pl, { text: state.user.address, coords: null })) return;
  list.push(pl);
  state.user.places = list.slice(-6);
  save("tizafood_user", state.user);
}

function renderCoPlaces() {
  const co = state.checkout;
  const box = $("#coPlaces");
  box.innerHTML = "";
  placesOf().forEach((pl) => {
    const c = document.createElement("button");
    c.type = "button";
    c.className = "chip" + (sameDest(pl, co.dest) ? " active" : "");
    c.textContent = (pl.coords ? "📍 " : "🏠 ") + pl.label;
    c.addEventListener("click", () => setDest(pl));
    box.appendChild(c);
  });
}

function setDest(d, silent) {
  state.checkout.dest = { text: d.text, coords: d.coords || null };
  $("#coAddrInput").value = d.coords ? (d.text || "") : d.text;
  $("#addrMsg").textContent = "";
  renderCoPlaces();
  renderCheckout();
  if (!silent) toast("Lugar de entrega actualizado 📍");
}

$("#btnChangeAddr").addEventListener("click", () => {
  const ed = $("#addrEditor");
  ed.scrollIntoView({ behavior: "smooth", block: "nearest" });
  const d = state.checkout.dest;
  $("#coAddrInput").value = d.text || "";
  renderCoPlaces();
  $("#coAddrInput").focus();
});

/* --- Mapa del punto de entrega --- */
const TIZAYUCA = { lat: 19.8603, lng: -98.9764 };
let coMap = null;
let coMarker = null;
let coMapBusy = false;

function parseCoords(str) {
  if (!str) return null;
  const p = String(str).split(",").map(Number);
  if (p.length === 2 && Number.isFinite(p[0]) && Number.isFinite(p[1])) return { lat: p[0], lng: p[1] };
  return null;
}

function syncCoMapMarker() {
  if (!coMap || typeof L === "undefined") return;
  const d = state.checkout && state.checkout.dest;
  const c = d && parseCoords(d.coords);
  if (c) {
    if (coMarker) coMarker.setLatLng([c.lat, c.lng]);
    else coMarker = L.marker([c.lat, c.lng]).addTo(coMap);
    coMap.setView([c.lat, c.lng], Math.max(coMap.getZoom(), 15));
  }
}

function initCoMap() {
  if (typeof L === "undefined") return;
  const el = $("#coMap");
  if (!el) return;
  if (!coMap) {
    coMap = L.map(el, { zoomControl: true, attributionControl: true });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap"
    }).addTo(coMap);
    coMap.on("click", (e) => {
      if (coMapBusy) return;
      pickMapPoint(e.latlng.lat, e.latlng.lng);
    });
  }
  const d = state.checkout && state.checkout.dest;
  const c = (d && parseCoords(d.coords)) || TIZAYUCA;
  coMap.setView([c.lat, c.lng], 14);
  if (coMarker) { coMarker.setLatLng([c.lat, c.lng]); }
  else { coMarker = L.marker([c.lat, c.lng]).addTo(coMap); }
  setTimeout(() => coMap.invalidateSize(), 120);
}

async function reverseGeocode(lat, lng) {
  try {
    const r = await fetch(
      "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" + lat + "&lon=" + lng + "&accept-language=es",
      { headers: { Accept: "application/json" } }
    );
    if (!r.ok) return null;
    const j = await r.json();
    return (j && (j.display_name || (j.address && (j.address.road || j.address.suburb)))) || null;
  } catch (e) { return null; }
}

async function pickMapPoint(lat, lng) {
  coMapBusy = true;
  const coords = lat.toFixed(6) + "," + lng.toFixed(6);
  if (coMarker) coMarker.setLatLng([lat, lng]);
  else if (coMap) coMarker = L.marker([lat, lng]).addTo(coMap);
  $("#addrMsg").textContent = "Buscando dirección…";
  const name = await reverseGeocode(lat, lng);
  const text = name || ("Punto en mapa (" + lat.toFixed(4) + ", " + lng.toFixed(4) + ")");
  if ($("#coSavePlace").checked) {
    savePlace({ label: shortLabel(text), text: text, coords: coords });
    $("#coSavePlace").checked = false;
  }
  setDest({ text: text, coords: coords }, true);
  $("#addrMsg").textContent = "Punto marcado en el mapa. Puedes guardar el lugar o cambiarlo.";
  toast("Punto de entrega marcado 📍");
  coMapBusy = false;
}

async function geocodeAddress(text) {
  try {
    const q = encodeURIComponent(text + ", Tizayuca, Hidalgo, México");
    const r = await fetch("https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=" + q, {
      headers: { Accept: "application/json" }
    });
    if (!r.ok) return null;
    const arr = await r.json();
    if (!arr || !arr[0]) return null;
    return { lat: Number(arr[0].lat), lng: Number(arr[0].lon), label: arr[0].display_name || text };
  } catch (e) { return null; }
}

async function applyTypedAddress() {
  const text = $("#coAddrInput").value.trim();
  const msg = $("#addrMsg");
  if (text.length < 5) { msg.textContent = "Escribe una dirección más completa (calle, número y colonia)."; return; }
  msg.textContent = "Buscando en el mapa…";
  const geo = await geocodeAddress(text);
  const coords = geo ? (geo.lat.toFixed(6) + "," + geo.lng.toFixed(6)) : null;
  const label = geo ? (geo.label || text) : text;
  if ($("#coSavePlace").checked) savePlace({ label: shortLabel(text), text: label, coords: coords });
  $("#coSavePlace").checked = false;
  setDest({ text: label, coords: coords });
  if (geo && coMap) {
    if (coMarker) coMarker.setLatLng([geo.lat, geo.lng]);
    else coMarker = L.marker([geo.lat, geo.lng]).addTo(coMap);
    coMap.setView([geo.lat, geo.lng], 16);
  }
  msg.textContent = geo ? "Dirección localizada en el mapa." : "Dirección guardada (sin coordenadas exactas).";
}
$("#btnUseAddr").addEventListener("click", applyTypedAddress);
$("#coAddrInput").addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); applyTypedAddress(); } });

$("#btnGeo").addEventListener("click", () => {
  const msg = $("#addrMsg");
  if (!navigator.geolocation) { msg.textContent = "Tu navegador no permite usar la ubicación. Escribe tu dirección o toca el mapa."; return; }
  msg.textContent = "Buscando tu ubicación…";
  navigator.geolocation.getCurrentPosition(async (pos) => {
    const lat = pos.coords.latitude, lng = pos.coords.longitude;
    await pickMapPoint(lat, lng);
  }, () => {
    msg.textContent = "No pudimos obtener tu ubicación. Toca el mapa o escribe tu dirección.";
  }, { enableHighAccuracy: true, timeout: 10000 });
});

$("#btnFinalize").addEventListener("click", () => {
  const co = state.checkout;
  if (!co || $("#btnFinalize").disabled) return;
  const b = BRANCHES[state.branch];
  $("#cfBranch").textContent = b.name;
  $("#cfAddress").textContent = co.dest.text;
  $("#cfEta").textContent = etaText(b);
  $("#cfTotal").textContent = money(checkoutPricing().total);
  openModal("#confirmModal");
});

// "Sí, confirmar" -> ahora primero se pide la tarjeta
$("#btnConfirmOrder").addEventListener("click", () => {
  if (!state.checkout) return;
  closeModal($("#confirmModal"));
  openPay();
});

/* ---------- PAGO CON TARJETA  ---------- */

const pay = { busy: false };
const digitsOf = (s) => String(s).replace(/\D/g, "");
const isAmex = (d) => /^3[47]/.test(d);
const cardLen = (d) => (isAmex(d) ? 15 : 16);

function cardBrand(d) {
  if (/^4/.test(d)) return "VISA";
  if (/^(5[1-5]|2(2[2-9]|[3-6]\d|7[01]|720))/.test(d)) return "MASTERCARD";
  if (isAmex(d)) return "AMEX";
  return "TARJETA";
}

function groupNumber(d) {
  if (isAmex(d)) return [d.slice(0, 4), d.slice(4, 10), d.slice(10, 15)].filter(Boolean).join(" ");
  return (d.match(/.{1,4}/g) || []).join(" ");
}
function paintCard() {
  const d = digitsOf($("#ccNumber").value);
  const len = cardLen(d);
  $("#ccShowNumber").textContent = groupNumber((d + "•".repeat(len)).slice(0, len));
  $("#ccBrand").textContent = cardBrand(d);
  $("#ccShowExp").textContent = $("#ccExp").value || "MM/AA";
  $("#ccShowCvv").textContent = "•".repeat(Math.max(3, $("#ccCvv").value.length));
}

$("#ccNumber").addEventListener("input", (e) => {
  const raw = digitsOf(e.target.value);
  e.target.value = groupNumber(raw.slice(0, cardLen(raw)));
  paintCard();
});
$("#ccExp").addEventListener("input", (e) => {
  let d = digitsOf(e.target.value);
  if (d.length === 1 && Number(d) > 1) d = "0" + d; 
  d = d.slice(0, 4);
  e.target.value = d.length >= 3 ? d.slice(0, 2) + "/" + d.slice(2) : d;
  paintCard();
});
$("#ccCvv").addEventListener("input", (e) => { e.target.value = digitsOf(e.target.value).slice(0, 4); paintCard(); });

$("#ccCvv").addEventListener("focus", () => $("#ccCard").classList.add("flip"));
["#ccNumber", "#ccExp"].forEach((s) => $(s).addEventListener("focus", () => $("#ccCard").classList.remove("flip")));
$("#ccCvv").addEventListener("blur", () => $("#ccCard").classList.remove("flip"));

function cardError() {
  const d = digitsOf($("#ccNumber").value);
  if (d.length !== cardLen(d)) return "Escribe los " + cardLen(d) + " números de tu tarjeta.";
  const m = $("#ccExp").value.match(/^(\d{2})\/(\d{2})$/);
  if (!m) return "Escribe la fecha de vencimiento como MM/AA.";
  const mm = Number(m[1]), yy = Number(m[2]);
  if (mm < 1 || mm > 12) return "El mes debe ir del 01 al 12.";
  const now = new Date(), cy = now.getFullYear() % 100, cm = now.getMonth() + 1;
  if (yy < cy || (yy === cy && mm < cm)) return "Esa tarjeta ya venció.";
  const need = isAmex(d) ? 4 : 3;
  if (digitsOf($("#ccCvv").value).length !== need) return "El CVV tiene " + need + " números.";
  return "";
}

function cashPayment(amount, total) {
  const text = String(amount).trim();
  const value = Number(text);
  if (!/^\d+(?:\.\d{1,2})?$/.test(text) || !Number.isFinite(value) || value <= 0 || !Number.isSafeInteger(Math.round(value * 100))) {
    return { error: "Escribe una cantidad válida con hasta dos decimales." };
  }
  const cents = Math.round(value * 100), totalCents = Math.round(total * 100);
  if (cents < totalCents) return { error: "La cantidad debe cubrir el total de " + money(totalCents / 100) + "." };
  return { cashAmount: cents / 100, change: (cents - totalCents) / 100 };
}
function updateCashChange() {
  if (!state.checkout) return;
  const total = checkoutPricing().total;
  const amount = $("#cashAmount").value;
  const result = cashPayment(amount, total);
  $("#cashChange").textContent = !amount.trim() ? "Indica la cantidad para calcular tu cambio." : result.error || "Tu cambio será: " + money(result.change);
}
$("#cashAmount").addEventListener("input", () => {
  $("#payError").textContent = "";
  updateCashChange();
});
function transferConfigured() {
  return !!(transferConfig.bank && transferConfig.holder && (transferConfig.demo === true || /^\d{18}$/.test(transferConfig.clabe)));
}
function transferReference(value) {
  const reference = String(value || "").trim();
  return reference.length >= 3 && reference.length <= 100 && !/[\u0000-\u001f\u007f]/.test(reference) ? reference : "";
}
function updatePaymentMethod() {
  const method = $("#paymentMethod").value;
  $$("[data-payment]").forEach(button => {
    const selected = button.dataset.payment === method;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  $("#payForm").classList.toggle("hidden", !method);
  $("#payError").textContent = "";
  $("#transferFields").classList.toggle("hidden", method !== "Transferencia");
  const configured = transferConfigured();
  $("#transferDetails").textContent = configured ? (transferConfig.demo ? "DEMOSTRACIÓN: datos ficticios. No realizar transferencias reales.\n" : "") + "Banco: " + transferConfig.bank + "\nTitular: " + transferConfig.holder + (transferConfig.demo ? "\nNúmero ficticio: " : "\nCLABE: ") + transferConfig.clabe : "Datos bancarios pendientes de configurar. Contacta a la sucursal antes de transferir.";
  $("#transferReference").disabled = !configured;
  $("#transferReference").placeholder = transferConfig.demo ? "Ej. PRUEBA-001" : "Referencia de tu transferencia";
  $("#btnPay").disabled = method === "Transferencia" && !configured;
  $("#cashFields").classList.toggle("hidden", method !== "Efectivo");
  if (method === "Efectivo") updateCashChange();
  $("#cardFields").classList.toggle("hidden", method !== "Tarjeta");
  $("#cardInputs").classList.toggle("hidden", method !== "Tarjeta");
  $("#payForm .demo-note").classList.toggle("hidden", method !== "Tarjeta");
  $("#paymentNotice").classList.toggle("hidden", !method || method === "Tarjeta");
  $("#paymentNotice").textContent = method === "Efectivo" ? "Paga en efectivo al recibir tu pedido." : "Solicita los datos bancarios a la sucursal. El pago quedará pendiente hasta que la sucursal verifique la transferencia.";
  $("#btnPay").textContent = method === "Tarjeta" ? "Pagar " + $("#payTotal").textContent : "Confirmar pedido";
}
$$("[data-payment]").forEach(button => button.addEventListener("click", () => {
  if (pay.busy) return;
  $("#paymentMethod").value = button.dataset.payment;
  updatePaymentMethod();
}));
function openPay() {
  const co = state.checkout;
  if (!co) return;
  const total = checkoutPricing().total;
  ["#ccNumber", "#ccExp", "#ccCvv"].forEach((s) => { $(s).value = ""; });
  $("#payError").textContent = "";
  $("#payTotal").textContent = money(total);
  $("#btnPay").textContent = "Pagar " + money(total);
  $("#ccCard").classList.remove("flip", "shake");
  $("#payOverlay").className = "pay-overlay";
  paintCard();
  $("#transferReference").value = "";
  $("#cashAmount").value = "";
  $("#cashChange").textContent = "";
  $("#paymentMethod").value = "";
  updatePaymentMethod();
  openModal("#payModal");
  setTimeout(() => { if ($("#payModal").classList.contains("open")) $("[data-payment]").focus(); }, 350);
}

$("#payForm").addEventListener("submit", (e) => {
  e.preventDefault();
  if (pay.busy) return;
  const method = $("#paymentMethod").value;
  if (!["Tarjeta", "Efectivo", "Transferencia"].includes(method)) return;
  if (method !== "Tarjeta") {
    if (!state.checkout) return;
    const payment = { method, status: method === "Efectivo" ? "Pendiente de cobro" : "Pendiente de verificación" };
    if (method === "Efectivo") {
      const total = checkoutPricing().total;
      const result = cashPayment($("#cashAmount").value, total);
      if (result.error) { $("#payError").textContent = result.error; $("#cashAmount").focus(); return; }
      Object.assign(payment, result);
    }
    if (method === "Transferencia") {
      if (!transferConfigured()) { $("#payError").textContent = "La sucursal aún no configuró sus datos bancarios."; return; }
      const reference = transferReference($("#transferReference").value);
      if (!reference) { $("#payError").textContent = "Escribe una referencia válida de 3 a 100 caracteres."; $("#transferReference").focus(); return; }
      payment.reference = reference;
      payment.demo = transferConfig.demo === true;
    }
    closeModal($("#payModal"));
    completeOrder(payment);
    return;
  }
  const err = cardError();
  if (err) {
    $("#payError").textContent = err;
    const c = $("#ccCard");
    c.classList.remove("flip", "shake");
    void c.offsetWidth;
    c.classList.add("shake");
    return;
  }
  $("#payError").textContent = "";

  const d = digitsOf($("#ccNumber").value);
  const payment = { method: "Tarjeta", brand: cardBrand(d), last4: d.slice(-4) };
  ["#ccNumber", "#ccExp", "#ccCvv"].forEach((s) => { $(s).value = ""; });

  pay.busy = true;
  const ov = $("#payOverlay");
  ov.className = "pay-overlay show processing";
  setTimeout(() => { ov.className = "pay-overlay show success"; Sound.play("pay"); }, 1900);
  setTimeout(() => {
    pay.busy = false;
    closeModal($("#payModal"));
    ov.className = "pay-overlay";
    paintCard();
    completeOrder(payment);
  }, 3600);
});

async function completeOrder(payment) {
  const co = state.checkout;
  if (!co) return;
  const b = BRANCHES[state.branch];
  const fee = feeOf(b);
  const subtotal = itemsSubtotal(co.items);
  const totals=checkoutPricing();

  const order = {
    folio: "TF-" + String(Date.now()).slice(-6),
    ts: Date.now(),
    date: new Date().toLocaleString("es-MX"),
    items: co.items,
    subtotal: subtotal,
    fee: fee,
    total: totals.total,discount:totals.discount,couponCode:totals.couponCode,
    branch: b.name,
    branchIdx: state.branch,
    etaMin: etaOf(b),
    address: co.dest.text,
    coords: co.dest.coords,
    payment: payment, status: "Recibido", managed: true
  };

  if (dbSource === "api") {
    if (pay.busy) return;
    pay.busy = true;
    try {
      const response = await fetch("api/orders", {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(order)});
      const result = await response.json();
      if (!response.ok) throw Error(result.error || "No se pudo guardar el pedido.");
      if(result.order)Object.assign(order,result.order);
    } catch (err) { toast(err.message); openPay(); return; }
    finally { pay.busy = false; }
  }
  state.orders.unshift(order);
  save("tizafood_orders", state.orders);


  if (co.fromCart) { state.cart = []; save("tizafood_cart", state.cart); renderCart(); }
  state.checkout = null;

  closeScreen($("#checkoutScreen"));
  openTracking(order.folio);
  toast("¡Pedido confirmado! ");
}

/* ---------- SEGUIMIENTO DEL PEDIDO ---------- */

let trackTimer = null;
let trackFolio = null;

function orderItems(o) {
  if (o.items) return o.items;
  return [{ name: o.product, qty: o.qty || 1, base: o.unit || 0,
            extras: (o.extras || []).map((x) => (typeof x === "string" ? { name: x, price: 0 } : x)) }];
}

function stageOf(o) {
  if (o.cancelled || o.status === "Cancelado") return -1;
  if (o.managed || dbSource === "api") return FoodManagement.states.indexOf(FoodManagement.statusOf(o));
  if (!o.ts) return 3;
  const elapsed = (Date.now() - o.ts) / 1000;
  const scale = DEMO_SEGUNDOS ? 1 : ((o.etaMin || 25) * 60) / STAGES[3].at;
  let idx = 0;
  STAGES.forEach((s, k) => { if (elapsed >= s.at * scale) idx = k; });
  return idx;
}

function progressOf(o) {
  const idx = stageOf(o);
  if (idx < 0) return 0;
  if (idx >= 3) return 100;
  if (o.managed || dbSource === "api") return idx / 3 * 100;
  const scale = DEMO_SEGUNDOS ? 1 : ((o.etaMin || 25) * 60) / STAGES[3].at;
  const elapsed = (Date.now() - (o.ts || 0)) / 1000;
  const a = STAGES[idx].at * scale, z = STAGES[idx + 1].at * scale;
  return Math.min(100, ((idx + (elapsed - a) / (z - a)) / 3) * 100);
}

const canCancel = (o) => { const s = stageOf(o); return s === 0 || s === 1; };
const clock = (ms) => new Date(ms).toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" });
const findOrder = (folio) => state.orders.find((o) => o.folio === folio);

function driverOf(o) {
  let n = 0;
  for (const ch of o.folio) n += ch.charCodeAt(0);
  return DRIVERS[n % DRIVERS.length];
}

function openTracking(folio) {
  syncClientData();
  const o = findOrder(folio);
  if (!o) return;
  trackFolio = folio;
  const b = BRANCHES[o.branchIdx] || BRANCHES[0];
  const fee = o.fee || 0;

  $("#trackBody").innerHTML =
    '<div class="track-hero">' +
      '<div id="trEmoji" class="track-emoji">✅</div>' +
      '<div id="trStatus" class="track-status"></div>' +
      '<div id="trSub" class="track-sub"></div>' +
      '<div class="progress"><div id="trBar" class="progress-bar"></div></div>' +
    "</div>" +

    '<div class="timeline" id="trTimeline">' +
      STAGES.map((s, k) =>
        '<div class="tl-step" data-k="' + k + '"><span class="tl-icon">' + s.icon + "</span>" +
        "<div><strong>" + s.name + "</strong><small>" + s.sub + " · <span class=\"tl-time\">" +
        clock((o.ts || Date.now()) + (o.etaMin || 25) * 60000 * s.frac) + "</span></small></div></div>").join("") +
    "</div>" +

    '<h3 class="sub-title">Tu repartidor</h3>' +
    '<div class="map-box"><iframe id="trMap" title="Ruta del pedido" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>' +
    '<div class="driver-card"><span class="avatar">🛵</span><div><strong>' + esc(driverOf(o)) + "</strong>" +
      '<small class="muted">Sale de ' + esc(o.branch) + " · " + esc(o.address) + "</small></div></div>" +

    '<h3 class="sub-title">Detalle del pedido · ' + esc(o.folio) + "</h3>" +
    '<div class="summary">' + summaryHTML(orderItems(o), fee,o.discount||0,o.couponCode||"") + "</div>" +

    '<div class="track-actions">' +
      '<button id="trTicket" class="btn btn-ghost"> Ver ticket</button>' +
      '<button id="trCancel" class="btn btn-danger">Cancelar pedido</button>' +
      '<button id="trHome" class="btn btn-main">Volver al inicio</button>' +
    "</div>" +
    (o.managed || dbSource === "api" ? '<p class="demo-note">El restaurante actualiza el estado de tu pedido. Este seguimiento se refresca automáticamente.</p>' : "");

  setFrame($("#trMap"), mapRouteUrl(b, { text: o.address, coords: o.coords || null }));
  $("#trTicket").addEventListener("click", () => showTicket(o));
  $("#trCancel").addEventListener("click", () => cancelarPedido(o.folio));
  $("#trHome").addEventListener("click", () => { closeScreen($("#trackScreen")); closeScreen($("#accountScreen")); showView("home"); });

  updateTracking();
  openScreen("#trackScreen");
  clearInterval(trackTimer);
  trackTimer = setInterval(updateTracking, 1000);
}

function updateTracking() {
  const o = findOrder(trackFolio);
  if (!o || !$("#trStatus")) return;
  const idx = stageOf(o);

  if (idx < 0) {
    $("#trEmoji").textContent = "❌";
    $("#trStatus").textContent = "Pedido cancelado";
    const fee = o.cancelFee != null ? o.cancelFee : cancelFeeOf(o.total);
    const refund = o.refund != null ? o.refund : Math.round((Number(o.total) - fee) * 100) / 100;
    $("#trSub").textContent = "Cargo por cancelación 20%: " + money(fee) + " · Reembolso: " + money(refund);
    $("#trBar").style.width = "0%";
  } else {
    $("#trEmoji").textContent = STAGES[idx].icon;
    $("#trStatus").textContent = STAGES[idx].name;
    $("#trSub").textContent = idx === 3 ? STAGES[3].sub : STAGES[idx].sub + " · llega en ~" + (o.etaMin || 25) + " min";
    $("#trBar").style.width = progressOf(o) + "%";
  }

  $$("#trTimeline .tl-step").forEach((el) => {
    const k = Number(el.dataset.k);
    el.classList.toggle("done", idx > k);
    el.classList.toggle("active", idx === k);
  });
  if (o.managed || dbSource === "api") {
    $$("#trTimeline .tl-time").forEach((el,k)=>{
      const name=FoodManagement.states[k];
      const event=(o.statusHistory||[]).find(e=>e.status===name);
      el.textContent=event?clock(event.at):(k<=idx?"Completado":"Pendiente");
    });
  }
  $("#trCancel").classList.toggle("hidden", !canCancel(o));
  if (idx === 3 || idx < 0) { clearInterval(trackTimer); trackTimer = null; }
}

function stopTracking() { clearInterval(trackTimer); trackTimer = null; }

/* ---------- CANCELAR PEDIDO ---------- */

const CANCEL_FEE_RATE = 0.20;

function cancelFeeOf(total) {
  return Math.round(Number(total) * CANCEL_FEE_RATE * 100) / 100;
}

async function cancelarPedido(folio) {
  const pedido = findOrder(folio);
  if (!pedido || !canCancel(pedido)) { toast("Este pedido ya no se puede cancelar"); return; }
  const fee = cancelFeeOf(pedido.total);
  const refund = Math.round((Number(pedido.total) - fee) * 100) / 100;
  const msg =
    "¿Cancelar el pedido " + folio + "?\n\n" +
    "Política de cancelación:\n" +
    "• Cargo por cancelación (20%): " + money(fee) + "\n" +
    "• Reembolso que recibes (80%): " + money(refund) + "\n\n" +
    "El 20% cubre la preparación y pérdida del negocio.";
  if (!confirm(msg)) return;
  if (dbSource === "api") {
    try {
      const response = await fetch("api/orders",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...pedido,cancelled:true,status:"Cancelado"})});
      const result = await response.json(); if(!response.ok)throw Error(result.error);
    } catch(err) {toast(err.message);await syncClientData();return;}
  }
  pedido.cancelled = true;
  pedido.status = "Cancelado";
  pedido.cancelFee = fee;
  pedido.refund = refund;
  pedido.cancelledAt = new Date().toISOString();
  save("tizafood_orders", state.orders);

  toast("Cancelado · cargo 20% " + money(fee) + " · reembolso " + money(refund));
  renderOrders();
  if (trackFolio === folio) { updateTracking(); }
}

/* ---------- TICKET ---------- */

function showTicket(o) {
  const rows = orderItems(o).map((l) =>
    '<div class="t-row"><span>' + l.qty + " x " + esc(l.name) + "</span><span>" + money(lineTotal(l)) + "</span></div>" +
    (l.extras.length ? '<p class="center" style="text-align:left">+ ' + esc(l.extras.map((x) => x.name || x).join(", ")) + "</p>" : "")
  ).join("");

  $("#ticket").innerHTML =
    "<h4>Tiza Food</h4>" +
    '<p class="center">Tizayuca, Hidalgo</p>' +
    "<hr>" +
    '<div class="t-row"><span>Folio</span><span>' + esc(o.folio) + "</span></div>" +
    '<div class="t-row"><span>Fecha</span><span>' + esc(o.date) + "</span></div>" +
    '<div class="t-row"><span>Cliente</span><span>' + esc(state.user.name) + "</span></div>" +
    '<div class="t-row"><span>Sucursal</span><span>' + esc(o.branch) + "</span></div>" +
    "<hr>" + rows + "<hr>" +
    '<div class="t-row"><span>Subtotal</span><span>' + money(o.subtotal) + "</span></div>" +
    '<div class="t-row"><span>Envío</span><span>' + money(o.fee) + "</span></div>" +
    (o.discount>0 ? '<div class="t-row"><span>Cupón '+esc(o.couponCode)+'</span><span>−'+money(o.discount)+'</span></div>' : "") +
    '<div class="t-row total"><span>TOTAL</span><span>' + money(o.total) + "</span></div>" +
    (o.cancelled || o.status === "Cancelado"
      ? '<div class="t-row"><span>Cargo cancelación (20%)</span><span>' + money(o.cancelFee != null ? o.cancelFee : cancelFeeOf(o.total)) + "</span></div>" +
        '<div class="t-row total"><span>REEMBOLSO (80%)</span><span>' + money(o.refund != null ? o.refund : Math.round((o.total - cancelFeeOf(o.total)) * 100) / 100) + "</span></div>"
      : "") +
    (o.payment ? '<div class="t-row"><span>Pago</span><span>' + (o.payment.method === "Tarjeta" ? esc(o.payment.brand) + " •••• " + esc(o.payment.last4) : esc(o.payment.method) + " · " + esc(o.payment.status || "Pendiente")) + "</span></div>" : "") +
    (o.payment && o.payment.method === "Transferencia" && o.payment.demo ? '<p class="center">DEMOSTRACIÓN · Datos ficticios.<br>No realizar transferencias reales.</p>' : "") +
    (o.payment && o.payment.method === "Transferencia" && o.payment.reference ? '<div class="t-row"><span>Referencia</span><span style="overflow-wrap:anywhere;min-width:0;text-align:right">' + esc(o.payment.reference) + '</span></div>' : "") +
    (o.payment && o.payment.method === "Efectivo" && Number.isFinite(o.payment.cashAmount) && Number.isFinite(o.payment.change) ? '<div class="t-row"><span>Paga con</span><span>' + money(o.payment.cashAmount) + '</span></div><div class="t-row"><span>Cambio</span><span>' + money(o.payment.change) + '</span></div>' : "") +
    "<hr>" +
    '<p class="center">Entrega en:<br>' + esc(o.address) + "</p>" +
    '<p class="t-thanks">' + (o.cancelled || o.status === "Cancelado" ? "Pedido cancelado · cargo del 20% aplicado" : "¡Gracias por tu compra!") + "</p>";
  openModal("#ticketModal");
}

$("#btnPrint").addEventListener("click", () => {
  const contenido = $("#ticket").innerHTML;
  if(!contenido.trim()){toast("Primero abre el ticket de un pedido.");return;}
  const folio=(($("#ticket .t-row span:last-child")||{}).textContent||"ticket").trim().replace(/[^a-zA-Z0-9_-]/g,"");
  const printWindow=window.open("", "_blank", "width=520,height=760");
  if(!printWindow){toast("Permite la ventana emergente del ticket para guardarlo como PDF.");return;}
  const html='<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>ticket-tizafood-'+esc(folio)+'</title><style>'+
    '@page{size:A4 portrait;margin:14mm}*{box-sizing:border-box}body{font-family:Courier New,monospace;color:#1f1a17;background:#fff;margin:0;padding:20px}.wrap{max-width:360px;margin:20px auto;overflow-wrap:anywhere}.t-row{display:flex;justify-content:space-between;gap:12px;padding:3px 0;break-inside:avoid}.t-row span:last-child{text-align:right;min-width:0}.t-row.total{font-weight:bold;font-size:1.1rem;margin-top:4px}hr{border:none;border-top:2px dashed #bbb;margin:12px 0}.center{text-align:center;color:#6b625c;font-size:.85rem}.t-thanks{text-align:center;margin-top:12px;font-weight:bold}h4{text-align:center;font-size:1.3rem;margin:0 0 4px}.pdf-tools{font-family:Arial,sans-serif;max-width:420px;margin:0 auto 24px;padding:14px;background:#fff5e6;border-radius:12px;line-height:1.5}.pdf-tools button{padding:10px 16px;background:#d62828;color:white;border:0;border-radius:8px;cursor:pointer}@media print{.pdf-tools{display:none!important}body{padding:0}.wrap{margin:0 auto}}'+
    '</style></head><body><div class="pdf-tools"><p>En Destino elige <strong>Guardar como PDF</strong> y pulsa Guardar.</p><button id="savePdfAgain" type="button">Guardar como PDF / imprimir</button></div><div class="wrap">'+contenido+'</div></body></html>';
  printWindow.document.open();printWindow.document.write(html);printWindow.document.close();
  const printTicket=()=>{if(printWindow.closed)return;printWindow.focus();printWindow.print();};
  printWindow.document.getElementById("savePdfAgain").addEventListener("click",printTicket);
  printWindow.setTimeout(printTicket,300);
});

/* ---------- MI CUENTA ---------- */

function setAvatar(el) {
  const u = state.user;
  if (u.photo) {
    el.style.backgroundImage = "url(" + u.photo + ")";
    el.textContent = "";
  } else {
    el.style.backgroundImage = "";
    el.textContent = u.name.trim().charAt(0).toUpperCase();
  }
}

function renderUserChip() {
  $("#helloName").textContent = state.user.name.split(" ")[0];
  setAvatar($("#topAvatar"));
}

function orderStatusText(o) {
  const s = stageOf(o);
  return s < 0 ? "Cancelado" : STAGES[s].name;
}

function renderOrders() {
  const box = $("#ordersList");
  box.innerHTML = "";

  if (state.orders.length === 0) {
    box.innerHTML = '<div class="empty">Aún no has hecho pedidos. ¡Anímate a probar algo! </div>';
  } else {
    state.orders.forEach((o, i) => {
      const s = stageOf(o);
      const cls = s < 0 ? "cancel" : (s === 3 ? "" : "work");
      const items = orderItems(o).map((l) => l.qty + " × " + l.name).join(", ");
      const d = document.createElement("div");
      d.className = "order";
      d.style.animationDelay = i * 0.05 + "s";
      d.innerHTML =
        '<div class="order-top"><span>' + esc(o.folio) + '</span><span class="status-pill ' + cls + '">' + esc(orderStatusText(o)) + "</span></div>" +
        "<small>" + esc(items) + "</small>" +
        "<small>" + esc(o.date) + " · <strong>" + money(o.total) + "</strong>" +
        ((o.cancelled || o.status === "Cancelado")
          ? " · cargo 20% " + money(o.cancelFee != null ? o.cancelFee : cancelFeeOf(o.total)) + " · reembolso " + money(o.refund != null ? o.refund : Math.round((o.total - cancelFeeOf(o.total)) * 100) / 100)
          : "") + "</small>" +
        (o.deliveryRating ? '<small>Tu calificación: '+o.deliveryRating.stars+' de 5 ★'+(o.deliveryRating.comment?' · '+esc(o.deliveryRating.comment):'')+'</small>' : "") +
        '<div class="order-actions">' +
          '<button class="btn btn-ghost" data-track="' + esc(o.folio) + '">📍 Seguimiento</button>' +
          (FoodManagement.statusOf(o)==="Entregado" && !o.deliveryRating ? '<button class="btn btn-main" data-rate-delivery="'+esc(o.folio)+'">Calificar entrega</button>' : "") +
          (canCancel(o) ? '<button class="btn btn-danger" data-cancel="' + esc(o.folio) + '">Cancelar</button>' : "") +
        "</div>";
      box.appendChild(d);
    });
  }
  $("#uStats").textContent = state.orders.length + (state.orders.length === 1 ? " pedido" : " pedidos");
}

$("#ordersList").addEventListener("click", (e) => {
  const rating=e.target.closest("[data-rate-delivery]");if(rating){openDeliveryRating(rating.dataset.rateDelivery);return;}
  const t = e.target.closest("[data-track]");
  if (t) { openTracking(t.dataset.track); return; }
  const c = e.target.closest("[data-cancel]");
  if (c) cancelarPedido(c.dataset.cancel);
});

let ratingFolio="";
function openDeliveryRating(folio){
  const order=findOrder(folio);if(!order || FoodManagement.statusOf(order)!=="Entregado" || order.deliveryRating)return;
  ratingFolio=folio;$("#deliveryRatingForm").reset();$("#deliveryRatingError").textContent="";$("#deliveryRatingFolio").textContent="Pedido "+folio;openModal("#deliveryRatingModal");
}
$("#deliveryRatingForm").addEventListener("change",e=>{if(e.target.name==="deliveryStars")$("#deliveryRatingError").textContent="";});
$("#deliveryRatingForm").addEventListener("submit",async e=>{
  e.preventDefault();const selected=document.querySelector('input[name="deliveryStars"]:checked');
  if(!selected){$("#deliveryRatingError").textContent="Elige de 1 a 5 estrellas.";return;}
  const button=$("#saveDeliveryRating");button.disabled=true;
  try{const response=await fetch("api/orders/"+encodeURIComponent(ratingFolio)+"/rating",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({stars:Number(selected.value),comment:$("#deliveryRatingComment").value.trim()})});const result=await response.json();if(!response.ok)throw Error(result.error);const order=findOrder(ratingFolio);if(order)Object.assign(order,result.order);save("tizafood_orders",state.orders);renderOrders();closeModal($("#deliveryRatingModal"));toast("Gracias por calificar tu entrega.");}
  catch(err){$("#deliveryRatingError").textContent=err.message;}finally{button.disabled=false;}
});

function openAccount() {
  syncClientData();
  const u = state.user;
  $("#uName").value = u.name;
  $("#uEmail").value = u.email;
  $("#uAddress").value = u.address;
  $("#uNameTop").textContent = u.name;
  $("#profileMsg").textContent = "";
  setAvatar($("#bigAvatar"));
  renderPlacesList();
  renderOrders();
  openScreen("#accountScreen");
  $("#accountScreen .screen-body").scrollTop = 0;
}
$("#btnUser").addEventListener("click", openAccount);
$("#btnClientPanel").addEventListener("click", openAccount);

$("#profileForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = $("#uName").value.trim();
  const email = $("#uEmail").value.trim();
  const address = $("#uAddress").value.trim();
  const msg = $("#profileMsg");
  msg.style.color = "";
  if (name.length < 2) { msg.textContent = "Escribe tu nombre."; return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { msg.textContent = "Escribe un correo válido."; return; }
  if (address.length < 5) { msg.textContent = "Escribe tu dirección para el envío."; return; }

  state.user = Object.assign({}, state.user, { name, email, address });
  save("tizafood_user", state.user);
  renderUserChip();
  $("#uNameTop").textContent = name;
  setAvatar($("#bigAvatar"));
  toast("Datos guardados ");
});

// Foto de usuario
$("#btnPhoto").addEventListener("click", () => $("#photoInput").click());
$("#bigAvatar").addEventListener("click", () => $("#photoInput").click());
$("#photoInput").addEventListener("change", (e) => {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) { toast("Elige una imagen"); return; }
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      const size = 240;
      const c = document.createElement("canvas");
      c.width = c.height = size;
      const side = Math.min(img.width, img.height);
      c.getContext("2d").drawImage(img, (img.width - side) / 2, (img.height - side) / 2, side, side, 0, 0, size, size);
      state.user.photo = c.toDataURL("image/jpeg", 0.82);
      save("tizafood_user", state.user);
      renderUserChip();
      setAvatar($("#bigAvatar"));
      toast("Foto actualizada 📷");
    };
    img.onerror = () => toast("No se pudo leer esa imagen");
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
  e.target.value = "";
});

$("#btnLogout").addEventListener("click", async () => {
  if (!confirm("¿Cerrar sesión? Se borrarán tus datos y pedidos de este dispositivo.")) return;
  if (dbSource === "api") { try { await fetch("api/logout", {method:"POST"}); } catch (err) { toast("No se pudo cerrar sesión. Intenta otra vez."); return; } }
  ["tizafood_user", "tizafood_orders", "tizafood_cart", "tizafood_favs", "tizafood_branch", "tizafood_reviews"].forEach((k) => {
    try { localStorage.removeItem(k); } catch (e) { /* nada */ }
  });
  location.reload();
});

/* ---------- IMAGEN ROTATIVA DEL INICIO ---------- */

const comidaImagenes = ["img/hamburguesa.jpg", "img/cathamburgesa.jpg", "img/comidat.jpg", "img/ejemplo2.png"];
const imagenesValidas = [];
comidaImagenes.forEach((src) => {
  const im = new Image();
  im.onload = () => { if (!imagenesValidas.includes(src)) imagenesValidas.push(src); };
  im.src = src;
});

setInterval(() => {
  const heroImg = $(".animated-food-logo");
  if (!heroImg || imagenesValidas.length < 2) return;
  const actual = imagenesValidas.findIndex((s) => heroImg.src.endsWith(s));
  const siguiente = imagenesValidas[(actual + 1) % imagenesValidas.length];
  heroImg.style.opacity = "0";
  setTimeout(() => { heroImg.src = siguiente; heroImg.style.opacity = "1"; }, 300);
}, 5000);

/* ----------  RESEÑAS ---------- */
const SEED_REVIEWS = [];
PRODUCTS.forEach((p) => (p.reviews || []).forEach((r) => {
  SEED_REVIEWS.push({
    id: "s" + SEED_REVIEWS.length, user: r.user, product: p.name, comment: r.comment, date: null, mine: false,
    stars: (String(r.stars).match(/⭐/g) || []).length || 5
  });
}));
state.reviews = load("tizafood_reviews", []);

function allReviews() {
  const mine = state.reviews.slice().sort((a, b) => b.id - a.id).map((r) => Object.assign({ mine: true }, r));
  const ids = new Set(mine.map((r) => String(r.id)));
  return mine.concat(SEED_REVIEWS.filter((r) => !ids.has(String(r.id))));
}
const reviewsFor = (name) => allReviews().filter((r) => r.product === name);

// Calificación 
function ratingInfo(name, base) {
  const mine = state.reviews.filter((r) => r.product === name);
  const seed = SEED_REVIEWS.filter((r) => r.product === name);
  if (base) {
    const sum = base * 5 + mine.reduce((s, r) => s + r.stars, 0);
    return { avg: sum / (5 + mine.length), n: seed.length + mine.length };
  }
  const all = seed.concat(mine);
  if (!all.length) return { avg: null, n: 0 };
  return { avg: all.reduce((s, r) => s + r.stars, 0) / all.length, n: all.length };
}

const starsHTML = (n) => '<span class="stars" aria-label="' + n + ' de 5">' + "★".repeat(Math.round(n)) + "☆".repeat(5 - Math.round(n)) + "</span>";
const AVATAR_COLORS = ["#d62828", "#ff8c00", "#16a34a", "#7e22ce", "#0ea5e9", "#b45309"];
function colorOf(name) { let n = 0; for (const ch of name) n += ch.charCodeAt(0); return AVATAR_COLORS[n % AVATAR_COLORS.length]; }
const shortName = (full) => { const p = full.trim().split(/\s+/); return p.length > 1 ? p[0] + " " + p[1].charAt(0).toUpperCase() + "." : p[0]; };

function renderSheetReviews() {
  const item = sheet.item;
  if (!item) return;
  const info = ratingInfo(item.name, item.rating);
  $("#pRating").textContent = info.avg ? info.avg.toFixed(1) : "Nuevo";
  $("#pReviewCount").textContent = info.n ? "(" + info.n + (info.n === 1 ? " reseña)" : " reseñas)") : "";
  const rl = $("#pReviewsList");
  const list = reviewsFor(item.name);
  rl.classList.remove("hidden");
  rl.innerHTML = list.length
    ? list.map((r) => "<p>" + starsHTML(r.stars) + " <strong>" + esc(r.user) + '</strong><br><em>"' + esc(r.comment) + '"</em></p>').join("")
    : '<p class="muted">Aún no hay reseñas. ¡Sé el primero en opinar!</p>';
}

function renderReviews() {
  const all = allReviews();
  const sel = $("#reviewFilter");
  const names = [...new Set(all.map((r) => r.product))];
  const cur = sel.value;
  sel.innerHTML = '<option value="">Todos los productos (' + all.length + ")</option>" +
    names.map((n) => '<option value="' + esc(n) + '">' + esc(n) + "</option>").join("");
  if (names.includes(cur)) sel.value = cur;

  const shown = sel.value ? all.filter((r) => r.product === sel.value) : all;
  const avg = shown.length ? shown.reduce((s, r) => s + r.stars, 0) / shown.length : 0;

  const bars = [5, 4, 3, 2, 1].map((s) => {
    const c = shown.filter((r) => r.stars === s).length;
    const pct = shown.length ? Math.round((c / shown.length) * 100) : 0;
    return '<div class="rv-bar"><span>' + s + '</span><div class="rv-track"><div class="rv-fill" style="width:' + pct + '%"></div></div><span>' + c + "</span></div>";
  }).join("");

  $("#rvSummary").innerHTML =
    '<div class="rv-big"><strong>' + (shown.length ? avg.toFixed(1) : "—") + "</strong>" + starsHTML(avg) +
    "<small>" + shown.length + (shown.length === 1 ? " reseña" : " reseñas") + '</small></div><div class="rv-bars">' + bars + "</div>";

  const box = $("#rvList");
  if (!shown.length) {
    box.innerHTML = '<div class="empty">Todavía no hay reseñas de este producto. ¡Escribe la primera!</div>';
  } else {
    box.innerHTML = shown.map((r) =>
      '<article class="rv-card' + (r.mine ? " mine" : "") + '">' +
        '<span class="avatar" style="background:' + colorOf(r.user) + '">' + esc(r.user.charAt(0).toUpperCase()) + "</span>" +
        "<div><div class=\"rv-top\"><strong>" + esc(r.user) + (r.mine ? ' <span class="rv-you">Tu reseña</span>' : "") + "</strong>" + starsHTML(r.stars) + "</div>" +
        '<div class="rv-meta"><span class="rv-prod">' + esc(r.product) + "</span>" +
        (r.date ? " · " + new Date(r.date).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" }) : "") + "</div>" +
        '<p class="rv-text">' + esc(r.comment) + "</p>" +
        (r.mine ? '<button class="mini-link danger" data-del-review="' + r.id + '">Eliminar</button>' : "") +
        "</div></article>").join("");
  }

}

$("#reviewFilter").addEventListener("change", renderReviews);
$("#rvList").addEventListener("click", (e) => {
  const d = e.target.closest("[data-del-review]");
  if (!d) return;
  if (!confirm("¿Eliminar tu reseña?")) return;
  dbSend("DELETE", "reviews/" + encodeURIComponent(d.dataset.delReview) + "?owner=" + encodeURIComponent(ownerOf()));
  state.reviews = state.reviews.filter((r) => String(r.id) !== d.dataset.delReview);
  save("tizafood_reviews", state.reviews);
  renderReviews();
  if (sheet.item) renderSheetReviews();
  toast("Reseña eliminada");
});

// --- Modal para escribir reseña ---
let rvStars = 0;

function paintStars() {
  $$("#rvStars button").forEach((b) => b.classList.toggle("on", Number(b.dataset.s) <= rvStars));
}

function openReviewModal(productName) {
  const sel = $("#rvProduct");
  if (!sel.options.length) {
    const names = PRODUCTS.map((p) => p.name);
    const promos = PROMOS.map((p) => p.name).filter((n) => !names.includes(n));
    sel.innerHTML = '<optgroup label="Menú">' + names.map((n) => '<option value="' + esc(n) + '">' + esc(n) + "</option>").join("") + "</optgroup>" +
      '<optgroup label="Promociones">' + promos.map((n) => '<option value="' + esc(n) + '">' + esc(n) + "</option>").join("") + "</optgroup>";
  }
  sel.value = productName || (sheet.item && $("#productModal").classList.contains("open") ? sheet.item.name : PRODUCTS[0].name);
  rvStars = 0;
  paintStars();
  $("#rvText").value = "";
  $("#rvCount").textContent = "0 / 220";
  $("#rvError").textContent = "";
  openModal("#reviewModal");
}

$("#rvStars").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  rvStars = Number(b.dataset.s);
  paintStars();
});
$("#rvText").addEventListener("input", (e) => { $("#rvCount").textContent = e.target.value.length + " / 220"; });

$("#btnSendReview").addEventListener("click", () => {
  const text = $("#rvText").value.trim();
  const err = $("#rvError");
  if (!rvStars) { err.textContent = "Elige tus estrellas."; return; }
  if (text.length < 5) { err.textContent = "Cuéntanos un poco más (mínimo 5 letras)."; return; }

  state.reviews.push({
    id: Date.now(), user: shortName(state.user.name), stars: rvStars, comment: text,
    product: $("#rvProduct").value, date: new Date().toISOString()
  });
  save("tizafood_reviews", state.reviews);
  dbSend("POST", "reviews", Object.assign({ owner: ownerOf() }, state.reviews[state.reviews.length - 1]));
  Sound.play("tap");
  closeModal($("#reviewModal"));
  renderReviews();
  if (sheet.item) renderSheetReviews();
  toast("¡Gracias por tu reseña!");
});

$("#btnWriteReview").addEventListener("click", () => openReviewModal());
$("#pWrite").addEventListener("click", () => openReviewModal(sheet.item && sheet.item.name));

/* ----------  LUGARES DE ENTREGA  ---------- */

function renderPlacesList() {
  const box = $("#placesList");
  const saved = state.user.places || [];
  box.innerHTML = '<div class="order"><div class="order-top"><span> Mi dirección</span></div><small>' + esc(state.user.address) + "</small></div>" +
    saved.map((p, i) =>
      '<div class="order"><div class="order-top"><span>' + (p.coords ? "📍 " : "🏠 ") + esc(p.label) +
      '</span><button type="button" class="mini-link danger" data-place="' + i + '">Eliminar</button></div><small>' + esc(p.text) + "</small></div>"
    ).join("") +
    (saved.length ? "" : '<small class="muted">Cuando cambies el lugar de entrega en un pedido, marca “Guardar este lugar” y aparecerá aquí.</small>');
}
$("#placesList").addEventListener("click", (e) => {
  const d = e.target.closest("[data-place]");
  if (!d) return;
  state.user.places.splice(Number(d.dataset.place), 1);
  save("tizafood_user", state.user);
  renderPlacesList();
});

/* ---------- ARRANCAR ---------- */

window.addEventListener("load", () => setTimeout(startApp, 2800));
