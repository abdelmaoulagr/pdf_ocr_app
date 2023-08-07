FROM python:latest

EXPOSE 5000

#set the working directory
WORKDIR /app

#install dependencies
COPY ./requirements.txt /app
RUN pip install --upgrade pip
RUN pip install --no-cahce-dir --upgrade -r requirements.txt

#copy the scripts to the folder
COPY . /app


CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]