<?php
namespace App\Base;
class CookieHelper
{
    public static function setCookie(string $token): void
    {
        setcookie('token', $token, time() + (10), '/', 'localhost', false, false);
    }
}