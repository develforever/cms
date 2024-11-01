<?php

namespace App\DTO\Api;

class PageListDTO
{

    public ?int $page = 1;
    public ?int $limit = 1;

    public function __construct(int $page = 1, int $limit = 1)
    {
        $this->page = $page;
        $this->limit = $limit;
    }
}
