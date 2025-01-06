#!/bin/sh
if [[ "$OSTYPE" == "linux-gnu"* ]];
then
  MODE="initimportkey" CURRENT_UID=$(id -u):$(id -g) docker-compose  up
elif [[ "$OSTYPE" == "darwin"* ]];
then
  MODE="initimportkey" docker-compose  up
fi
