variable "tenancy_ocid" {
  description = "OCID of your tenancy"
  type        = string
}

variable "user_ocid" {
  description = "OCID of the user calling the API"
  type        = string
}

variable "fingerprint" {
  description = "Fingerprint of the user API private key"
  type        = string
}

variable "private_key_path" {
  description = "Path to the user API private key"
  type        = string
}

variable "region" {
  description = "OCI Region"
  type        = string
}

variable "compartment_id" {
  description = "Compartment OCID where resources will be created"
  type        = string
}

variable "cluster_name" {
  default = "omnisource-oke-cluster"
}

variable "kubernetes_version" {
  default = "v1.31.1" # Example version, will need to match OCI supported versions
}
