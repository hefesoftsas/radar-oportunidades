# Radar Oportunidades

Aplicación para investigar publicaciones y comparar precios en Facebook Marketplace, Mercado Libre Colombia y fuentes públicas. Permite iniciar investigaciones, seguir su avance y consultar los informes guardados.

## Requisitos

- Node.js 22 y npm.
- Docker y Docker Compose para el despliegue con el navegador aislado.
- Una suscripción y credencial de OpenCode Go para las investigaciones con Pi.

## Desarrollo y pruebas

```sh
npm ci
npm ci --prefix ui
npm run build --prefix ui
node --test tests/*.test.mjs ui/tests/*.test.mjs infra/tests/*.test.mjs
```

El proyecto incluye `dist/` porque la imagen Docker sirve esos archivos directamente. Después de modificar el código de `ui/src/`, ejecuta el comando de compilación anterior para actualizar el paquete de la interfaz.

## Despliegue

`compose.yaml` permite configurar la interfaz de red y la ruta de la credencial mediante variables de entorno. La credencial se monta desde un archivo externo, no se guarda en el repositorio. Los volúmenes `radar-data` y `facebook-profile` contienen información privada y deben mantenerse fuera de Git.

```sh
export RADAR_KEY_PATH=/ruta/absoluta/en/el-servidor/opencode.key
docker compose build
docker compose up -d
```

También se puede provisionar la red, los volúmenes persistentes y los contenedores con [OpenTofu](infra/README.md).

Para consultar Facebook, la persona usuaria inicia sesión directamente en el navegador aislado de la aplicación; Radar no necesita recibir la contraseña de Facebook. La sesión y el radio de búsqueda dependen de la configuración de Facebook. El acceso remoto debe mantenerse en una red privada y protegida. Consulta [MARKETPLACE.md](MARKETPLACE.md) para más detalles.

Los resultados dependen de la disponibilidad de los sitios. El informe distingue los anuncios encontrados en listados de los que pudo abrir individualmente; precios, estado y disponibilidad deben confirmarse.

## Licencia

El proyecto se distribuye bajo la [licencia ISC](LICENSE). Los avisos de las dependencias de la interfaz están en [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
