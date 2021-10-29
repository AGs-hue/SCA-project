# GCP virtual machine steps
## Deploy Virtual machine on Google Cloud Platform (GCP) and setup content via terraform.

### Requirements:
- Terraform
- Google Account

# CI/CD Pipelines with Circleci

```shell
# You must choose a version of circle ci you want to use, all config files requires this
version: 2.1

# You can use already packaged circle ci workflows, they are called orbs
orbs:
  node: circleci/node@3.0.0 # We use the orbs for creating a node js workflow

# This is where we define our actual process, each process is classified into a job. we can run multiple jobs
jobs:
  build-and-test:
    executor:
      name: node/default

# next we define the steps involved in creating the workflow
    steps:
    # Install our dependencies with npm, we can use circleci to cache dependencies them for future use
      - checkout
       # We specify commands to run, each command has a name and the actual terminal command like below
      - node/install-packages
      - run:
          command: npm run test

workflows:
# Below is the definition of your workflow.
  # Inside the workflow, you provide the jobs you want to run, e.g this workflow runs the build-and-test job above.
  # CircleCI will run this workflow on every commit.
  build-and-test:
    jobs:
      - build-and-test
```
# Documentation: <https://circleci.com/docs/2.0/configuration-reference/>

# Provisioning infrastructure on Google Cloud Platform (GCP) with Terraform

```shell
# This block specifies providers terrafoem will use to provision infrastructure and their latest version
terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "3.5.0"
    }
  }
}

# Configuration needed by Terraform to provision our resources on GCP 
# Specify provider (GCP, AWS, Azure)
provider "google" {
  credentials = file("/home/ags/Documents/sca-project-330409-b89ab5abe6f1.json") # GCP service account key

  project = "sca-project-330409"
  region  = "us-central1"
  zone    = "us-central1-c"
}

# Resource block defines information about our virtual machine, scripts to execute and tags to identify this resources
resource "google_compute_network" "vpc_network" {
  name = "terraform-network"
}
resource "google_compute_instance" "vm_instance" {
  name         = "terraform-instance"
  machine_type = "f1-micro"
  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-9" # Operating system that will be connected to VPC network
    }
  }
  network_interface {
    network = google_compute_network.vpc_network.name
    access_config {
      # Include this section to give the VM an external ip address
    }
  }
}
```
# usage

1. Clone project locally

```shell
https://github.com/AGs-hue/SCA-project.git
```
2. Install terraform

- <https://learn.hashicorp.com/tutorials/terraform/install-cli>



## Initialize directory

```shell
# Set up environment/dowmload providers specified in the confiduration
Terraform init
```
```shell
# Format and validate configuration
terraform fmt # updates configuration for readability and consistency

terraform validate
```

## Create infrastructure

```shell
terraform apply
```
# Documentation: <https://learn.hashicorp.com/tutorials/terraform/google-cloud-platform-build?in=terraform/gcp-get-started>

# Hermes API

## Technologies

- Language

  - TypeScript: <https://www.typescriptlang.org/docs/>

- Web Framework

  - NestJS: <https://docs.nestjs.com/>

- Database ORM

  - TypeORM: <https://typeorm.io/>

- Authentication

  - JWT: <https://jwt.io/>

- Linter

  - ESLint: <https://eslint.org/>

- Formatter

  - Prettier: <https://prettier.io/>

- Test

  - Jest: <https://jestjs.io/>

- Documentation

  - Compodoc: <https://compodoc.app/>

- Documentation OpenAPI
  - OpenAPI: <https://www.openapis.org/>
  - Swagger UI: <https://swagger.io/tools/swagger-ui/>

## Installation

Ensure that the nest-cli is installed globally

```shell
npm i -g @nestjs/cli
```

### Docker development

```shell
docker-compose up -d
```

### Running the app without Docker

```shell
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Test

```shell
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## DB migration

To run migrations, SSH into the app container with `docker-compose exec app bash` (ignore if not Docker). Then run any of the below commands

```shell
# generate
npm run migration:generate <name>

# show all migrations
npm run migration:show

# run
npm run migration:run

# dry run
npm run schema:log

# revert
npm run migration:revert
```

## Documentation

```shell
npm run doc
```

When the app is up and running, Swagger API documentation is available at the `/swagger` route
