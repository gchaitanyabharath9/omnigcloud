output "cluster_id" {
  value = oci_containerengine_cluster.oke_cluster.id
}

output "kubeconfig_command" {
  value = "oci ce cluster create-kubeconfig --cluster-id ${oci_containerengine_cluster.oke_cluster.id} --file $HOME/.kube/config --region ${var.region} --token-version 2.0.0"
}

output "node_pool_id" {
  value = oci_containerengine_node_pool.oke_node_pool.id
}
