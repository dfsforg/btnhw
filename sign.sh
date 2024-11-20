#!/bin/sh
if [[ "$OSTYPE" == "linux-gnu"* ]];
then
  MODE="sign" CURRENT_UID=$(id -u):$(id -g) docker-compose  up
elif [[ "$OSTYPE" == "darwin"* ]];
then
  MODE="sign" docker-compose  up
fi
