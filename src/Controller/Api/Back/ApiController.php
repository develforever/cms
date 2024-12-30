<?php

namespace App\Controller\Api\Back;

use App\Enum\Route\Api\Back;
use OpenApi\Attributes as OA;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\Serializer\SerializerInterface;

class ApiController extends AbstractController
{
    #[OA\Tag('Other')]
    #[Route('/api/data', name: 'api_data', methods: ['GET'])]
    #[OA\Get(
        summary: 'Secured endpoint',
        description: 'This is a secured endpoint that requires a Bearer token',
        security: [['Bearer' => []]],
        responses: [
            new OA\Response(
                response: 200,
                description: 'Secured response',
                content: new OA\JsonContent(type: 'object', example: ['data' => 'secured data'])
            ),
            new OA\Response(
                response: 401,
                description: 'Unauthorized'
            ),
        ]
    )]
    #[IsGranted('IS_AUTHENTICATED_FULLY')]
    public function getData(): JsonResponse
    {
        return new JsonResponse(['data' => 'Secured data']);
    }

    #[OA\Tag('User')]
    #[Route('/api/user', name: 'api_user', methods: ['GET'])]
    #[OA\Get(
        summary: 'Secured endpoint',
        description: 'This is a secured endpoint that requires a Bearer token',
        security: [['Bearer' => []]],
        responses: [
            new OA\Response(
                response: 200,
                description: 'Secured response',
                content: new OA\JsonContent(type: 'object', example: ['data' => 'secured data'])
            ),
            new OA\Response(
                response: 401,
                description: 'Unauthorized'
            ),
        ]
    )]
    #[IsGranted('IS_AUTHENTICATED_FULLY')]
    public function getUserInfo(SerializerInterface $serializer): JsonResponse
    {
        $jsonContent = $serializer->serialize([
            'data' => $this->getUser(),
            'links' => [
                'page_list' => $this->generateUrl(Back::LIST),
                'page_store' => $this->generateUrl(Back::STORE),
                'page_update' => $this->generateUrl(Back::UPDATE, ['id'=>'{id}']),
                'page_show' => $this->generateUrl(Back::SHOW, ['id'=>'{id}']),
            ],
            'meta' => new \stdClass(),
        ], 'json', [
            'groups' => ['user_read'],
        ]);

        return new JsonResponse($jsonContent, 200, [], true);
    }
}