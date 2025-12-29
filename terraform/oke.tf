resource "oci_containerengine_cluster" "oke_cluster" {
  compartment_id     = var.compartment_id
  kubernetes_version = var.kubernetes_version
  name               = var.cluster_name
  vcn_id             = oci_core_vcn.oke_vcn.id

  options {
    service_lb_subnet_ids = [oci_core_subnet.oke_subnet.id]
    add_ons {
      is_kubernetes_dashboard_enabled = false
      is_tiller_enabled              = false
    }
  }
}

resource "oci_containerengine_node_pool" "oke_node_pool" {
  cluster_id         = oci_containerengine_cluster.oke_cluster.id
  compartment_id     = var.compartment_id
  kubernetes_version = var.kubernetes_version
  name               = "oke-arm-nodepool"
  
  # ARM Ampere A1 shape for Free Tier
  node_shape = "VM.Standard.A1.Flex"
  
  node_shape_config {
    ocpus         = 2
    memory_in_gbs = 12
  }

  node_source_details {
    source_type = "IMAGE"
    image_id    = data.oci_core_images.arm_images.images[0].id
    # Default boot volume is 50GB. 2 nodes * 50GB = 100GB (Limit is 200GB)
    boot_volume_size_in_gbs = 50 
  }

  node_config_details {
    placement_configs {
      availability_domain = data.oci_identity_availability_domains.ads.availability_domains[0].name
      subnet_id           = oci_core_subnet.oke_subnet.id
    }
    size = 2 # 2 nodes @ 2 OCPU/12GB = Total 4 OCPU/24GB (Exactly the Free Limit)
  }

  initial_node_labels {
    key   = "name"
    value = "omnisource-worker"
  }
}

data "oci_identity_availability_domains" "ads" {
  compartment_id = var.tenancy_ocid
}

data "oci_core_images" "arm_images" {
  compartment_id           = var.compartment_id
  operating_system         = "Oracle Linux"
  operating_system_version = "8"
  shape                    = "VM.Standard.A1.Flex"
}
