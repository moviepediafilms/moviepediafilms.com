#!/bin/bash
WORKSPACE=/home/zeeshan/moviepediafilms.com
USER=zeeshan
DEST_DIR=/var/www/moviepediafilms.com

npm=/home/zeeshan/.nvm/versions/node/v14.11.0/bin/npm
git=/usr/bin/git

su -c "cd $WORKSPACE &&
$git pull &&
$npm install &&
$npm run build" -m "$USER" &&\
rm -rf $DEST_DIR/* &&\
cp -r $WORKSPACE/dist/* $DEST_DIR/
