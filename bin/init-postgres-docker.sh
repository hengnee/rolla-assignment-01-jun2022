#!/bin/bash
set -e

DOCKER_IMAGE="postgres:14-alpine3.14"
CONTAINER_NAME="postgres_database"
USER="postgres"
PW="password"
DB="postgres"

echo "echo stop & remove old docker [$CONTAINER_NAME] and starting new fresh instance of [$CONTAINER_NAME]"
(docker kill $CONTAINER_NAME || :) &&
  (docker volume prune -f || :) &&
  (docker rm $CONTAINER_NAME || :) &&
  (docker rmi $DOCKER_IMAGE || :) &&
  (docker pull $DOCKER_IMAGE || :) &&
  docker run --name $CONTAINER_NAME \
    -e POSTGRES_USER=$USER \
    -e POSTGRES_DATABASE=$DB \
    -e POSTGRES_PASSWORD=$PW \
    -p 127.0.0.1:5432:5432 \
    -v postgres_data:/var/lib/postgresql/data \
    -d $DOCKER_IMAGE

# wait for pg to start
echo "sleep wait for pg-server [$CONTAINER_NAME] to start"
SLEEP 3

# create the db
echo "CREATE DATABASE $DB ENCODING 'UTF-8';" | docker exec -i $CONTAINER_NAME psql -U $USER
# echo "CREATE DATABASE $DB ENCODING 'UTF-8';" | docker exec -i $CONTAINER_NAME /usr/local/bin/createuser -s $USER
echo "\l" | docker exec -i $CONTAINER_NAME psql -U $USER
