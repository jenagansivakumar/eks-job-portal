resource "aws_eks_cluster" "jena-job-portal-cluster" {
  name = "jena-job-portal-cluster"
  role_arn = aws_iam_role.eks_cluster_role.arn

  vpc_config {
    subnet_ids = var.subnet_ids
  }
}