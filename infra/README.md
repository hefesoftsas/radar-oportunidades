# Infraestructura con OpenTofu

Esta configuración administra Docker en un equipo local o remoto por SSH. Crea una red privada, un volumen para los informes, otro para el perfil del navegador y los dos contenedores. No publica los puertos del navegador; el puerto de control de Radar se enlaza únicamente a loopback. El servidor y su red privada deben protegerse por separado.

## Instalación nueva

1. Instala OpenTofu y Docker. Configura el acceso SSH al servidor si Docker no es local. La clave de OpenCode Go debe existir como archivo privado en el servidor Docker.
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

Al importar contenedores creados con Compose, el proveedor no recupera de forma completa algunos atributos. La configuración ignora cambios posteriores en montajes, puertos, variables de entorno y redes avanzadas de los contenedores para evitar una recreación accidental. Por eso, **OpenTofu no detecta cambios externos en esos atributos**: compáralos con `docker inspect` antes de modificar la instalación. Para migrarlos o reemplazar un contenedor, planifica una ventana de mantenimiento, preserva los volúmenes y revisa el plan completo.
