#!/bin/bash

while getopts h:s: flag
do
    case "${flag}" in
        h) hostname=${OPTARG};;
        s) service=${OPTARG};;
    esac
done

if [[ -z "$hostname" || -z "$service" ]]; then
    printf "\nMissing required parameter.\n"
    printf "  syntax: deployService.sh -h <hostname> -s <service>\n\n"
    exit 1
fi

printf "\n----> Deploying $service to $hostname\n"

# Step 1
printf "\n----> Build the distribution package\n"
rm -rf dist
mkdir dist
cp -r public dist
cp *.js dist
cp *.json dist

# Step 2
printf "\n----> Clear out the previous distribution on the target.\n"
ssh -T ubuntu@$hostname << ENDSSH
rm -rf services/${service}/public
mkdir -p services/${service}/public
ENDSSH

# Step 3
printf "\n----> Copy the distribution package to the target\n"
scp -r dist/* ubuntu@$hostname:services/$service

# Step 4
printf "\n----> Deploy the service on the target\n"
ssh ubuntu@$hostname << ENDSSH
bash -i
cd services/${service}
npm install
pm2 restart ${service}
ENDSSH

# Step 5
printf "\n----> Removing local copy of the distribution package\n"
rm -rf dist
