#!/bin/bash

if [[ $# > 0 && "$1" == "DEBUG" ]];then
    echo "Developing Mode."
    ./manage.py runserver 0.0.0.0:80
else
    echo "Server is Online."
    gunicorn -w 3 -b 0.0.0.0:80  MySite.wsgi:application
fi