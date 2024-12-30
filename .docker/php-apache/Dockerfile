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
	&& pecl install mongodb-1.20.1 \
	&& docker-php-ext-enable redis xdebug pgsql pdo pdo_pgsql mongodb

RUN apt-get install -y zip

RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
	&& php -r "if (hash_file('sha384', 'composer-setup.php') === 'dac665fdc30fdd8ec78b38b9800061b4150413ff2e3b6f88543c636f7cd84f6db9189d43a81e5503cda447da73c7e5b6') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;" \
	&& php composer-setup.php \
	&& php -r "unlink('composer-setup.php');" \
	&& mv composer.phar /usr/local/bin/composer