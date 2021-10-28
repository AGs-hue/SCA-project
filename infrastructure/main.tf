# SPECIFY THE PROVIDER (GCP)
provider "google" {
  credentials = "${file("sca-project-330409-b89ab5abe6f1json")}"
  project     = "sca-project"
  region      = "us-central1"
}

# resource "google_compute_network" "vpc_network" {
#   name = "terraform-network"
# }

resource "google_compute_instance" "myinstance" {
  name         = "virtual-machine-from-terraform"
  machine_type = "f1-micro"
  zone         = "us-central1-a"

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-9"
    }
  }

  network_interface {
    network = "default"

    access_config {
      # GIVE VM EXTERNAL IP ADDRESS
    }
  }


  #  APPLY FIREWALL RULES TO ALLOW EXTERNAL IPs TO ACCESS THIS INSTANCE
  tags = ["http-server"]
}

resource "google_compute_firewall" "http-server" {
  metadata_startup_script = "echo /www/html/index.html"

  name    = "default-allow-http-terraform"
  network = "default"

  allow {
    protocol = "tcp"
    ports    = ["80"]
  }

  # ALLOW TRAFFIC TO WITH HTTP-SERVER TAG TO INSTANCES
  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["http-server"]
}

output "ip" {
  value = google_compute_instance.default.network_interface.0.access_config.0.nat.ip
}
