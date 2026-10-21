# Tiza Food

Proyecto escolar de pedidos de comida con paneles de cliente, dueño y empleado. Los tres accesos usan Firebase Authentication con correo y contraseña. Se necesita internet para iniciar sesión; la aplicación actual no usa Google Authenticator ni códigos QR.

## Abrir el proyecto

1. Descarga o clona este repositorio completo.
2. Abre index.html en Chrome o Edge. Conserva los archivos y carpetas juntos.
3. Registra una cuenta de cliente o inicia sesión con tu correo y contraseña de Firebase.
4. Para vincular el dueño o empleado anteriores, consulta GUIA-FIREBASE.md.

Los pedidos, direcciones, catálogo y roles del prototipo se guardan en ese navegador. No se sincronizan entre compañeros mediante Firebase Authentication. Compartir este código no comparte las sesiones ni las contraseñas de quienes lo usan.

## Servidor Node opcional

Si tienes Node.js instalado, ejecuta en esta carpeta:

```sh
node server.js
```

Abre http://localhost:3000. En el primer inicio se crean db.json y usuarios.json a partir de los ejemplos sin datos personales. Si esos archivos ya existen, se conservan. En este modo, los datos del restaurante están en el servidor local.

## Trabajar en equipo

En VS Code abre esta carpeta, crea una rama para cada cambio y envía un pull request para revisarlo. Antes de editar, actualiza tu copia con los cambios del equipo.

Cada integrante usa su propia cuenta de GitHub. Para un repositorio privado, el propietario invita a sus compañeros desde Settings → Collaborators. No compartan la contraseña de GitHub o de Google.

## Qué se publica

El .gitignore excluye usuarios.json, db.json, tickets generados, archivos .env, claves de servicio y dependencias instaladas. Se incluyen db.example.json y usuarios.example.json sin cuentas ni pedidos reales.

La configuración web de firebase-config.js identifica el proyecto Firebase. No es una cuenta de servicio ni concede acceso administrativo a la consola. Las credenciales de los usuarios no se incluyen en ese archivo.

GitHub guarda el código y su historial. Publicar el repositorio no publica automáticamente la web ni comparte los datos del restaurante.

## Alcance escolar

La autorización y los perfiles del modo index.html pertenecen al prototipo local. Para un despliegue de producción se necesitaría un servidor que validara los permisos y una base de datos compartida con reglas de acceso.

Documentación de integración: GUIA-FIREBASE.md.
