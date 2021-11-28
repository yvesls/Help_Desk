<?php

namespace App\Controllers;

//os recursos do miniframework (abristação de instancias)
use MF\Controller\Action; 
use MF\Model\Container;

class AuthController extends Action {


	public function autenticar() { // metodo que representa a action autenticar
		
		$usuario = Container::getModel('Usuario'); // cria uma instancia do modelo usuário para consultar a tabela e verificar se tem email compatível

		// recupera os dados por post
		$usuario->__set('email', $_POST['email']);
		$usuario->__set('senha', $_POST['senha']);

		// id e nomes são vazios

		$usuario->autenticar(); // método responsavel por checar se existe o usuário em models bd
		
		// caso haja retorno, testa se em usuário existe um indice id e nome 
		if($usuario->__get('id') != '' && $usuario->__get('nome')) { // mostra que de fato o usuário existe
			// retorna o id e nome do próprio objeto usuario
			session_start();
			// recupera os atributos do usuário
			$_SESSION['id'] = $usuario->__get('id');
			$_SESSION['nome'] = $usuario->__get('nome');
			$_SESSION['senha'] = $usuario->__get('senha');
			// força o redirecionamento para a página protegida do usuário
			header('Location: /home');

		} else {
			header('Location: /?login=erro'); // força o redirecionamento para página raiz apresentando error
		}

	}

	// para destruir o login
	public function sair() { 
		session_start(); // como estamos trabalhando com seção, precisa startar sempre
		session_destroy(); // destroi a seção
		header('Location: /'); // renderiza pra index
	}
}