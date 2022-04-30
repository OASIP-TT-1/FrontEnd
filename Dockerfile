#base image
FROM node:12.18.1-alpine

RUN apt-get update && apt-get upgrade -y \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli \
    && a2enmod headers
    && sed -ri -e 's/^([ \t]*)(<\/VirtualHost>)/\1\tHeader set Access-Control-Allow-Origin "*"\n\1\2/g' /etc/apache2/sites-available/*.conf

#set working directory
WORKDIR /app

#add /app/node_modules/.bin to $PATH
ENV PATH /app/node_modules/.bin:$PATH

#install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm install @vue/cli -g

#start app
CMD ["npm", "run", "serve"]
