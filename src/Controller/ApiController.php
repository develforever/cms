<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use OpenApi\Attributes as OA;

class ApiController extends AbstractController
{
    #[Route('/api/data', name: 'api_data', methods: ['GET'])]
    #[OA\Get(
        summary: "Secured endpoint",
        description: "This is a secured endpoint that requires a Bearer token",
        security: [["Bearer" => []]],
        responses: [
            new OA\Response(
                response: 200,
                description: "Secured response",
                content: new OA\JsonContent(type: "object", example: ["data" => "secured data"])
            ),
            new OA\Response(
                response: 401,
                description: "Unauthorized"
            )
        ]
    )]
    #[IsGranted('IS_AUTHENTICATED_FULLY')]
    public function getData(): JsonResponse
    {
        return new JsonResponse(['data' => 'Secured data']);
    }
}