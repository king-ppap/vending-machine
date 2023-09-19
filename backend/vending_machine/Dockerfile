FROM python:3.10-slim
RUN apt-get update && apt-get install -y tzdata
RUN pip install django gunicorn psycopg2-binary
RUN apt-get install tesseract-ocr poppler-utils -y

WORKDIR /vending_machine
ADD ./ /vending_machine
RUN pip install -r requirements.txt

# EXPOSE 8000
# CMD ["gunicorn", "--bind", ":8000", "--workers", "3", "vending_machine.wsgi"]
