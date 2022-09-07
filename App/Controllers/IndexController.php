<?php

    namespace App\Controllers;

    // recursos do miniframework
    use MF\Controller\Action;
    use MF\Model\Container;

    // models
    use App\Models\Produto;
    use App\Models\Info;

    class IndexController extends Action {

        public function index(){
            // verifica se o login é igual a erro (erro passado em AuthController -> autenticar) na validação do formulário
		    $this->view->login = isset($_GET['login']) ? $_GET['login'] : '';
            $this->render('index', 'layout_index');
        }

        public function inscreverse() {

            $this->view->usuario = array( // tratando o value dos campos caso seja acessado dinamicamente depois de dar erro na inscrição
                'nome' => '',
                'email' => '',
                'senha' => '',
            ); // limpa os campos
    
            $this->view->erroCadastro = false; // manda uma mensagem de cadastro ok para a view
    
            $this->render('inscreverse', 'layout_into');
        }

        public function registrar() {

            // recebe os dados do formulãrio
            $usuario = Container::getModel('Usuario'); // registra uma instãncia do modelo usuario e a classe de conexão com banco
    
            // recebe, pelo método post, os dados para manipulação e os seta
            $usuario->__set('nome', $_POST['nome']);
            $usuario->__set('email', $_POST['email']);
            $usuario->__set('senha', $_POST['senha']);
    
            // teste de validação de cadastro
            if($usuario->validarCadastro() && count($usuario->getUsuarioPorEmail()) == 0) { // se o validar cadastro for 
                //verdadeiro e o método recupera cadastro retornar a quantidade igual a 0, ou seja, não existir cadastro, 
                //a operação é verdadeira
    
                    $usuario->salvar(); // salva o usuario
    
                    $this->render('cadastro', 'layout_into'); // renderiza uma view que apresenta a mensagem de sucesso
                    
            } else { // caso haja um erro
    
                $this->view->usuario = array( // recarregando os dados em increver-se para o usuário não precisar digitar novamente
                    'nome' => $_POST['nome'],
                    'email' => $_POST['email'],
                    'senha' => $_POST['senha'],
                );
    
                $this->view->erroCadastro = true; // manda uma mensagem de erro de cadastro para view
    
                $this->render('inscreverse', 'layout_into'); // renderiza a view inscrever-se
            }
    
        }

    }
?>