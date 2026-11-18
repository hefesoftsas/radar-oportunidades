# Conexión de Facebook Marketplace

La aplicación usa un navegador Chromium independiente dentro del NAS, con su perfil persistido en el volumen `facebook-profile`. El navegador no publica sus puertos en la red. El acceso remoto pasa por el servidor de Radar, protegido por la contraseña de Radar, y por un túnel SSH.

En un equipo con acceso SSH al NAS, el túnel incluido puede abrir un acceso local. Configura `RADAR_NAS_SSH` con el alias SSH del servidor y ejecútalo con:

```sh
RADAR_NAS_SSH=nas node scripts/secure-tunnel.mjs
```

Abrir `http://127.0.0.1:18097/#investigar`. Crear la contraseña de Radar, abrir el navegador de Facebook, iniciar sesión personalmente y cerrar la vista del navegador para permitir que el agente lo utilice. La contraseña de Facebook no se introduce en Radar ni se entrega al agente. El navegador puede solicitar de nuevo el inicio de sesión o una verificación.

Pi puede buscar y leer publicaciones; no puede enviar mensajes, efectuar compras ni controlar libremente el navegador. Un control impide usar simultáneamente la vista remota y la búsqueda del agente. Facebook determina la zona por la ubicación y el radio activos del perfil; añadir el nombre de otra ciudad a la tarea no modifica ese filtro. Para investigar otra zona, abrir el navegador, cambiar ubicación y radio, y cerrarlo antes de continuar. Facebook puede restringir o modificar la disponibilidad y el formato de los resultados.
