#!/bin/sh

PACKAGE_REPO=${PWD##*/}

echo "Re-building ${PACKAGE_REPO}...\n"
docker-compose down

echo "Killing all Docker containers \n"xp
docker kill $(docker ps -a -q)

echo "Removing all stopped Docker containers \n"
docker rm $(docker ps -a -q)

echo "Removing all stopped Docker containers \n"
docker container prune -f

echo "Remove all images not referenced by any container \n"
# docker image prune -a

echo "Remove all volumes \n"
docker volume rm $(docker volume ls -q)

echo "Building Docker containers \n"
docker-compose up --build

docker exec -i postgres_database psql -U postgres postgres -c "CREATE DATABASE postgres ENCODING 'UTF-8';"
