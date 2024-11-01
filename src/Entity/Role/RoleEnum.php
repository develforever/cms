<?php

namespace App\Entity\Role;

enum RoleEnum: string
{
    case ADMIN = 'ADMIN';
    case USER = 'USER';
}
