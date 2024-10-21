<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class ApiController extends AbstractController
{
    #[Route('/api/data', name: 'api_data')]
    #[IsGranted('IS_AUTHENTICATED_FULLY')]
    public function getData(): JsonResponse
    {
        return new JsonResponse(['data' => 'Secured data']);
    }
}