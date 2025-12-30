resource "google_compute_network" "vpc_network" {
  name = "omnigcloud-vpc"
}

resource "google_cloud_run_service" "default" {
  name     = "omnigcloud-app"
  location = "us-central1"

  template {
    spec {
      containers {
        image = "gcr.io/omnigcloud-project/omnigcloud-app"
        ports {
          container_port = 3000
        }
        env {
          name  = "NODE_ENV"
          value = "production"
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

resource "google_cloud_run_service_iam_member" "allUsers" {
  service  = google_cloud_run_service.default.name
  location = google_cloud_run_service.default.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}

output "url" {
  value = google_cloud_run_service.default.status[0].url
}
