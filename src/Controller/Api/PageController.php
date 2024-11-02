<?php

namespace App\Controller\Api;

use App\DTO\Api\PageListDTO;
use App\DTO\Api\PagePatchDTO;
use App\DTO\Api\PageStoreDTO;
use App\Entity\Page;
use App\Repository\PageRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\MapQueryParameter;
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
    ) {
    }

    #[Route('/api/page/list', name: 'app_api_page_list', methods: 'GET')]
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

    #[Route('/api/page/store', name: 'app_api_page_store', methods: 'POST')]
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

    #[Route('/api/page/update/{id}', name: 'app_api_page_update', methods: 'PATCH')]
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

    #[Route('/api/page/show/{id}', name: 'app_api_page_show', methods: 'GET')]
    public function show(
        Page $page,
    ): JsonResponse {

        return new JsonResponse($this->serializer->serialize($page, 'json', ['groups' => 'user_read_full']), 200, [], true);
    }
}
