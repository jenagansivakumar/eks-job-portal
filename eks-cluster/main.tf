resource "aws_vpc" "jena_vpc" {
  cidr_block = var.vpc_cidr

  tags = {
    Name = "jena-vpc"
  }
}

resource "aws_subnet" "public_subnet" {
  count = length(var.public_subnets)

  vpc_id = aws_vpc.jena_vpc.id
  cidr_block = var.public_subnets[count.index]
  map_public_ip_on_launch = true


  tags = {
    Name = "jena-public-subnet-${count.index + 1}"
  }
}

resource "aws_subnet" "private_subnet" {
  count = length(var.private_subnets)

  vpc_id = aws_vpc.jena_vpc.id
  cidr_block = var.private_subnets[count.index]

  tags = {
    Name = "jena-private-subnet-${count.index + 1}"
  }
}