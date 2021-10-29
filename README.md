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
