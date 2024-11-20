#!/bin/sh
if [[ "$OSTYPE" == "linux-gnu"* ]];
then
  MODE="newaddress" CURRENT_UID=$(id -u):$(id -g) docker-compose  up
elif [[ "$OSTYPE" == "darwin"* ]];
then
  MODE="newaddress" docker-compose  up
fi
