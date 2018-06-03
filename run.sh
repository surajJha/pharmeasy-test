#!/usr/bin/env bash

[ $(docker ps -a | grep pharmeasy-test | wc -l) -gt 0 ] && docker ps -a | grep pharmeasy-test | awk '{print $1}' | xargs docker rm -f

docker run -dit --name=pharmeasy-test -p 3000:3000 -p 80:80 pharmeasy-test