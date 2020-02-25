#!/usr/bin/env bash
START_TIME=$SECONDS
BUILD=$1

# Begin with verifying that environment variables have been properly set
# Just to facilitate discovery of the script
# This only checks for non-default values, such as docker registry
# This script has only been tested on a MAC with bash.
# brew, docker, docker-compose are required

echo "Note: the following are required: brew, docker, docker-compose, node 12+ --- "

echo " --- Checking presence of environment variables --- "

echo " --- Ensuring required applications are installed --- "

if which docker > /dev/null; then
  echo " == APP: docker is currently installed, continuing..."
else
  echo " == APP: docker is not installed, exiting..."
  exit
fi

if which docker-compose > /dev/null; then
  echo " == APP: docker-compose is currently installed, continuing..."
else
  echo " == APP: docker-compose is not installed, exiting..."
  exit
fi

if which node > /dev/null; then
  echo " == APP: node is currently installed, continuing..."
else
  echo " == APP: node is not installed, exiting..."
  exit
fi

if which jahia-cli > /dev/null; then
  echo " == APP: jahia-cli is currently installed, continuing..."
else
  echo " == APP: jahia-cli is not installed, installing..."
  npm install -g jahia-cli@0.0.24
fi

if which yarn > /dev/null; then
  echo " == APP: yarn is currently installed, continuing..."
else
  echo " == APP: yarn is not installed, exiting..."
  exit
fi

docker login -u "astrita"

docker-compose pull

docker-compose up -d

# Wait until Jahia is up
jahia-cli alive

ELAPSED_TIME=$(($SECONDS - $START_TIME))
echo " == Jahia became alive in ${ELAPSED_TIME} seconds"

echo " == Executing Yarn"
yarn

echo " == Starting the tests"

TEST_URL="http://localhost:8080" JAHIA_USERNAME="root" JAHIA_PASSWORD="root" TESTRAIL_URL=https://jahia.testrail.net TESTRAIL_USERNAME="qatoronto@jahia.com" TESTRAIL_PASSWORD="testrail4ever"  TESTRAIL_MILESTONE="Jahia-7.5.0.0-SNAPSHOT" yarn testcli adminMenuOrder --ci --runInBand --reporters=default --reporters=jest-junit

echo " == Done, don't forget to bring your containers down."
