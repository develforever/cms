<?php

namespace App\Security;

use App\Entity\User;
use App\Service\HashService;
use Doctrine\ORM\EntityManagerInterface;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\JWTEncodeFailureException;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\JWTDecodeFailureException;
use Symfony\Component\DependencyInjection\Container;

class PerUserJWTEncoder implements JWTEncoderInterface
{

    public function __construct(
        private Container $container, 
        private EntityManagerInterface $entityManager,
        private HashService $hashService,
        ) {}

    /**
     * {@inheritdoc}
     */
    public function encode(array $data)
    {
        try {

            $user = $this->entityManager->getRepository(User::class)->findOneBy(['email'=> $data['username']]);
            $privateKey = openssl_pkey_get_private(
                $this->hashService->aesDecrypt($user->getPrivateCrt()),
                $this->hashService->aesDecrypt($user->getPassphrase())
            );
            return JWT::encode($data, $privateKey, 'RS256');
        } catch (\Exception $e) {
            throw new JWTEncodeFailureException(JWTEncodeFailureException::INVALID_CONFIG, 'An error occurred while trying to encode the JWT token.', $e);
        }
    }

    /**
     * {@inheritdoc}
     */
    public function decode($token)
    {
        try {
            $tmp = explode('.', $token);
            $header = base64_decode($tmp[0]);
            $headerData = json_decode($header, true);
            $payload = base64_decode($tmp[1]);
            $data = json_decode($payload, true);

            $user = $this->entityManager->getRepository(User::class)->findOneBy(['email'=> $data['username']]);
            
            $publicKey = $this->hashService->aesDecrypt($user->getPublicCrt());
            $key = new Key($publicKey, $headerData['alg']);
            $decoded = (array) JWT::decode($token, $key);

            return $decoded;
        } catch (\Exception $e) {
            throw new JWTDecodeFailureException(JWTDecodeFailureException::INVALID_TOKEN, 'Invalid JWT Token', $e);
        }
    }
}
