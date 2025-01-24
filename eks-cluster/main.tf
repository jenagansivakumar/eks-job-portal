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

resource "aws_internet_gateway" "jena_igw" {
  vpc_id = aws_vpc.jena_vpc.id

  tags = {
    Name = "jena-igw"
  }
}

resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.jena_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.jena_igw.id
  }

  tags = {
    Name = "jena-public-route-table"
  }
}