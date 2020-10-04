#!/bin/bash
WORKSPACE=/home/zeeshan/repos/moviepediafilms.com
USER=root
SERVER=moviepediafilms.com
TMP_FOLDER=/tmp
DEST_DIR=/var/www/moviepediafilms.com
TAR_FILE=dist.tar.gz

# programms used
npm=/home/zeeshan/.nvm/versions/node/v14.11.0/bin/npm
git=/usr/bin/git
tar=/bin/tar

$git status
$git checkout master
$git pull
$npm install --only=prod
$npm run build
rm $WORKSPACE/$TAR_FILE
cd $WORKSPACE/dist
$tar -zcvf $WORKSPACE/$TAR_FILE .
scp $WORKSPACE/$TAR_FILE $USER@$SERVER:$TMP_FOLDER/
ssh $USER@$SERVER "$tar -zxvf $TMP_FOLDER/$TAR_FILE -C $DEST_DIR && rm $TMP_FOLDER/$TAR_FILE"
