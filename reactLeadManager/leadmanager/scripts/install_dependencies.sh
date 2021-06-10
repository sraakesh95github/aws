#!/bin/bash
cd ..
sudo pipenv install
sudo npm install
pipenv shell
cd leadmanager
sudo python manage.py makemigrations
sudo python manage.py migrate
sudo python manage.py collectstatic

