## Description

Freecash code challenge.

## Installation

```bash
$ cp .env.example .env
$ npm run build
$ docker-compose up -d --build
```

## Running DB migrations

```bash
$ docker exec -w /usr/src/tier-app tier-app npm run migration:run:dev
```

## Use the app

```bash
$ curl --request POST '127.0.0.1:3000/api/offers' \
--header 'Content-Type: application/json' \
--data-raw '{
    "provider": "offer1"
}'
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
