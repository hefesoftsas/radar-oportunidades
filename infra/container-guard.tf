# The Docker provider cannot reconstruct all Compose bind mounts and ports on
# import. Compare Docker's effective configuration directly on every plan/apply.
data "external" "container_guard" {
  program = ["node", "${path.module}/scripts/container-guard.mjs"]
  query = {
    docker_host  = var.docker_host
    app_name     = var.app_container_name
    browser_name = var.browser_container_name
    app_mounts = jsonencode([
      { type = "volume", source = "${var.project_name}_radar-data", target = "/data", readOnly = false },
      { type = "bind", source = var.credential_file, target = "/run/secrets/opencode_key", readOnly = true }
    ])
    browser_mounts = jsonencode([
      { type = "volume", source = "${var.project_name}_facebook-profile", target = "/profile", readOnly = false }
    ])
    app_ports = jsonencode([
      { internal = "8096/tcp", ip = var.app_bind_ip, external = tostring(var.app_host_port) },
      { internal = "8097/tcp", ip = "127.0.0.1", external = tostring(var.control_host_port) }
    ])
  }
}

resource "terraform_data" "container_guard" {
  input = "docker-effective-mounts-and-ports-v1"
  lifecycle {
    precondition {
      condition     = data.external.container_guard.result.inspection_ok == "true"
      error_message = "No se pudo inspeccionar Docker. Comprueba la conexión antes de continuar."
    }
    precondition {
      condition     = data.external.container_guard.result.app_exists == "false" || data.external.container_guard.result.app_mounts_ok == "true"
      error_message = "Los montajes efectivos de Radar difieren de la configuración. Revisa el volumen de datos y el archivo de credencial; no se ha reemplazado ningún contenedor."
    }
    precondition {
      condition     = data.external.container_guard.result.app_exists == "false" || data.external.container_guard.result.app_ports_ok == "true"
      error_message = "Los puertos efectivos de Radar difieren de la configuración. Revisa los enlaces de red; no se ha reemplazado ningún contenedor."
    }
    precondition {
      condition     = data.external.container_guard.result.browser_exists == "false" || data.external.container_guard.result.browser_mounts_ok == "true"
      error_message = "El montaje efectivo del perfil de Facebook difiere de la configuración. Revisa el volumen persistente; no se ha reemplazado ningún contenedor."
    }
    precondition {
      condition     = data.external.container_guard.result.browser_exists == "false" || data.external.container_guard.result.browser_ports_ok == "true"
      error_message = "El navegador tiene puertos publicados inesperados. Revisa su configuración; no se ha reemplazado ningún contenedor."
    }
  }
}
