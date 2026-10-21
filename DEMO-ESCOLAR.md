> Actualización 20/10/2026: el acceso actual de los tres roles usa Firebase con correo y contraseña, sin Authenticator ni acceso local. Consulta GUIA-FIREBASE.md. Las instrucciones antiguas de acceso que siguen abajo son históricas.

# Proyecto escolar: sin servidor

Abre index.html directamente en Chrome o Edge. No necesitas iniciar Node ni abrir una terminal.

1. Entra al formulario y pulsa Configurar cuenta del dueño. Elige tu usuario y contraseña.
2. Dentro del panel del dueño, agrega/edita/quita productos y crea empleados.
3. Cierra sesión. Crea una cuenta de cliente con su dirección completa y realiza un pedido de prueba.
4. Cierra sesión y entra como empleado para consultar los pedidos, o como dueño para administrarlos.

Las cuentas, productos y pedidos de esta demo se guardan en el almacenamiento del navegador, no en archivos JSON del disco. Usa el mismo navegador y el mismo index.html para conservarlos. No uses modo incógnito ni borres los datos del navegador si quieres conservar la demostración.

Las cuentas del servidor anterior no se copian a la demo: crea las cuentas de presentación desde la app. No se han borrado usuarios.json ni db.json.

Es una demostración escolar: los permisos son simulados en el navegador, no proporcionan protección real y los datos no se comparten entre computadoras. No se realizan pagos reales. El servidor existente sigue disponible si se desea utilizarlo en localhost.

## Segundo paso de demostración y panel del cliente
Al crear una cuenta o iniciar sesión en la demo local, se muestra un código de seis dígitos dentro de la app. Escríbelo para entrar. Caduca a los tres minutos, admite cinco intentos y puede regenerarse. No se envía por correo ni representa un segundo factor real; es una simulación escolar. Las sesiones ya abiertas se mantienen hasta cerrar sesión.

El cliente accede a sus datos, dirección, lugares de entrega y pedidos con el botón «Mi panel · Datos y pedidos» de la tienda, o con su avatar. El encabezado de esa pantalla dice «Mi panel de cliente».

## Pedidos, disponibilidad y ventas
- Dueño y empleado avanzan cada pedido con el botón «Pasar a…»: Recibido → En preparación → En camino → Entregado. No se pueden saltar pasos ni retroceder pedidos finalizados.
- El seguimiento del cliente ya no avanza por tiempo: consulta el estado del restaurante y se actualiza cada cinco segundos y al volver a la ventana.
- En Productos, el dueño usa «Marcar agotado» o «Marcar disponible». El producto permanece en el menú con la etiqueta Agotado y no se puede confirmar, incluso si estaba en un carrito anterior.
- En Ventas, solo el dueño ve pedidos recibidos, en proceso, entregados y cancelados, importe de pedidos y ventas entregadas. Puede filtrar por Hoy o Todo el historial. El día usa horario de Ciudad de México.
- Los importes incluyen envío. Se excluyen los pedidos cancelados de los importes y las ventas entregadas; los totales son del proyecto escolar y no representan cobros bancarios verificados.

## Cupones y calificar la entrega
En la pantalla de confirmación de entrega, usa el campo de cupón y pulsa Aplicar. Se puede quitar o reemplazar; solo se aplica uno por pedido.
- TIZA10: 10% sobre comida y extras, sin descontar el envío.
- ENVIOGRATIS: descuenta el costo de envío de la sucursal seleccionada.
- AHORRA20: descuenta $20 cuando el subtotal de comida y extras alcanza $100, antes del envío.
Los cupones son de prueba, se pueden usar en distintos pedidos y no son acumulables. El descuento queda guardado en el pedido, resumen, pago y ticket. El cambio en efectivo, las cancelaciones y las ventas usan el total descontado.

Después de que dueño o empleado marque el pedido como Entregado, el cliente puede abrir Mi panel → Mis pedidos → Calificar entrega. Debe elegir de 1 a 5 estrellas; el comentario es opcional (máximo 300 caracteres). Solo el cliente del pedido puede calificar y solo una vez. La calificación se conserva al recargar y también aparece en el pedido del restaurante. No se califican pedidos en proceso ni cancelados.

## Guardar el ticket en PDF
Abre el ticket de un pedido y pulsa Guardar PDF. Se abre una ventana con el ticket y el diálogo de impresión del navegador. En Destino elige Guardar como PDF y pulsa Guardar para escoger carpeta y nombre. Las instrucciones y botones de esa ventana no se incluyen en el PDF. Si cancelas el diálogo, puedes usar Guardar como PDF / imprimir para volver a abrirlo.
Si el navegador bloquea la ventana emergente, permite abrirla y vuelve a pulsar Guardar PDF. No se necesita servidor ni descargar bibliotecas. Usa Chrome o Edge para disponer del diálogo completo de impresión.

## Authenticator sin conexión
La nueva vinculación por QR y la validación TOTP se explican en GUIA-AUTHENTICATOR.md. Las cuentas no vinculadas pueden elegir el código de demostración como respaldo. Las vinculadas usan el celular o un código de recuperación de un solo uso. Las claves no se muestran en los siguientes inicios de sesión. El módulo totp.js usa Web Crypto y el QR se genera con vendor/qrcode.min.js, ambos localmente. Los datos anteriores de cuentas, productos y pedidos se conservan.
