<?php

namespace App\Model\Manager;

use App\Base\BaseManager;
use App\Model\Entity\User;

class UserManager extends BaseManager
{

    public function login($login,$password):?User
    {


        $sql = "select `id`,`lastName`,`firstName`,`login`,`password` from `Users` where `login` = :login";

        $query = $this->pdo->prepare($sql);
        $query->bindValue(':login', $login, \PDO::PARAM_STR);

        $query->execute();

        $response = $query->fetch();

        if(!$response){
            return null;
        }

        if(!password_verify($password,$response["password"])){
            return null;
        }
        return new User($response);
    }

    public function register($lastname, $firstname, $login, $password){
        $sql = "INSERT INTO `Users` (`lastName`,`firstName`,`login`,`password`) VALUES (:lastName, :firstName, :login, :password)";

        $query = $this->pdo->prepare($sql);

        $query->bindValue(':lastName', $lastname, \PDO::PARAM_STR);

        $query->bindValue(':firstName', $firstname, \PDO::PARAM_STR);
        $query->bindValue(':login', $login, \PDO::PARAM_STR);
        $query->bindValue(':password', $password, \PDO::PARAM_STR);

        $query->execute();

        return $this->getUserById($this->pdo->lastInsertId());
    }

    public function getUserById($id):?User{

        $sql = "select `id`,`lastName`,`firstName`,`login` from `Users` where `id` = :id";

        $query = $this->pdo->prepare($sql);

        $query->bindValue(':id', $id, \PDO::PARAM_STR);

        $query->execute();

        $response = $query->fetch();

        if(!$response){
            return null;
        }

        return new User($response);
    }

}