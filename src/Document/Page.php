<?php

namespace App\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

#[MongoDB\Document]
class Page
{
    #[MongoDB\Id]
    protected $id;
    
    #[MongoDB\Field(type: 'string')]
    protected $title;
    
    #[MongoDB\Field(type: 'string')]
    protected $content;
}