# Acceso de Tiza Food con Firebase

## Estado actual

Cliente, dueño y empleado inician sesión con **correo y contraseña de Firebase Authentication**. Ya no se utiliza Authenticator, QR, código de demostración ni acceso local con contraseña. Para iniciar sesión necesitas internet. Los pedidos, productos, direcciones y permisos del prototipo continúan en esta aplicación; no se movieron a Firestore.

El método Correo electrónico/contraseña del proyecto `tizafood` se activó y verificó en la consola el 20/10/2026.

## Clientes que ya crearon su cuenta con Firebase

Recarga index.html con Ctrl + F5. Pulsa Comenzar y entra con el correo y contraseña de Firebase. Entrarás directamente a la tienda y a Mi panel, sin QR. Para una cuenta nueva usa Crear cuenta de cliente.

## Dueño y empleado: vincular la cuenta anterior una sola vez

1. Abre index.html de esta carpeta y recarga con Ctrl + F5.
2. Pulsa Dueño o Empleado.
3. Pulsa **Pasar mi cuenta anterior a Firebase**.
4. Comprueba el usuario anterior y escribe su contraseña anterior:
   - Dueño anterior: `dueno.demo` / `Dueno2026!`.
   - Empleado anterior: `empleado.demo` / `Empleado2026!`.
   - Si creaste otras cuentas, utiliza sus datos anteriores.
5. Elige Crear mi cuenta en Firebase, escribe un correo válido y elige una contraseña de al menos ocho caracteres. Confírmala. No compartas las contraseñas en el chat.
6. Si ese correo ya tiene una cuenta en Firebase, elige Ya tengo correo y contraseña en Firebase y utiliza la contraseña de esa cuenta. Esto vincula el acceso; no cambia su contraseña de Firebase.
7. Pulsa Vincular y entrar. Se conservan el nombre, la dirección y los permisos de la cuenta anterior. Entrarás directamente al panel.
8. En adelante, usa **el correo y contraseña de Firebase**, no el usuario .demo. No hace falta repetir la vinculación.

Esta operación solicita la contraseña anterior para evitar asignar permisos de dueño o empleado solo porque alguien seleccione ese tipo de acceso. Una cuenta de cliente nueva siempre obtiene rol cliente. Cada miembro del personal debe usar su propia cuenta Firebase. Si eres un cliente que migra una cuenta local anterior, usa el mismo correo para conservar la propiedad de tus pedidos.

## Crear más empleados

Entra como dueño y abre Empleados. Escribe el nombre, correo de Firebase y contraseña del nuevo empleado, y confírmala. Al guardarlo se crea su cuenta en Firebase y se le asigna rol empleado en esta aplicación. El dueño conserva su sesión. No se crean empleados desde el registro público.

## Datos y límites del prototipo

- Firebase Authentication comprueba las credenciales de los tres roles.
- Los perfiles y roles siguen asociados al UID de Firebase dentro del prototipo. No son custom claims de Firebase.
- Al abrir index.html directamente, los datos del restaurante y los perfiles están en ese navegador. Conserva la misma carpeta y navegador. La demostración local no sustituye la autorización de un servidor para producción.
- Con el servidor Node opcional se usan usuarios.json, db.json y una sesión HttpOnly vinculada al UID de Firebase. Si estaba ejecutándose al actualizar el código, reinícialo para cargar los cambios.
- No se guardan contraseñas nuevas ni tokens de Firebase en el navegador o en los perfiles JSON. Los hashes antiguos solo se usan para comprobar la vinculación de cuentas anteriores y se retiran de su perfil al vincular.
- No se crearon cuentas reales de dueño o empleado en tu nombre. Se crearán o vincularán cuando completes el formulario con tus correos y contraseñas.
- Los archivos de Authenticator anteriores se conservaron como referencia, pero ya no se cargan ni intervienen en el acceso. Las guías anteriores de Authenticator quedaron obsoletas.

## Archivos

- firebase-config.js: configuración web del proyecto.
- firebase-auth.js: registro y acceso mediante la API REST oficial de Firebase, perfiles y vinculación.
- legacy-accounts.js: accesos escolares anteriores para vincularlos una sola vez; no permite iniciar sesiones locales.
- school-demo.js: integración con los datos del navegador y permisos del prototipo.
- access.js: misma autenticación y permisos si se utiliza el servidor Node.
- app.js e index.html: formularios de acceso y vinculación.

## Validación

Pruebas aisladas con respuestas simuladas de Firebase: roles, migración, contraseñas incorrectas, alta de empleados, acceso directo sin OTP, permisos, desconexión sin acceso local alternativo y conservación de datos. Las pruebas no crean usuarios reales. Un registro real exitoso aparecerá en Authentication → Usuarios en la consola.

Documentación oficial: https://firebase.google.com/docs/reference/rest/auth
