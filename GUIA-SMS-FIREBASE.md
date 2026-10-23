# Referencia anterior: SMS desactivado

El acceso activo usa verificación por correo en el plan gratuito. Consulta GUIA-FIREBASE.md. El siguiente contenido describe una propuesta anterior que no está activa.

# Acceso del cliente con SMS de Firebase

## Cambio preparado

El cliente usa correo y contraseña de Firebase y después un código enviado a su celular por Firebase. No se usa Google Authenticator, QR ni un código generado en la aplicación. Dueño y empleado conservan el acceso con correo y contraseña de Firebase.

La primera vez el cliente verifica su correo mediante un enlace, acepta recibir el SMS, resuelve reCAPTCHA y vincula su teléfono con el código recibido. Al terminar debe iniciar sesión nuevamente. Este primer proceso puede enviar dos SMS: uno para vincular y otro para acceder. En cada inicio de sesión posterior se solicita otro código. Recargar una sesión abierta no envía otro SMS.

## Activación pendiente en la consola

El 21/10/2026 se comprobó que tizafood sigue en Spark y que Authentication todavía ofrece actualizar a Identity Platform. Correo/contraseña y Teléfono aparecen habilitados, pero habilitar Teléfono por sí solo no activa el segundo factor.

1. El titular debe completar la actualización al plan Blaze y vincular la facturación en Firebase. Los SMS reales tienen costo según el servicio y su uso. No se activó ningún cobro durante el desarrollo.
2. En Authentication, actualizar a Firebase Authentication con Identity Platform y habilitar la autenticación multifactor por SMS.
3. Revisar la política de regiones SMS y permitir México para teléfonos +52. Autorizar solo las regiones necesarias.
4. Publicar la aplicación en una dirección HTTPS autorizada, por ejemplo tizafood.web.app con Firebase Hosting, y comprobar los dominios autorizados de Authentication.
5. Probar con un correo y teléfono propios: verificar correo, vincular teléfono, cerrar sesión e iniciar sesión de nuevo con el SMS. El usuario resuelve personalmente reCAPTCHA.

Abrir index.html con file:// no permite este flujo. localhost tampoco es una solución para el dominio de autenticación telefónica. Publicar el código en GitHub no publica automáticamente la aplicación en una dirección web.

La aplicación admite sus dominios tizafood.web.app y tizafood.firebaseapp.com para conservar los datos del prototipo en el navegador. Aún no se realizó un despliegue. Al publicar, subir solo los archivos web necesarios: HTML, CSS, JavaScript del navegador e imágenes. No publicar usuarios.json, db.json, tickets, archivos privados, claves de servicio ni archivos del servidor.

## Implementación

- firebase-sms.js carga el SDK oficial de Firebase, verifica el correo, muestra reCAPTCHA, inscribe el teléfono y resuelve el segundo factor. Firebase genera y envía el código; la aplicación no lo inventa.
- firebase-session.js consulta accounts:lookup de Firebase para comprobar el token antes de revisar proyecto, UID, vigencia y la prueba de segundo factor telefónico.
- school-demo.js y access.js no abren una sesión de cliente hasta recibir esa prueba. El acceso anterior de solo contraseña no permite saltar el SMS.
- index.html y styles.css contienen el formulario; app.js conecta el resultado con el panel.

No se persisten contraseñas nuevas ni tokens Firebase. Los perfiles y permisos siguen siendo parte del prototipo local, no custom claims ni reglas de Firestore. El modo navegador no constituye autorización segura para producción; el servidor debe proteger los datos en un despliegue real.

Las pruebas aisladas verificaron inscripción, código incorrecto, nuevo acceso con SMS y bloqueo sin segundo factor usando respuestas simuladas. No enviaron SMS reales, no crearon cuentas reales y no generaron cargos. La prueba real queda pendiente de activar el servicio y disponer de HTTPS. Si se pierde el teléfono, el responsable debe gestionar la recuperación de la cuenta en Firebase; no se utilizan los antiguos códigos de Authenticator.

Documentación oficial: [SMS multifactor](https://firebase.google.com/docs/auth/web/multi-factor), [límites y facturación](https://firebase.google.com/docs/auth/limits), [dominios y reCAPTCHA](https://firebase.google.com/docs/auth/web/phone-auth).
