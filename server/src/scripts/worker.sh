#!/bin/bash
cd ..
echo "Starting celery worker"
celery -A moviepedia worker -B --schedule /beats-data/celerybeat-schedule --loglevel=info
