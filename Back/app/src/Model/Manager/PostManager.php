<?php

namespace App\Model\Manager;

use App\Base\BaseManager;
use App\Model\Entity\Post;

class PostManager extends BaseManager
{
    public function getAllPosts(): array{

        $query = $this->pdo->query("select Users.login as author, Post.* from `Post` inner join `Users` on Post.authorId = Users.id ORDER BY Post.created_at DESC");
        $posts = [];

        while ($data = $query->fetch(\PDO::FETCH_ASSOC)) {

            $posts[] = new Post($data);

        }

        return $posts;
    }


    public function addPost($title,$content,$authorId,$created_at,$updated_at):void{

        $sql = "INSERT INTO `Post` (`title`,`content`,`authorId`,`created_at`,`updated_at`) VALUES (:title, :content, :authorId,:created_at,:updated_at)";

        $query = $this->pdo->prepare($sql);
        $query->bindValue(':title', $title, \PDO::PARAM_STR);
        $query->bindValue(':content', $content, \PDO::PARAM_STR);
        $query->bindValue(':authorId', $authorId, \PDO::PARAM_STR);
        $query->bindValue(':created_at', $created_at, \PDO::PARAM_STR);
        $query->bindValue(':updated_at', $updated_at, \PDO::PARAM_STR);

        $query->execute();
    }
}