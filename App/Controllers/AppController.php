<?php

namespace App\Controllers;

//os recursos do miniframework
use MF\Controller\Action;
use MF\Model\Container;

// configura as páginas restritas da aplicação de acordo com cada usuário
class AppController extends Action {


	public function home() {

		session_start(); // starta a seção

		if($_SESSION['senha'] == "adminadmin"){
			$this->render('adm', 'layout1');
		}	
		// protege a rota ( procurando se os dados foram preenchidos no processo de autenticação).
		if($_SESSION['id'] != '' && $_SESSION['nome'] != '') {
			// carrega a rota timeline
			$this->view->nome = $_SESSION['nome'];
			$this->render('home', 'layout1');
		} else {
			header('Location: /?login=erro');
		}	
	}

	public function abrir_chamado() {
		$this->view->chamado = array( // recarregando os dados em increver-se para o usuário não precisar digitar novamente
			'categoria' => '',
			'titulo' => '',
			'descricao' => '',
		);

		$this->view->abrir = false;
		$this->render('abrir_chamado', 'layout1');
	}

	public function registra_chamado() {

		session_start(); // iniciando a session para recuperação do id do usuário logado

		$chamado = Container::getModel('Chamado'); // instancia e inicia uma conexão com bd
		
		$chamado->__set('nome', $_SESSION['nome']);
		// atribuindo os valores para registro no banco via post
		$chamado->__set('categoria', $_POST['categoria']);
		$chamado->__set('titulo', $_POST['titulo']);
		$chamado->__set('descricao', $_POST['descricao']);

		if($chamado->__get('categoria') != '' && $chamado->__get('titulo') != '' && $chamado->__get('descricao') != ''){
			$chamado->salvar_chamado();
			
			header('Location: /consultar_chamado');
		}else {
			$this->view->abrir = true;

			$this->view->chamado = array( // recarregando os dados em increver-se para o usuário não precisar digitar novamente
				'categoria' => $_POST['categoria'],
				'titulo' => $_POST['titulo'],
				'descricao' => $_POST['descricao'],
			);
			$this->render('abrir_chamado', 'layout1');
		}
	}

	public function consultar_chamado() {
		
		$conexaoChamado = Container::getModel('Chamado');
		
		$dados = $conexaoChamado->getChamados();
		// echo '<pre>';
		// print_r($dados);
		// echo '</pre>';
		$this->view->dadosChamado = $dados;
		
		$this->render('consultar_chamado', 'layout1');
	}

	public function consultar_chamado_adm() {
		
		$conexaoChamado = Container::getModel('Chamado');
		
		$dados = $conexaoChamado->getChamadosAdm();
		// echo '<pre>';
		// print_r($dados);
		// echo '</pre>';
		$this->view->dadosChamado = $dados;
		
		$conexaoClientes = Container::getModel('Usuario');

		$clientes = $conexaoClientes->getClientes();

		$this->view->clientes = $clientes;

		$this->render('consultar_chamado_adm', 'layout1');
	}
	
	public function consultar_cliente_adm(){

		$conexaoChamado = Container::getModel('Chamado');
		$dados = $conexaoChamado->getChamadosAdmPorNome($_POST['nome']);
		$conexaoChamado->__set('dados', $dados);
		$array = json_decode(json_encode($dados), true);
		
		echo json_encode($dados);
	}

	public function consultar_categoria_adm(){

		$conexaoChamado = Container::getModel('Chamado');
		$dados = $conexaoChamado->getChamadosAdmPorCategoria($_POST['categoria']);
		$conexaoChamado->__set('dados', $dados);
		$array = json_decode(json_encode($dados), true);
		
		echo json_encode($dados);
	}
}
?>