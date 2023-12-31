dev:
	rm -rf ./web/dist && docker-compose -f ./docker/docker-compose.dev.yml up --remove-orphans
dev-new:
	rm -rf ./web/dist && docker-compose -f ./docker/docker-compose.dev.yml up --remove-orphans
dev-update:
	rm -rf ./web/dist && docker-compose -f ./docker/docker-compose.dev.yml up --build -V --remove-orphans
