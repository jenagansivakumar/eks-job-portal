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

resource "aws_route_table_association" "public_subnet_association" {
  count = length(var.public_subnets)
  subnet_id = aws_subnet.public_subnets[count.index].id
  route_table_id = aws_route_table.public_rt.id
}

resource "aws_eip" "jena_nat_eip" {
  domain = "vpc"
  tags = {
    Name = "jena-nat-eip"
  }
}


resource "aws_nat_gateway" "jena_nat" {
  allocation_id = aws_eip.jena_nat_eip.id
  subnet_id = aws_subnet.public_subnets[0].id
  
  tags = {
    Name = "jena-nat-gateway"
  }
}