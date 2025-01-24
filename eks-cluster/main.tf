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