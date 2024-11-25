#!/bin/sh
if [[ "$OSTYPE" == "linux-gnu"* ]];
then
  MODE="testinithw" CURRENT_UID=$(id -u):$(id -g) docker-compose  up
elif [[ "$OSTYPE" == "darwin"* ]];
then
  MODE="testinithw" docker-compose  up
fi
