<?php

namespace App\Models;
use App\Models\Usuario;
use MF\Model\Model; // padrão dos models(precisam extender de model)

class Chamado extends Model {
    
    // atributos que representam as colunas de registros do banco de dados
	private $nome;
	private $categoria;
	private $titulo;
	private $descricao;
	private $dados;

    // modelos de set e get
	public function __get($atributo) {
		return $this->$atributo;
	}

	public function __set($atributo, $valor) {
		$this->$atributo = $valor;
	}

	//salvar (lógica responsável pela armazenamento dos dados)
	public function salvar_chamado() {

		$query = "insert into tb_chamados(nome, categoria, titulo, descricao)values(:nome, :categoria, :titulo, :descricao)"; //  preenchendo nome email e senha
		$stmt = $this->db->prepare($query); // instanciando o pbo
		$stmt->bindValue(':nome', $this->__get('nome')); // bind (parte da inserção) substitui o atributo nome pelo get do nome passado
		$stmt->bindValue(':categoria', $this->__get('categoria'));
		$stmt->bindValue(':titulo', $this->__get('titulo')); //md5() -> hash 32 caracteres (criptografia da senha)
		$stmt->bindValue(':descricao', $this->__get('descricao'));
        $stmt->execute(); // executa o pdo stmt

		return $this;
	}

    public function getChamados(){
        session_start();

		$usuario = $this; 
		$usuario->__set('nome', $_SESSION['nome']); // resgatando o usuário para assim buscar pelo nome os dados dele

        $query = "select categoria, titulo, descricao from tb_chamados where nome = :nome";
        $stmt = $this->db->prepare($query);
        $stmt->bindValue(':nome',  $this->__get('nome'));
        $stmt->execute();
        
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);

    }

	public function getChamadosAdm(){
		$query = "select categoria, titulo, descricao, nome from tb_chamados";

		return $this->db->query($query)->fetchAll();
	}

	public function getChamadosAdmPorNome($cliente){
		$usuario = $this; 
		$usuario->__set('nome', $cliente);

		$query = "select categoria, titulo, descricao from tb_chamados where nome = :nome";
		$stmt = $this->db->prepare($query);
        $stmt->bindValue(':nome', $this->__get('nome'));
        $stmt->execute();

		return $stmt->fetchAll(\PDO::FETCH_OBJ);
	}
}

?>