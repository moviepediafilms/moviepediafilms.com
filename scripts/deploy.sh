#!/bin/bash
WORKSPACE=/home/zeeshan/repos/moviepediafilms.com
USER=root
SERVER=moviepediafilms.com
DEST_DIR=/var/www/moviepediafilms.com

npm=/home/zeeshan/.nvm/versions/node/v14.11.0/bin/npm
git=/usr/bin/git

$git status
$git checkout master
$git pull
$npm install --only=prod
$npm run build
scp -r $WORKSPACE/dist/* $USER@$SERVER:$DEST_DIR/
