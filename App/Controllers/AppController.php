<?php

namespace App\Controllers;

//os recursos do miniframework
use MF\Controller\Action;
use MF\Model\Container;

// configura as páginas restritas da aplicação de acordo com cada usuário
class AppController extends Action {


	public function home() {

		$this->validaAutenticacao();
		// Dados CHamados
		// $conexaoChamado = Container::getModel('Chamado');	
		// $dados = $conexaoChamado->getChamados();
		// $this->view->dadosChamado = $dados;
		
		// Chat
		$conexaoChamado = Container::getModel('Chamado');
		$dados = $conexaoChamado->getAdm();

		if($_SESSION['senha'] == "admadm"){
			$this->view->adm = $dados;
			$this->view->nome = $_SESSION['nome'];
			$this->render('adm', 'layout1');
		} else {
			$this->view->nome = $_SESSION['nome'];
			// protege a rota ( procurando se os dados foram preenchidos no processo de autenticação).
			$this->render('home', 'layout1');
		}
	}

	public function abrir_chamado() {

		$this->validaAutenticacao();

		$this->view->chamado = array( // recarregando os dados em increver-se para o usuário não precisar digitar novamente
			'categoria' => '',
			'titulo' => '',
			'descricao' => '',
		);

		$this->view->abrir = false;

		// Dados CHamados
		$conexaoChamado = Container::getModel('Chamado');	
		$dados1 = $conexaoChamado->getChamados();
		$this->view->dadosChamado = $dados1;
		
		// Chat
		$dados2 = $conexaoChamado->getAdm();
		$this->view->adm = $dados2;

		// para chamar o registra endereço apenas uma vez
		$dados3 = $conexaoChamado->verificaSeExisteEnderecoCad($_SESSION['nome']);
		$this->view->primeiroChamado = $dados3;
		 
		// echo '<br>';
		// echo '<br>';
		// echo '<br>';
		// echo '<br>';
		// print_r($dados3);
		$this->render('abrir_chamado', 'layout1');
	}

	public function registra_chamado() {

		$this->validaAutenticacao();

		$chamado = Container::getModel('Chamado'); // instancia e inicia uma conexão com bd
		// atribuindo os valores para registro no banco via post
		$chamado->__set('nome', $_SESSION['nome']);
		$chamado->__set('categoria', $_POST['categoria']);
		$chamado->__set('titulo', $_POST['titulo']);
		$chamado->__set('descricao', $_POST['descricao']);
		
		$chamado->__set('cep', $_POST['cep']);
		$chamado->__set('endereco', $_POST['endereco']);
		$chamado->__set('bairro', $_POST['bairro']);
		$chamado->__set('cidade', $_POST['cidade']);
		$chamado->__set('uf', $_POST['uf']);
		$chamado->__set('complemento', $_POST['complemento']);

		$chamado->salvar_endereco();

		if($chamado->__get('categoria') != '' && $chamado->__get('titulo') != '' && $chamado->__get('descricao') != ''){
			$chamado->salvar_chamado();
			
			$conexaoChamado = Container::getModel('Chamado');
			$dados = $conexaoChamado->getAdm();
			$this->view->adm = $dados;

			header('Location: /consultar_chamado');
		}else { // campo não preenchido
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

		$this->validaAutenticacao();

		// Dados CHamados
		$conexaoChamado = Container::getModel('Chamado');	
		$dados1 = $conexaoChamado->getChamados();
		$this->view->dadosChamado = $dados1;
		// echo '<br>';
		// echo '<br>';
		// echo '<br>';
		// echo '<br>';
		// echo '<br>';
		// print_r($dados1);
		// Chat
		$conexaoChamado = Container::getModel('Chamado');
		$dados2 = $conexaoChamado->getAdm();
		$this->view->adm = $dados2;
		// print_r($dados2);

		$this->render('consultar_chamado', 'layout1');
	}

	public function consultar_chamado_adm() {

		$this->validaAutenticacao();
		
		$conexaoChamado = Container::getModel('Chamado');
		
		$dados = $conexaoChamado->getChamadosAdm();
		
		$this->view->dadosChamado = $dados;
		// echo '<br>';
		// echo '<br>';
		// echo '<br>';
		// echo '<br>';
		// echo '<br>';
		// echo '<pre>';
		// print_r($dados);
		// echo '</pre>';
		// resgata os nomes na busca por nomes
		$conexaoClientes = Container::getModel('Usuario');

		$clientes = $conexaoClientes->getClientes();
		// echo '<br>';
		// echo '<br>';
		// echo '<br>';
		// echo '<br>';
		// echo '<br>';
		// echo '<pre>';
		// print_r($clientes[0]);
		// echo '</pre>';
		$this->view->clientes = $clientes;

		$this->render('consultar_chamado_adm', 'layout1');
	}

	public function enderecos() {

		$this->validaAutenticacao();
		
		$conexaoChamado = Container::getModel('Chamado');
		
		$dados = $conexaoChamado->consultarEnderecos();
		
		$this->view->dadosEndereco = $dados;
		// echo '<br>';
		// echo '<br>';
		// echo '<br>';
		// echo '<br>';
		// echo '<br>';
		// echo '<pre>';
		// print_r($dados);
		// echo '</pre>';

		$conexaoClientes = Container::getModel('Usuario');

		$clientes = $conexaoClientes->getClientes();

		$this->view->clientes = $clientes;
		
		$this->render('enderecos', 'layout1');
	}

	public function dashboard() {

		$this->validaAutenticacao();
		
		$conexaoChamado = Container::getModel('Chamado');
		
		$numChamPen = $conexaoChamado->consultaNumChamadosPendentes();
		$numCham = $conexaoChamado->consultaNumChamados();
		$numClientes = $conexaoChamado->consultaNumClientes();
		
		$this->view->numChamPen = $numChamPen;
		$this->view->numCham = $numCham;
		$this->view->numClientes = $numClientes;

		$conexaoClientes = Container::getModel('Usuario');

		$clientes = $conexaoClientes->getClientes();

		$this->view->clientes = $clientes;
		
		$this->render('dashboard', 'layout1');
	}

	public function consultar_chamados_realizados_adm(){

		$this->validaAutenticacao();

		$conexaoChamado = Container::getModel('Chamado');
		
		$dados = $conexaoChamado->getChamadosRealizadosAdm();
		$this->view->dadosChamado = $dados;

		$this->render('consultar_chamados_realizados_adm', 'layout1');
	}
	
	public function consultar_cliente_adm(){

		$this->validaAutenticacao();

		$conexaoChamado = Container::getModel('Chamado');
		$dados = $conexaoChamado->getChamadosAdmPorNome($_POST['nome']);
		$conexaoChamado->__set('dados', $dados);
		$array = json_decode(json_encode($dados), true);
		// echo '<br>';
		// echo '<br>';
		// echo '<br>';
		// echo '<br>';
		// echo '<br>';
		// echo '<pre>';
		// print_r($dados);
		// echo '</pre>';
		echo json_encode($dados);
	}

	public function consultar_categoria_adm(){

		$this->validaAutenticacao();
		
		$conexaoChamado = Container::getModel('Chamado');
		$dados = $conexaoChamado->getChamadosAdmPorCategoria($_POST['categoria']);
		$conexaoChamado->__set('dados', $dados);
		$array = json_decode(json_encode($dados), true);
		
		echo json_encode($dados);
	}

	public function alterar_status_adm(){

		$this->validaAutenticacao();

		$conexaoChamado = Container::getModel('Chamado');
		$conexaoChamado->__set('id', $_POST['id']);
		$conexaoChamado->set_novo_status();
	}

	public function comunicacao(){

		$this->validaAutenticacao();

		$dados = $_POST['msg'];
		$valor = explode('Er32', $dados);
		$conexaoComunicacao = Container::getModel('Comunicacao');
		// setando mensagem
		$conexaoComunicacao->__set('nome', $valor[0]);
		$conexaoComunicacao->__set('destino', $valor[1]);
		$conexaoComunicacao->__set('mensagem', $valor[2]);
		$conexaoComunicacao->setComunicacao();
		$confirma = 'ok';
		$array = json_decode(json_encode($confirma), true);
		
		echo json_encode($confirma);
	}

	public function recuperaComunicacao(){

		$this->validaAutenticacao();
	
		$conexaoComunicacao = Container::getModel('Comunicacao');
		// resgatando mensagem
		$recuperaComunicacao = $conexaoComunicacao->getComunicacao();
		$this->view->mensagens = $recuperaComunicacao;

		
		foreach($this->view->mensagens as $key=>$dados) {
			echo $dados['destino'].'@@@y@@@'.$dados['nome'].'@@@y@@@'.$dados['mensagem'].'@@@y@@@'.$dados['datadoenvio'].'@@@fim@@@';
		}
	}

	public function validaAutenticacao(){

		session_start();
		
		if(!isset($_SESSION['id']) || $_SESSION['id'] == '' || !isset($_SESSION['nome']) || $_SESSION['nome'] == '') {

			header('Location: /?login=erro');
		} 
	}
}
?>