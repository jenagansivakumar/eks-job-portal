# IAM Role for EKS Cluster
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

# Attach EKS Cluster Policy
resource "aws_iam_role_policy_attachment" "eks_cluster_policy" {
  role       = aws_iam_role.eks_cluster_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
}

# Attach EKS VPC Resource Controller Policy
resource "aws_iam_role_policy_attachment" "eks_vpc_resource_controller" {
  role       = aws_iam_role.eks_cluster_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSVPCResourceController"
}

# EKS Cluster
resource "aws_eks_cluster" "jena_cluster" {
  name     = "jena-cluster"
  role_arn = aws_iam_role.eks_cluster_role.arn

  vpc_config {
    subnet_ids = concat(aws_subnet.public_subnets[*].id, aws_subnet.private_subnets[*].id)
  }

  tags = {
    Name = "jena-cluster"
  }
}

# IAM Role for EKS Nodes
resource "aws_iam_role" "eks_node_role" {
  name = "jena-eks-node-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = {
        Service = "ec2.amazonaws.com"
      }
      Action    = "sts:AssumeRole"
    }]
  })

  tags = {
    Name = "jena-eks-node-role"
  }
}

# Attach EKS Worker Node Policy
resource "aws_iam_role_policy_attachment" "eks_worker_node_policy" {
  role       = aws_iam_role.eks_node_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
}

# Attach EKS CNI Policy
resource "aws_iam_role_policy_attachment" "eks_cni_policy" {
  role       = aws_iam_role.eks_node_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"
}

# Attach EC2 Container Registry Policy
resource "aws_iam_role_policy_attachment" "ec2_container_registry_policy" {
  role       = aws_iam_role.eks_node_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
}

# EKS Node Group
resource "aws_eks_node_group" "jena_node_group" {
  cluster_name    = aws_eks_cluster.jena_cluster.name
  node_group_name = "jena-node-group"
  node_role_arn   = aws_iam_role.eks_node_role.arn
  subnet_ids      = aws_subnet.private_subnets[*].id

  scaling_config {
    desired_size = 2
    max_size     = 3
    min_size     = 1
  }

  instance_types = ["t3.medium"]

  tags = {
    Name = "jena-node-group"
  }
}

# EBS Volume for PostgreSQL
resource "aws_ebs_volume" "postgres_ebs" {
  availability_zone = "eu-west-1a"  # Replace with your AZ
  size              = 5
  type              = "gp2"

  tags = {
    Name = "postgres-ebs"
  }
}

# Kubernetes Persistent Volume (EBS-backed)
resource "kubernetes_persistent_volume" "postgres_pv" {
  metadata {
    name = "postgres-pv"
  }

  spec {
    capacity = {
      storage = "5Gi"
    }
    access_modes = ["ReadWriteOnce"]
    storage_class_name = "gp2"
    persistent_volume_reclaim_policy = "Retain"

    persistent_volume_source {
      aws_elastic_block_store {
        volume_id = aws_ebs_volume.postgres_ebs.id
      }
    }
  }
}

# Kubernetes Persistent Volume Claim
resource "kubernetes_persistent_volume_claim" "postgres_pvc" {
  metadata {
    name = "postgres-pvc"
  }

  spec {
    access_modes = ["ReadWriteOnce"]
    storage_class_name = "gp2"

    resources {
      requests = {
        storage = "5Gi"
      }
    }
  }

  timeouts {
    create = "30m"
  }
}