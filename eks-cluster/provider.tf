provider "aws" {
  region = "eu-west-1"
}

provider "kubernetes" {
  host                   = data.aws_eks_cluster.jena_cluster.endpoint
  cluster_ca_certificate = base64decode(data.aws_eks_cluster.jena_cluster.certificate_authority.data)
  token                  = data.aws_eks_cluster_auth.jena.token
}


data "aws_eks_cluster" "jena_cluster" {
  name = aws_eks_cluster.jena_cluster.name
}

data "aws_eks_cluster_auth" "jena" {
  name = aws_eks_cluster.jena_cluster.name
}
