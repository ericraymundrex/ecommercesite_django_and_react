FROM python

WORKDIR /ecommercedjangobackend

COPY . .

RUN pip install -r requirements.txt

EXPOSE 8000

CMD ["python3","app.py"]