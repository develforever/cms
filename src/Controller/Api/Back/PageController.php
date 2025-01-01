<?php

namespace App\Controller\Api\Back;

use App\DTO\Api\PageListDTO;
use App\DTO\Api\PagePatchDTO;
use App\DTO\Api\PageStoreDTO;
use App\Entity\Page;
use App\Enum\Route\Api\Back;
use App\Repository\PageRepository;
use Doctrine\ODM\MongoDB\DocumentManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\MapQueryString;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
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

    #[Route('/api/page/list', name: Back::PAGE_LIST, methods: 'GET')]
    public function index(
        #[MapQueryString] ?PageListDTO $params = new PageListDTO(),
    ): JsonResponse {

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

    #[Route('/api/page/store', name: Back::PAGE_STORE, methods: 'POST')]
    public function store(
        #[MapRequestPayload] PageStoreDTO $params,
    ): JsonResponse {
        $page = new Page();
        $page->setTitle($params->title);
        $page->setContent($params->content);

        $this->manager->persist($page);
        $this->manager->flush();

        return new JsonResponse($this->serializer->serialize($page, 'json', ['groups' => 'user_read']), 200, [
            'groups' => ['user_read'],
        ], true);
    }

    #[Route('/api/page/update/{id}', name: Back::PAGE_UPDATE, methods: 'PATCH')]
    public function update(
        #[MapRequestPayload] PagePatchDTO $params,
        int $id,
    ): JsonResponse {
        $page = $this->pageRepository->find($id);
        $page->setTitle($params->title);
        $page->setContent($params->content);

        $this->manager->persist($page);
        $this->manager->flush();

        return new JsonResponse($this->serializer->serialize($page, 'json', ['groups' => 'user_read_full']), 200, [], true);
    }

    #[Route('/api/page/show/{id}', name: Back::PAGE_SHOW, methods: 'GET')]
    public function show(
        Page $page,
    ): JsonResponse {

        return new JsonResponse($this->serializer->serialize($page, 'json', ['groups' => 'user_read_full']), 200, [], true);
    }
}
