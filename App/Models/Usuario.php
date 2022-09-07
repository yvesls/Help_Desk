<?php

namespace App\Models;

use MF\Model\Model; // padrão dos models(precisam extender de model)

class Usuario extends Model {
    
    // atributos que representam as colunas de registros do banco de dados
	private $id;
	private $nome;
	private $email;
	private $senha;

    // modelos de set e get
	public function __get($atributo) {
		return $this->$atributo;
	}

	public function __set($atributo, $valor) {
		$this->$atributo = $valor;
	}

	//salvar (lógica responsável pela armazenamento dos dados)
	public function salvar() {

		$query = "insert into usuarios(nome, email, senha)values(:nome, :email, :senha)"; //  preenchendo nome email e senha
		$stmt = $this->db->prepare($query); // instanciando o pbo
		$stmt->bindValue(':nome', $this->__get('nome')); // bind (parte da inserção) substitui o atributo nome pelo get do nome passado
		$stmt->bindValue(':email', $this->__get('email'));
		$stmt->bindValue(':senha', $this->__get('senha')); //md5() -> hash 32 caracteres (criptografia da senha)
		$stmt->execute(); // executa o pdo stmt
		print_r($this);
		return $this; 
	}

	//validar se um cadastro pode ser feito
	public function validarCadastro() {
		$valido = true;

		if(strlen($this->__get('nome')) < 6) { // verifica se o valor do atributo nome, recuperado pelo método get usuário, é inferior a 6
			$valido = false;
		}

		if(strlen($this->__get('email')) < 6) {
			$valido = false;
		}

		if(strlen($this->__get('senha')) < 6) {
			$valido = false;
		}


		return $valido;
	}

	//recuperar um usuário por e-mail
	public function getUsuarioPorEmail() { // verifica se n foi inserido anteriormente
		$query = "select nome, email from usuarios where email = :email"; // recupera email 
		$stmt = $this->db->prepare($query);
		$stmt->bindValue(':email', $this->__get('email')); // faz o bind do email
		$stmt->execute();

		return $stmt->fetchAll(\PDO::FETCH_ASSOC); // retorna o resultado da consulta (array associativo)
	}

	public function getClientes(){
		$query = "select nome from usuarios where nome != 'Administrador'";

		return $this->db->query($query)->fetchAll(\PDO::FETCH_ASSOC);
	}

	// método que verifica se existe o login passado na index
	public function autenticar() {

		$query = "select id, nome, email from usuarios where email = :email and senha = :senha"; // passa os comandos de busca 
		$stmt = $this->db->prepare($query); // inicia a consulta
		$stmt->bindValue(':email', $this->__get('email')); // bind (passa os nomes email e senha de forma legível pro banco de dados)
		$stmt->bindValue(':senha', $this->__get('senha'));
		$stmt->execute();

		
		$usuario = $stmt->fetch(\PDO::FETCH_ASSOC);
		print_r($usuario);
		if($usuario['email'] == 'user@teste.com.br' && $usuario['senha'] == 'admadm'){
			$this->__set('senha', 'admadm');
		}
		// retorna id e nome para manipulação pela session
		if($usuario['id'] != '' && $usuario['nome'] != '') {
			$this->__set('id', $usuario['id']);
			$this->__set('nome', $usuario['nome']);
		}

		return $this;
	}
}

?>