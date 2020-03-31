terraform {
  backend "s3" {
    bucket = "minesweeper-potsides-com-terraform-state"
    key    = "terraform.tfstate"
    region = "eu-west-2"
  }
}
