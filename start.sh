#!/bin/bash

echo "run mysql"
.mysql/run-mysqld.sh &
echo "run apache2"
.apache2/run-apache2.sh&
echo "run bot"
nodemon main.js &

wait
