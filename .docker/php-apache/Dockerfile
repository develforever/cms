FROM php:8.1-apache

RUN apt-get update && apt-get install -y \
		libfreetype-dev \
		libjpeg62-turbo-dev \
		libpng-dev \
		libpq-dev \
	&& docker-php-ext-configure gd --with-freetype --with-jpeg \
	&& docker-php-ext-install -j$(nproc) gd pdo pgsql pdo_pgsql

RUN pecl install redis-5.3.7 \
&& pecl install xdebug-3.2.1 \
	&& docker-php-ext-enable redis xdebug pgsql pdo pdo_pgsql