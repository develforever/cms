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
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[AsCommand(
    name: 'app:user-update-certs',
    description: 'Add a short description for your command',
)]
class UserUpdateCertsCommand extends Command
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
        $this
            ->addArgument('email', InputArgument::OPTIONAL, 'User e-mail')
            ->addArgument('passphrase', InputArgument::OPTIONAL, 'Passphrase')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        $email = $input->getArgument('email');
        $passphrase = $input->getArgument('passphrase');

        ini_set('memory_limit', -1);
        ini_set('output_buffering', 0);

        $user = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $email]);
        $user->setEmail($email);

        $privateKey = '';
        $res = openssl_pkey_new([
            'private_key_bits' => 4096,
            'private_key_type' => OPENSSL_KEYTYPE_RSA,
        ]);
        openssl_pkey_export($res, $privateKey, $passphrase);

        $details = openssl_pkey_get_details($res);
        $publicKey = $details['key'];

        $cryptedPrivateKey = $this->hashService->aesEncrypt($privateKey);
        $cryptedPublicKey = $this->hashService->aesEncrypt($publicKey);
        $cryptedPassphraseKey = $this->hashService->aesEncrypt($passphrase);

        $user->setPrivateCrt($cryptedPrivateKey);
        $user->setPublicCrt($cryptedPublicKey);
        $user->setPassphrase($cryptedPassphraseKey);

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        $io->success('User certs updated');

        return Command::SUCCESS;
    }
}
