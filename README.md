<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Setup

## Scratch branch
```bash
$ nest generate module messages
$ nest generate controller messages/messages --flat
$ nest g module computer
$ nest g module cpu
$ nest g module disk
$ nest g module power
$ nest g service cpu
$ nest g service disk
$ nest g service power
$ nest g controller computer
```

## Main branch
```bash
$ nest g module users
$ nest g module reports
$ nest g controller users
$ nest g controller reports
$ nest g service users
$ nest g service reports
$ nest g module app --flat
$ nest g service app --flat
$ nest g controller app --flat
$ nest g service users/auth --flat
```


## Installation
```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
