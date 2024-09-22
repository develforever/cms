<?php

namespace App\Controller;

use App\Message\TestMsg;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Routing\Attribute\Route;

class TestMessageController extends AbstractController
{
    #[Route('/test/message', name: 'app_test_message')]
    public function index(MessageBusInterface $bus): Response
    {

        $t = $bus->dispatch(new TestMsg('Look! I created a message!'));

        return $this->render('test_message/index.html.twig', [
            'controller_name' => 'TestMessageController',
        ]);
    }
}
