FROM python:2.7

WORKDIR /usr/src/app

COPY app/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt


COPY app/. .

CMD python app.py