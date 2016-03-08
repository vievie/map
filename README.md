# Vienna Map

[![Build Status](https://travis-ci.org/vievie/map.svg?branch=master)](https://travis-ci.org/vievie/map)

> A map to find delicious breakfast, fine coffee, good lunch or a nice place 
> to drink and party or coworking spaces and free wifi throughout the city.

## Development

Servers are run and provisioned via _Docker_ and _Docker Compose_.

Update packages via NPM:

    docker-compose run nodejs npm --prefix=/usr/src/app/ install

Building the app for production:

	docker-compose run nodejs node_modules/.bin/gulp

Developing and watching for changes/updates to the app:

	docker-compose run nodejs node_modules/.bin/gulp watch

## Tests

Tests are run using _Travis CI_. The setup itself is done according to 
[alrra/travis-scripts](https://github.com/alrra/travis-scripts/blob/master/doc/github-deploy-keys.md).

