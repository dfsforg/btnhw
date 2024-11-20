#!/bin/sh
if [[ "$OSTYPE" == "linux-gnu"* ]];
then
  MODE="inithw" CURRENT_UID=$(id -u):$(id -g) docker-compose  up
elif [[ "$OSTYPE" == "darwin"* ]];
then
  MODE="inithw" docker-compose  up
fi
