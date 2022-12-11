<?php

namespace App\Controller;

use App\Model\Factory\PDO;
use App\Model\Manager\PostManager;
use App\Model\Route\Route;
use App\Service\JWTHelper;

class PostController
{
    #[Route('/',name:'Home', methods:['GET'])]
    public function Home(){
        if($_SERVER['REQUEST_METHOD'] == 'GET') {

            $connexionPost = new PostManager(new PDO());
            $posts = $connexionPost->getAllPosts();

            $tableauPost = [];

            foreach ($posts as $post){
                $postArray = [
                    "id"=> $post->getId(),
                    "title"=> $post->getTitle(),
                    "content"=>$post->getContent(),
                    "author"=> $post->getAuthor(),
                    "created_at" => $post->getCreated_At(),
                    "updated_at" => $post->getUpdated_At(),
                ];

                $tableauPost[] = $postArray;
            }
            if($posts){
                echo json_encode(
                    $tableauPost);
            }
        }
    }

    #[Route('/addPost',name:'Home', methods:['POST'])]
    public function AddPost(){
        $cred = str_replace("Bearer ", "", getallheaders()['authorization']);
        $token = JWTHelper::decodeJWT($cred);

        if($_SERVER['REQUEST_METHOD'] == 'POST') {
            if(!empty($_POST)) {
                if ($token) {
                    if (isset($_POST["title"], $_POST["content"]) && !empty($_POST['title']) && !empty($_POST['content'])) {
                        $title = htmlspecialchars(strip_tags($_POST["title"]));
                        $content = nl2br(htmlspecialchars(strip_tags($_POST["content"])));
                        $created_at = date('Y-m-d H:i:s');
                        $updated_at = $created_at;

                        $connectionPdo = new PostManager(new PDO());
                        $connectionPdo->addPost($title,$content,$token->id,$created_at,$updated_at);

                        echo json_encode([
                            "status" => "success",
                        ]);
                    }
                }else{
                    echo json_encode([
                        "status" => "error",
                    ]);exit;
                }
            }
        }
    }
}