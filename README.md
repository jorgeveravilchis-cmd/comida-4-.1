# Tiza Food

Proyecto escolar de pedidos de comida con paneles de cliente, dueño y empleado. Los tres accesos usan Firebase Authentication. El cliente confirma su correo mediante un enlace al registrarse; dueño y empleado usan correo y contraseña. Se necesita internet para iniciar sesión; la aplicación actual no usa Google Authenticator ni códigos QR.

## Abrir el proyecto

1. Descarga o clona este repositorio completo.
2. Abre index.html en Chrome o Edge con conexión a internet. Consulta GUIA-FIREBASE.md.
3. Registra una cuenta de cliente, abre el enlace recibido por correo y pulsa Ya verifiqué mi correo. Los siguientes accesos piden correo y contraseña.
4. Para entrar como dueño o empleado utiliza una cuenta Firebase autorizada para ese rol. Consulta GUIA-FIREBASE.md.

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

## Horarios del restaurante

En Panel del dueño → Horarios configura los siete días y activa el horario. Antes de activarlo, los pedidos siguen disponibles para conservar el funcionamiento anterior. Se utiliza America/Mexico_City. Los intervalos son del mismo día (sin cruce de medianoche). El cierre es exclusivo: a la hora de cierre ya no se aceptan pedidos nuevos. Un día puede marcarse Cerrado. Si todos están cerrados, no hay próxima apertura. El cliente ve el estado y la próxima apertura; se actualiza cada 30 segundos y al volver a la ventana. La API vuelve a validar el horario al confirmar. El cierre no impide gestionar o cancelar pedidos existentes según sus reglas normales.

En el modo local, los horarios se guardan en ese navegador igual que el catálogo. No se sincronizan entre dispositivos por Firebase Authentication.

## Notificaciones de pedidos

El cliente recibe un aviso dentro de la app cuando cambia el estado de un pedido conocido. La campana muestra los avisos sin leer y permite consultar o borrar los últimos 50. Al abrirla se marcan como leídos. El historial se guarda por correo en ese navegador. La primera carga establece la referencia y no genera avisos para todos los pedidos antiguos. Un cambio posterior, incluso al volver a entrar, se detecta comparando el último estado conocido. Si hubo varios cambios entre consultas se informa del estado más reciente.

La consulta se realiza cada cinco segundos y al recuperar el foco. Se necesita tener la app abierta y conexión al servidor cuando se utiliza Node. En el modo local solo se reflejan datos del mismo navegador, como el resto del prototipo. Firebase Authentication no sincroniza los pedidos ni envía estas notificaciones; no son SMS, correos ni notificaciones push con la app cerrada.


## Revisión final e instrucciones de entrega

Antes de guardar un pedido, la app muestra productos, cantidades editables, subtotal, cupón, envío, total, dirección e instrucciones, y método de pago. Se puede volver a corregir dirección/instrucciones o elegir otro pago. Solo el botón Confirmar pedido guarda el pedido. Si aumenta la cantidad y el efectivo ya no alcanza, se solicita corregir el pago.

Las instrucciones son opcionales, tienen un máximo de 300 caracteres y se conservan con cada pedido. El personal las ve junto a la dirección y aparecen en el ticket. La regla compartida las valida y conserva escapadas al mostrarlas.


## Código postal con Postali

En el registro de clientes, al completar cinco dígitos se consulta https://postali.app/api/v1/mx/cp/{codigo}. Se envía solo el código postal. Estado y municipio se completan, y colonia se elige de los asentamientos devueltos; si solo existe una se selecciona automáticamente. Calle y número se escriben manualmente. Se conserva el orden original de los campos. Si falla la red, vence la consulta o no hay resultados, se permite captura manual. También hay un botón para corregir manualmente los datos. Cambiar el código cancela solicitudes anteriores para evitar resultados cruzados. Requiere internet y disponibilidad de Postali; Firebase no realiza esta consulta.

Datos de códigos postales: Postali (https://postali.app/api), servicio independiente que documenta uso gratuito, sin clave ni registro. No se incluye ningún token privado.
