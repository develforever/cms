<?php

namespace App\Entity\Role;

enum RoleEnum: string
{

    case ADMIN = 'RADMIN';
    case USER = 'RUSER';
}
