<?php
namespace App\Controller;

use App\Model\Factory\PDO;

use App\Model\Route\Route;
use App\Service\JWTHelper;
use App\Model\Manager\UserManager;
use App\Base\CookieHelper;

class UserController
{

    #[Route('/login', name: "login", methods: ["POST"])]
    public function loginForm(){
        
        if($_SERVER['REQUEST_METHOD'] == 'POST'){
            if(!empty($_POST)) {
                if(isset($_POST["login"], $_POST["password"]) && !empty($_POST["login"] && !empty($_POST["password"]))) {

                    $login = htmlspecialchars(strip_tags($_POST['login']));
                    $password = htmlspecialchars(strip_tags($_POST['password']));

                    $connectionPdo = new UserManager(new PDO());
                    $user = $connectionPdo->login($login,$password);

                    if($user){
                        $jwt = JWTHelper::buildJWT($user);

                        CookieHelper::setCookie($jwt);

                        echo json_encode([
                            'status' => 'success',
                            "id" => $user->getId(),
                            'username' => $user->getLogin(),
                            "lastname"=>$user->getLastname(),
                            "firstname"=>$user->getFirstname(),
                            'token' => $jwt
                        ]);
                        exit;
                    }


                }

            }
        }echo json_encode([
            'status' => 'error',
            'message' => 'Pas de connexion'
        ]);
        exit;
    }

    #[Route('/register',name:'register', methods: ["POST"])]
    public function registerForm(){

        if($_SERVER['REQUEST_METHOD'] == 'POST'){

            if (!empty($_POST)) {

                if (isset($_POST["lastname"], $_POST["firstname"], $_POST["login"], $_POST['password']) && !empty($_POST['lastname']) && !empty($_POST['firstname']) && !empty($_POST['login']) && !empty($_POST['password'])) {
                    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

                    $lastname = htmlspecialchars(strip_tags($_POST['lastname']));
                    $firstname = htmlspecialchars(strip_tags($_POST['firstname']));
                    $login = htmlspecialchars(strip_tags($_POST['login']));

                    $connectionPdo = new UserManager(new PDO());

                    $user = $connectionPdo->register($lastname, $firstname, $login, $password);

                    if($user){
                        $jwt = JWTHelper::buildJWT($user);

                        CookieHelper::setCookie($jwt);

                        echo json_encode([
                            'status' => 'success',
                            "id" => $user->getId(),
                            'username' => $user->getLogin(),
                            "lastname"=>$user->getLastname(),
                            "firstname"=>$user->getFirstname(),
                            'token' => $jwt
                        ]);
                        exit;
                    }

                }
            }

        }
        echo json_encode([
            'status' => 'error',
            'message' => 'Pas de d\'inscription'
        ]);
        exit;
    }
}