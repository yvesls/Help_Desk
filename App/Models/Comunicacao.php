<?php

namespace App\Models;

use MF\Model\Model; // padrão dos models(precisam extender de model)

class Comunicacao extends Model {
    
    // atributos que representam as colunas de registros do banco de dados
	private $nome;
    private $destino;
	private $mensagem;
    private $recuperaComunicacao;
	private $chat;

    // modelos de set e get
	public function __get($atributo) {
		return $this->$atributo;
	}

	public function __set($atributo, $valor) {
		$this->$atributo = $valor;
	}

    public function setComunicacao() {

		$query = "insert into tb_comunicacao(nome, destino, mensagem)values(:nome, :destino, :mensagem)"; //  preenchendo nome email e senha
		$stmt = $this->db->prepare($query); // instanciando o pbo
		$stmt->bindValue(':nome', $this->__get('nome')); // bind (parte da inserção) substitui o atributo nome pelo get do nome passado
		$stmt->bindValue(':destino', $this->__get('destino'));
		$stmt->bindValue(':mensagem', $this->__get('mensagem'));
        $stmt->execute(); // executa o pdo stmt

		return $this;
	}

    public function getComunicacao() {

		$query = "select nome, destino, mensagem from tb_comunicacao";

		return $this->db->query($query)->fetchAll();
	}
	
}

?>