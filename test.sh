#!/bin/sh
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
  MODE="test" CURRENT_UID=$(id -u):$(id -g) docker-compose  up
elif [[ "$OSTYPE" == "darwin"* ]]; then
  MODE="test" docker-compose  up

fi
