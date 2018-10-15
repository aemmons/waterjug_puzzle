FROM python:2.7

WORKDIR /usr/src/app

COPY jp_app/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY jp_app/. .