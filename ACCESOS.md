> Actualización 20/10/2026: el acceso actual de los tres roles usa Firebase con correo y contraseña, sin Authenticator ni acceso local. Consulta GUIA-FIREBASE.md. Las instrucciones antiguas de acceso que siguen abajo son históricas.

# Accesos de Tiza Food

1. Si hay un servidor anterior abierto, detenlo con Ctrl + C.
2. Abre INICIAR-TIZA-FOOD.cmd con doble clic y deja la ventana abierta.
3. Entra a http://localhost:3000 y recarga con Ctrl + F5.
4. En el inicio de sesión, pulsa Configurar cuenta del dueño. Elige nombre, usuario y contraseña de al menos 8 caracteres. Esta configuración solo está disponible hasta crear el primer dueño.
5. El dueño puede agregar, editar y quitar productos; consultar pedidos; y crear cuentas de empleados desde Empleados.
6. El empleado entra por el mismo formulario con el usuario y contraseña que creó el dueño. Solo puede consultar pedidos; se actualizan cada 15 segundos y con el botón Actualizar pedidos.
7. El cliente elige Crear cuenta de cliente y llena sus datos, usuario, correo, contraseña y dirección separada en calle, colonia, código postal de cinco dígitos, municipio, estado y número de casa. Al entrar dispone de la tienda, su cuenta y sus pedidos.

Las cuentas anteriores se conservan como clientes y pueden entrar con su correo. No hay contraseñas predeterminadas. Las contraseñas se guardan mediante hash y las sesiones usan cookies HttpOnly. Al reiniciar el servidor es necesario volver a iniciar sesión.

Los paneles y las cuentas requieren el servidor. Abrir index.html directamente conserva la vista local de demostración; los pedidos guardados únicamente en ese navegador no se envían automáticamente al panel. Los pedidos nuevos realizados desde localhost se guardan en db.json. Las cuentas se guardan en usuarios.json.

Las transferencias siguen en demostración con datos ficticios; no se debe enviar dinero. El dueño administra los productos del catálogo; las promociones y sucursales existentes se conservan.
