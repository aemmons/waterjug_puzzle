FROM ubuntu:18.10

RUN apt-get update
RUN apt-get install -y nginx
RUN apt-get install -y python3 python3-dev python3-pip
RUN pip3 install uwsgi

WORKDIR /usr/src/app

COPY jp_app/requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt

COPY ./jp_app .
COPY ./nginx.jp_app.conf /etc/nginx/sites-enabled/default

CMD service nginx start && uwsgi -s /tmp/uwsgi.sock --chmod-socket=666 --manage-script-name --mount /=app:jp_app