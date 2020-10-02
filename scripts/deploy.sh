#!/bin/bash

cd /home/zeeshan/moviepediafilms.com && \
/usr/bin/git pull && \
/home/zeeshan/.nvm/versions/node/v14.11.0/bin/npm install --only=prod && \
/home/zeeshan/.nvm/versions/node/v14.11.0/bin/npm run build && \
cp -r /home/zeeshan/moviepediafilms.com/dist/* /var/www/moviepediafilms.com/