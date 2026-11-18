output "app_container" {
  description = "Name of the application container."
  value       = docker_container.app.name
}

output "browser_container" {
  description = "Name of the isolated browser container."
  value       = docker_container.browser.name
}
