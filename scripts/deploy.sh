#!/bin/bash
WORKSPACE=/home/zeeshan/moviepediafilms.com
USER=zeeshan
DEST_DIR=/var/www/moviepediafilms.com

npm=/home/zeeshan/.nvm/versions/node/v14.11.0/bin/npm
git=/usr/bin/git

sudo -u $USER -H sh -c "cd $WORKSPACE &&
$git pull &&
$npm install &&
$npm run build" &&\
rm -rf $DEST_DIR/* &&\
cp -r $WORKSPACE/dist/* $DEST_DIR/
