#!/bin/bash
  set -e
  echo "Cleaning up /home/ubuntu/react"
  cd /home/ubuntu/react || { echo "Failed to cd to /home/ubuntu/react"; exit 1; }
  
  # Preserve critical files
  mv docker-compose.yml docker-compose.yml.bak 2>/dev/null || true
  mv Dockerfile Dockerfile.bak 2>/dev/null || true
  
  # Remove all other files and directories
  rm -rf * .[!.]* || { echo "Failed to clean up directory"; exit 1; }
  
  # Restore preserved files
  mv docker-compose.yml.bak docker-compose.yml 2>/dev/null || true
  mv Dockerfile.bak Dockerfile 2>/dev/null || true
  echo "Cleanup completed"
