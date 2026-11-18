# Infraestructura con OpenTofu

Esta configuración administra Docker en un equipo local o remoto por SSH. Crea una red privada, un volumen para los informes, otro para el perfil del navegador y los dos contenedores. No publica los puertos del navegador; el puerto de control de Radar se enlaza únicamente a loopback. El servidor y su red privada deben protegerse por separado.

## Instalación nueva

1. Instala OpenTofu, Node.js 22 y el cliente de Docker en el equipo que ejecutará OpenTofu. Configura el acceso SSH al servidor si Docker no es local. La clave de OpenCode Go debe existir como archivo privado en el servidor Docker.
2. Construye las imágenes en el servidor Docker. Por ejemplo, desde la raíz del repositorio, para un destino SSH:

   ```sh
   export DOCKER_HOST=ssh://nas
   docker build -t radar-oportunidades:agent .
   docker build -t radar-facebook-browser:local ./browser
   ```

3. Copia `example.tfvars.example` fuera del repositorio y ajusta el host Docker y la ruta del archivo de credencial. El valor de `app_bind_ip` predeterminado es loopback. Una dirección de acceso privada puede configurarse con `secure_url` cuando exista un túnel o una red privada.
4. Desde esta carpeta, inicializa y revisa el plan antes de aplicar:

   ```sh
   tofu init
   tofu plan -var-file=/ruta/privada/radar.tfvars
   tofu apply -var-file=/ruta/privada/radar.tfvars
   ```

El estado de OpenTofu y los archivos de variables pueden contener rutas y detalles privados. Protégelos, haz copias de seguridad y nunca los subas al repositorio. Para trabajo en equipo utiliza un backend seguro apropiado.

## Instalación existente

Importa la red, los volúmenes y los contenedores existentes a un estado independiente antes de aplicar. Los nombres predeterminados coinciden con la instalación basada en Compose; usa los IDs reales de tu servidor y revisa cada importación. La aplicación de un plan que reemplace contenedores puede interrumpir investigaciones; la sustitución o eliminación de volúmenes puede causar pérdida de datos. Los recursos usan `prevent_destroy` para exigir una intervención deliberada antes de reemplazarlos.

Al importar contenedores creados con Compose, el proveedor Docker no reconstruye correctamente algunos montajes y puertos. Por ese motivo, los recursos conservan `ignore_changes` para esos atributos, pero una **comprobación independiente y obligatoria** consulta la configuración efectiva de Docker en cada `tofu plan` y `tofu apply`. Compara los montajes y sus permisos, los puertos y sus interfaces, y detecta también montajes o puertos adicionales y publicación automática de puertos.

Si encuentra una diferencia, o si Docker no está disponible, la comprobación detiene el plan con un error; no recrea los contenedores ni corrige automáticamente el desvío. Para una instalación nueva, permite que los contenedores aún no existan. Las redes avanzadas y variables de entorno continúan fuera de esta comprobación. La verificación se ejecuta al planear o aplicar, no es una monitorización continua.

La comprobación utiliza el cliente Docker local con el mismo `docker_host` del proveedor y necesita acceso de solo lectura para listar e inspeccionar contenedores. El archivo de credencial se compara por su ruta y sus permisos de montaje; su contenido no se lee. El estado de OpenTofu puede incluir esa ruta privada.

Para migrar o reemplazar un contenedor, planifica una ventana de mantenimiento, conserva los volúmenes y revisa el plan completo. `prevent_destroy` sigue activo en los contenedores, la red y los volúmenes.
