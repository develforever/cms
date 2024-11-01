<?php

namespace App\DTO\Api;

class PageListDTO
{
    public ?int $page = 1;
    public ?int $limit = 10;

    public function __construct(int $page = 1, int $limit = 10)
    {
        $this->page = $page;
        $this->limit = $limit;
    }
}
