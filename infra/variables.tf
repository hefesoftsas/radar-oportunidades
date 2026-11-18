variable "docker_host" {
  description = "Docker socket or SSH endpoint, for example ssh://nas."
  type        = string
  default     = "unix:///var/run/docker.sock"
}

variable "project_name" {
  description = "Prefix used for the Docker network and persistent volumes."
  type        = string
  default     = "radar-oportunidades"
}

variable "app_image" {
  description = "Locally built application image on the Docker host."
  type        = string
  default     = "radar-oportunidades:agent"
}

variable "browser_image" {
  description = "Locally built isolated-browser image on the Docker host."
  type        = string
  default     = "radar-facebook-browser:local"
}

variable "credential_file" {
  description = "Absolute path on the Docker host to the OpenCode Go key file."
  type        = string
  sensitive   = true
  validation {
    condition     = startswith(var.credential_file, "/")
    error_message = "Use an absolute path on the Docker host."
  }
}

variable "app_bind_ip" {
  description = "Host interface for the non-control listener; defaults to loopback."
  type        = string
  default     = "127.0.0.1"
}

variable "secure_url" {
  description = "Optional private URL for accessing the control listener."
  type        = string
  default     = ""
}

variable "app_container_name" {
  description = "Name of the application container."
  type        = string
  default     = "radar-oportunidades"
}

variable "browser_container_name" {
  description = "Name of the isolated browser container."
  type        = string
  default     = "radar-facebook-browser"
}

variable "app_host_port" {
  description = "Host port for the non-control listener."
  type        = number
  default     = 8096
}

variable "control_host_port" {
  description = "Loopback-only host port for the private control listener."
  type        = number
  default     = 8097
}
