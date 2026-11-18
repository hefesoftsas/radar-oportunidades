data "docker_image" "app" {
  name = var.app_image
}

data "docker_image" "browser" {
  name = var.browser_image
}

resource "docker_network" "radar" {
  name   = "${var.project_name}_default"
  driver = "bridge"
  lifecycle {
    prevent_destroy = true
    ignore_changes  = [labels, ipam_config]
  }
}

resource "docker_volume" "data" {
  name = "${var.project_name}_radar-data"
  lifecycle {
    prevent_destroy = true
    ignore_changes  = [labels]
  }
}

resource "docker_volume" "facebook_profile" {
  name = "${var.project_name}_facebook-profile"
  lifecycle {
    prevent_destroy = true
    ignore_changes  = [labels]
  }
}

resource "docker_container" "browser" {
  name       = var.browser_container_name
  image      = var.browser_image
  restart    = "unless-stopped"
  shm_size   = 512
  depends_on = [terraform_data.container_guard]

  mounts {
    type   = "volume"
    source = docker_volume.facebook_profile.name
    target = "/profile"
  }
  networks_advanced {
    name    = docker_network.radar.name
    aliases = ["facebook-browser", var.browser_container_name]
  }
  lifecycle {
    prevent_destroy = true
    ignore_changes  = [network_mode, mounts, networks_advanced, labels, env, attach, container_read_refresh_timeout_milliseconds, logs, must_run, remove_volumes, start, wait, wait_timeout]
  }
}

resource "docker_container" "app" {
  name    = var.app_container_name
  image   = var.app_image
  restart = "unless-stopped"
  env     = var.secure_url == "" ? [] : ["RADAR_SECURE_URL=${var.secure_url}"]

  ports {
    internal = 8096
    external = var.app_host_port
    ip       = var.app_bind_ip
  }
  ports {
    internal = 8097
    external = var.control_host_port
    ip       = "127.0.0.1"
  }
  mounts {
    type   = "volume"
    source = docker_volume.data.name
    target = "/data"
  }
  mounts {
    type      = "bind"
    source    = var.credential_file
    target    = "/run/secrets/opencode_key"
    read_only = true
  }
  networks_advanced {
    name    = docker_network.radar.name
    aliases = ["radar", var.app_container_name]
  }
  depends_on = [docker_container.browser]
  lifecycle {
    prevent_destroy = true
    ignore_changes  = [network_mode, mounts, networks_advanced, labels, ports, env, attach, container_read_refresh_timeout_milliseconds, logs, must_run, remove_volumes, start, wait, wait_timeout]
  }
}
