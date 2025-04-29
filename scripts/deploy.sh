#!/bin/bash

# Move to app directory
cd /home/ubuntu/react

# Stop old containers
docker-compose down

# (Optional) Pull latest images if you are using DockerHub images
docker-compose pull

# Start containers
docker-compose up -d

