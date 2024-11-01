<?php

namespace App\MessageHandler;

use App\Message\TestMsg;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;

#[AsMessageHandler]
class TestMsgHandler
{
    public function __invoke(TestMsg $message)
    {
    }
}
