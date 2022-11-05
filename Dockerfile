FROM node:16

ENV TZDATA Asia/Jakarta
RUN ln -fs /usr/share/zoneinfo/$TZDATA /etc/localtime

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install
RUN npm install -g nodemon
COPY . /usr/src/app/
EXPOSE 5004

ENTRYPOINT [ "npm" ]
CMD [ "start" ]