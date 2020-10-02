#!/bin/bash

cd /home/zeeshan/moviepediafilms.com
git pull
npm install --only=prod
npm run build