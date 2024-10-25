<?php

namespace App\Service;

use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class HashService
{



    public function __construct(
        #[Autowire('%env(resolve:JWT_SECRET_KEY)%')]
        private string $secretKey,
        #[Autowire('%env(resolve:JWT_PUBLIC_KEY)%')]
        private string $publicKey,
        #[Autowire('%env(resolve:JWT_PASSPHRASE)%')]
        private string $passphrase,
        #[Autowire('%env(resolve:AES_IV)%')]
        private string $aesIv,
        #[Autowire('%env(resolve:AES_KEY)%')]
        private string $aesKey,
    ) {}

    public function  aesEncrypt(string $data)
    {

        $aesKey = base64_decode($this->aesKey); // 256-bitowy klucz AES
        $iv = base64_decode($this->aesIv);
        $encryptedData = openssl_encrypt($data, 'aes-256-cbc', $aesKey, 0, $iv);

        // Zaszyfruj klucz AES za pomocą RSA
        $privateKey = openssl_pkey_get_private('file://' . $this->secretKey, $this->passphrase);
        openssl_private_encrypt($aesKey, $encryptedAesKey, $privateKey, OPENSSL_PKCS1_PADDING);
        
        return base64_encode($encryptedData);
    }

    public function  aesDecrypt(string $data):string
    {

        $aesKey = base64_decode($this->aesKey); // 256-bitowy klucz AES
        $iv = base64_decode($this->aesIv);
        $decryptedData = openssl_decrypt(base64_decode($data), 'aes-256-cbc', $aesKey, 0, $iv);
        
        return $decryptedData;
    }


    public function crypt(string $text): string|null|bool
    {

        $privateKey = openssl_pkey_get_private('file://' . $this->secretKey, $this->passphrase);

        if (!$privateKey) {
            echo 'error1: ' . openssl_error_string() . PHP_EOL;
            return null;
        }
        $publicKey = openssl_pkey_get_public('file://' . $this->publicKey);

        if ($privateKey) {
            echo 'error2: ' . openssl_error_string() . PHP_EOL;
        }

        $encryptedData = null;
        if (!openssl_public_encrypt($text, $encryptedData, $publicKey)) {
            echo 'crypt  error: ' . openssl_error_string() . PHP_EOL;
        }


        return base64_encode($encryptedData);
    }

    public function decrypt(string $encryptedData): string|null|bool
    {

        $privateKey = openssl_pkey_get_private('file://' . $this->secretKey, $this->passphrase);
        $publicKey = openssl_pkey_get_public('file://' . $this->publicKey);

        $decryptedData = null;
        if (openssl_private_decrypt(base64_decode($encryptedData), $decryptedData, $privateKey)) {
            echo 'decrypt  error:' . openssl_error_string() . PHP_EOL;
        }


        return $decryptedData;
    }
}
