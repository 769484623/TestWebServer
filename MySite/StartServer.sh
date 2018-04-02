#!/bin/bash
export ALLOWED_HOSTS="*"

if [[ $# > 0 && "$1" == "DEBUG" ]];then
    export DEBUG=on
    echo "Enter Developing Mode."
    ./manage.py runserver 0.0.0.0:80
else
    echo "Server is Online."
    gunicorn -w 3 -b 0.0.0.0:80  MySite.wsgi:application
fi