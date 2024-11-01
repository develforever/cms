<?php

namespace App\Controller;

use App\Service\HashService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class IndexConrtollerController extends AbstractController
{
    public function __construct(
        private HashService $hashService, )
    {
    }

    #[Route('/', name: 'homepage')]
    public function index(): Response
    {

        return $this->render('index_conrtoller/index.html.twig');
    }

    #[Route('/logout', name: 'logout')]
    public function logout(): Response
    {

        return $this->redirectToRoute('homepage');
    }
}
