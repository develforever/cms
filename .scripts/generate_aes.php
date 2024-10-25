#!/bin/env php

php -r "echo 'iv: '.base64_encode(openssl_random_pseudo_bytes(openssl_cipher_iv_length('aes-256-cbc'))).PHP_EOL;"

php -r "echo 'key: '.base64_encode( openssl_random_pseudo_bytes(32)).PHP_EOL;"