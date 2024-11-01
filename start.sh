#!/bin/bash 

composer install

chash=$(git rev-parse HEAD)


if [ ! -f .env.local ]; then
    echo ".env.local file created"
    cp .env.local.dist .env.local
fi

sed -i "/GIT_COMMIT_HASH/c\GIT_COMMIT_HASH=${chash}" .env.local

docker compose up -d --build

nvm use
npm run dev