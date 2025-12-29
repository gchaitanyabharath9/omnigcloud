resource "oci_database_autonomous_database" "contact_db" {
  # Always Free configuration
  compartment_id           = var.compartment_id
  db_name                  = "omnigcontact"
  display_name             = "omnigcloud-contact-db"
  admin_password           = var.db_password
  cpu_core_count           = 1
  data_storage_size_in_tbs = 1
  db_workload              = "OLTP"
  is_free_tier             = true
  license_model            = "LICENSE_INCLUDED"
}

variable "db_password" {
  description = "Admin password for the Autonomous Database (Must meet OCI complexity requirements)"
  type        = string
  sensitive   = true
}

output "db_connection_url" {
  value = oci_database_autonomous_database.contact_db.connection_urls[0].sql_dev_web_url
}
