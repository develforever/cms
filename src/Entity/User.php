<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity]
#[ORM\Table(name: 'users')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['user_read'])]
    private $id;

    #[ORM\Column(type: 'string', length: 180, unique: true)]
    #[Groups(['user_read'])]
    private $email;

    #[ORM\Column(type: 'string')]
    private $password;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $private_crt = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $public_crt = null;

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getRoles(): array
    {
        return ['ROLE_USER'];
    }

    public function eraseCredentials()
    {
    }

    public function getUserIdentifier(): string
    {
        return $this->email;
    }

    public function getPrivateCrt(): ?string
    {
        return $this->private_crt;
    }

    public function setPrivateCrt(string $private_crt): static
    {
        $this->private_crt = $private_crt;

        return $this;
    }

    public function getPublicCrt(): ?string
    {
        return $this->public_crt;
    }

    public function setPublicCrt(string $public_crt): static
    {
        $this->public_crt = $public_crt;

        return $this;
    }
}
