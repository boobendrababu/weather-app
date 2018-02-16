FROM node:8

MAINTAINER bascii

# Install packages not included
RUN apt-get update && \
    apt-get install --assume-yes sudo curl apt-transport-https nano

# update and install yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add - && \
	echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list && \
	apt-get update && \
	apt-get install -y yarn

RUN mkdir -p /opt/apps
WORKDIR /opt/apps

RUN chown -R node:node /opt/apps

EXPOSE 8080
EXPOSE 3000

USER node

ENTRYPOINT ["./entrypoint.sh"]

# CMD []
