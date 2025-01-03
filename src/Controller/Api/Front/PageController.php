<?php

namespace App\Controller\Api\Front;

use App\DTO\Api\PageListDTO;
use App\Entity\Page;
use App\Document\Page as MPage;
use App\Enum\Route\Api\Front;
use App\Repository\PageRepository;
use Doctrine\ODM\MongoDB\DocumentManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\MapQueryString;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

class PageController extends AbstractController
{
    public function __construct(
        private PageRepository $pageRepository,
        private EntityManagerInterface $manager,
        private SerializerInterface $serializer,
        private DocumentManager $dm,
    ) {
    }

    #[Route('/api/v1/page/list', name: Front::LIST, methods: 'GET')]
    public function index(
        #[MapQueryString] ?PageListDTO $params = new PageListDTO(),
    ): JsonResponse {

        $dmpages = $this->dm->getRepository(MPage::class)->findAll();

        $pagination = $this->pageRepository->findPaginated($params->page, $params->limit);

        $result = [
            'data' => $pagination['result'],
            'meta' => [
                'current_page' => $params->page,
                'per_page' => $params->limit,
                'total' => $pagination['total'],
                'total_pages' => $pagination['total_pages']
            ],
        ];

        return new JsonResponse($this->serializer->serialize($result, 'json', ['groups' => 'user_read']), 200, [
            'groups' => ['user_read'],
        ], true);
    }

    #[Route('/api/v1/page/show/{id}', name: Front::SHOW, methods: 'GET')]
    public function show(
        Page $page,
    ): JsonResponse {

        return new JsonResponse($this->serializer->serialize($page, 'json', ['groups' => 'user_read_full']), 200, [], true);
    }
}
