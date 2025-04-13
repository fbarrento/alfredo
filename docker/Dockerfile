FROM serversideup/php:8.4-fpm-nginx AS development

# Switch to root so we can do root things
USER root

# Save the build arguments as a variable
ARG USER_ID
ARG GROUP_ID

# Platform requirements
RUN apt-get update ; apt-get install -y openssh-client git git-lfs jq software-properties-common

RUN apt-add-repository ppa:ansible/ansible ; apt-get install -y ansible

RUN apt-get -y autoremove \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*

RUN apt-get -y autoremove && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*

# Install PHP extensions
RUN install-php-extensions intl

RUN echo "alias ll='ls -al'" >> /etc/bash.bashrc
RUN echo "alias a='php artisan'" >> /etc/bash.bashrc
RUN echo "alias mfs='php artisan migrate:fresh --seed'" >> /etc/bash.bashrc
RUN echo "alias cda='composer dump-autoload'" >> /etc/bash.bashrc

# Change the UID and GID of www-data while and the file permissions for NGINX
RUN docker-php-serversideup-set-id www-data $USER_ID:$GROUP_ID && \
    docker-php-serversideup-set-file-permissions --owner $USER_ID:$GROUP_ID --service nginx

# Drop back to our unprivileged user
USER www-data

###################
################### START PRODUCTION
###################

FROM composer:2 AS build_composer
WORKDIR /app
COPY . /app
RUN composer install --no-dev --ignore-platform-reqs --no-interaction

FROM node:20 AS build_frontend
WORKDIR /app
COPY --from=build_composer / /app

RUN npm ci
RUN npm run build
RUN rm -rf node_modules

FROM development AS production

USER root

COPY ./docker/common/ansible.cfg /etc/ansible/ansible.cfg

COPY --from=build_frontend / /var/www/html

# Change the UID and GID of www-data while and the file permissions for NGINX
RUN docker-php-serversideup-set-id www-data $USER_ID:$GROUP_ID && \
    docker-php-serversideup-set-file-permissions --owner $USER_ID:$GROUP_ID --service nginx

# Drop back to our unprivileged user
USER www-data
