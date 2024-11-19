from os import environ
from dotenv import load_dotenv


load_dotenv('.env')


DBNAME=environ.get('DBNAME')
DBUSER=environ.get('DBUSER')
DBPASSWORD=environ.get('DBPASSWORD')
HOST=environ.get('HOST')
PORT=environ.get('PORT')
SSL_KEY=environ.get('SSL_KEY')
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30