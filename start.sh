#!/bin/bash 

composer install

chash=$(git rev-parse HEAD)
sed -i "/GIT_COMMIT_HASH/c\GIT_COMMIT_HASH=${chash}" .env.local

docker compose up -d --build