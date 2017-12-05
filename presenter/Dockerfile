FROM ubuntu:latest

RUN apt-get update

RUN apt-get install -y wget curl
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get install -y nodejs

RUN	apt-get install -y nginx 

RUN	apt-get install -y tree

RUN	apt-get install -y apt-transport-https 
RUN	sh -c "echo 'deb https://apt.datadoghq.com/ stable main' > /etc/apt/sources.list.d/datadog.list"
RUN	apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 C7A7DA52
RUN	apt-get update 
RUN	apt-get install -y datadog-agent
RUN	sh -c "sed 's/api_key:.*/api_key: 29f39d08fcc40afa9a65ffee4f6615cb/' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"

ADD . /API
WORKDIR /API
RUN tree
RUN cp -R ./presenter /presenter

WORKDIR /presenter
RUN tree /presenter
RUN npm install
RUN npm install -g forever
WORKDIR /
RUN rm -r /API

ADD nginx.conf /etc/nginx/nginx.conf
ADD nginx.yaml /etc/dd-agent/conf.d

RUN cat /etc/nginx/nginx.conf

CMD echo "RUN APPS" \
	&& bash -c "cd ./presenter && NODE_ENV=production PORT=8000 forever start ./bin/www && echo 1 && NODE_ENV=production PORT=8001 forever start ./bin/www && echo 2 " \
    && service datadog-agent start \
	&& nginx -g 'daemon off;' \ 
