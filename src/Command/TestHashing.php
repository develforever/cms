<?php

namespace App\Command;

use App\Entity\User;
use App\Service\HashService;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[AsCommand(
    name: 'app:test-hashing',
    description: 'Add a short description for your command',
)]
class TestHashing extends Command
{
    public function __construct(
        private UserPasswordHasherInterface $passwordHasher,
        private HashService $hashService,
        private LoggerInterface $logger,
        private EntityManagerInterface $entityManager,
        
        #[Autowire('%kernel.project_dir%')]
        private string $rootDir,
    ) {
        parent::__construct();
    }

    protected function configure(): void
    {
        
        
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        

        $privateKey = file_get_contents('var/tmp_priv.pem');
        $encoded = $this->hashService->aesEncrypt($privateKey);
        echo $this->hashService->aesDecrypt($encoded);

        // ini_set('memory_limit', -1);
        // ini_set('output_buffering', 0);

        // $passphrase = 'qwaszx';
        // $privateKey = '';
        // $res = openssl_pkey_new([
        //     "private_key_bits" => 4096,
        //     "private_key_type" => OPENSSL_KEYTYPE_RSA,
        // ]);
        // openssl_pkey_export($res, $privateKey, $passphrase);

        // $details = openssl_pkey_get_details($res);
        // $publicKey = $details['key'];

        // $cryptedPrivateKey = $this->hashService->crypt($privateKey);
        // $cryptedPublicKey = $this->hashService->crypt($publicKey);
        // $cryptedPassphraseKey = $this->hashService->crypt($passphrase);

        // var_dump($this->hashService->decrypt($cryptedPrivateKey));
        // var_dump($this->hashService->decrypt($cryptedPublicKey));
        // var_dump($this->hashService->decrypt($cryptedPassphraseKey));


        return Command::SUCCESS;
    }
}
