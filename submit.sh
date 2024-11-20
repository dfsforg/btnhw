#!/bin/sh
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
  MODE="submit" CURRENT_UID=$(id -u):$(id -g) docker-compose  up
elif [[ "$OSTYPE" == "darwin"* ]]; then
  MODE="submit" docker-compose  up

fi
