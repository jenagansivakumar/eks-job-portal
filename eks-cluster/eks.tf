resource "aws_iam_role" "eks_cluster_role" {
  name = "jena-eks-cluster-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = {
        Service = "eks.amazonaws.com"
      }
      Action    = "sts:AssumeRole"
    }]
  })

  tags = {
    Name = "jena-eks-cluster-role"
  }
}
