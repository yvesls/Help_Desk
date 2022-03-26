<?php

namespace App\Models;
use App\Models\Usuario;
use MF\Model\Model; // padrão dos models(precisam extender de model)

class Chamado extends Model {
    
    // atributos que representam as colunas de registros do banco de dados
	private $id;
	private $nome;
	private $nome_usuario;
	private $categoria;
	private $titulo;
	private $descricao;
	private $status;
	private $dados;
	private $cep, $endereco, $cidade, $bairro, $uf, $complemento;

    // modelos de set e get
	public function __get($atributo) {
		return $this->$atributo;
	}

	public function __set($atributo, $valor) {
		$this->$atributo = $valor;
	}

	//salvar (lógica responsável pela armazenamento dos dados)
	public function salvar_chamado() {
		$data = date('d/m/Y');
		$query = "insert into tb_chamados(nome, categoria, titulo, descricao, status, data_mod)values(:nome, :categoria, :titulo, :descricao, :status, :data_mod)"; //  preenchendo nome email e senha
		$stmt = $this->db->prepare($query); // instanciando o pbo
		$stmt->bindValue(':data_mod', $data);
		$stmt->bindValue(':nome', $this->__get('nome')); // bind (parte da inserção) substitui o atributo nome pelo get do nome passado
		$stmt->bindValue(':categoria', $this->__get('categoria'));
		$stmt->bindValue(':titulo', $this->__get('titulo')); //md5() -> hash 32 caracteres (criptografia da senha)
		$stmt->bindValue(':descricao', $this->__get('descricao'));
		$stmt->bindValue(':status', 'pendente');
        $stmt->execute(); // executa o pdo stmt

		return $this;
	}

	public function set_novo_status() {
		$data = date('d/m/Y');
		$query = "update tb_chamados set status = :status, data_mod = :data_mod where id = :id "; //  preenchendo nome email e senha
		$stmt = $this->db->prepare($query); // instanciando o pbo
		$stmt->bindValue(':data_mod', $data); 
		$stmt->bindValue(':status', 'realizado'); 
		$stmt->bindValue(':id', $this->__get('id')); 

		$stmt->execute(); // executa o pdo stmt

		return $this;
	}

	public function getAdm(){

        $query = "select nome from usuarios where nome = :nome";
        $stmt = $this->db->prepare($query);
        $stmt->bindValue(':nome',  'administrador');
        $stmt->execute();
        
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function getChamados(){

		$usuario = $this; 
		$usuario->__set('nome', $_SESSION['nome']); // resgatando o usuário para assim buscar pelo nome os dados dele

        $query = "select categoria, titulo, descricao, status, data_mod from tb_chamados where nome = :nome";
        $stmt = $this->db->prepare($query);
        $stmt->bindValue(':nome',  $this->__get('nome'));
        $stmt->execute();
        
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);

    }

	public function getChamadosAdm(){

		$query = "select categoria, titulo, descricao, nome, id, data_mod, status from tb_chamados where status = 'pendente'";

		return $this->db->query($query)->fetchAll();
	}

	public function getChamadosRealizadosAdm(){

		$query = "select categoria, titulo, descricao, nome, id, data_mod from tb_chamados where status = 'realizado'";

		return $this->db->query($query)->fetchAll();
	}

	public function getChamadosAdmPorNome($cliente){
		$usuario = $this; 
		$usuario->__set('nome', $cliente);

		$query = "select categoria, titulo, descricao, id, data_mod from tb_chamados where nome = :nome and status = 'pendente'";
		$stmt = $this->db->prepare($query);
        $stmt->bindValue(':nome', $this->__get('nome'));
        $stmt->execute();

		return $stmt->fetchAll(\PDO::FETCH_OBJ);
	}

	public function getChamadosAdmPorCategoria($categoria){
		$usuario = $this; 
		$usuario->__set('categoria', $categoria);

		$query = "select categoria, titulo, descricao, nome, id, data_mod from tb_chamados where categoria = :categoria and status = 'pendente'";
		$stmt = $this->db->prepare($query);
        $stmt->bindValue(':categoria', $this->__get('categoria'));
        $stmt->execute();

		return $stmt->fetchAll(\PDO::FETCH_OBJ);
	}

	public function verificaSeExisteEnderecoCad($nome_usuario) { // retorna os dados de vendas de vendas
		$usuario = $this; 
		$usuario->__set('nome_usuario', $nome_usuario);
		$query = '
			select 
				count(*) as nome 
			from 
				tb_endereco
			where
			nome_usuario = :nome_usuario';

		$stmt = $this->db->prepare($query);
		$stmt->bindValue(':nome_usuario', $nome_usuario);
		$stmt->execute();

		return $stmt->fetch();
	}

	public function salvar_endereco() {
		$query = "insert into tb_endereco(nome_usuario, cep, endereco, bairro, cidade, UF, complemento)values(:nome_usuario, :cep, :endereco, :bairro, :cidade, :UF, :complemento)"; //  preenchendo nome email e senha
		$stmt = $this->db->prepare($query); // instanciando o pbo
		$stmt->bindValue(':nome_usuario', $this->__get('nome'));
		$stmt->bindValue(':cep', $this->__get('cep')); // bind (parte da inserção) substitui o atributo nome pelo get do nome passado
		$stmt->bindValue(':endereco', $this->__get('endereco'));
		$stmt->bindValue(':bairro', $this->__get('bairro')); //md5() -> hash 32 caracteres (criptografia da senha)
		$stmt->bindValue(':cidade', $this->__get('cidade'));
		$stmt->bindValue(':UF', $this->__get('uf'));
		$stmt->bindValue(':complemento', $this->__get('complemento'));
        $stmt->execute(); // executa o pdo stmt

		return $this;
	}

	public function consultarEnderecos(){

		$query = "select nome_usuario, cep, endereco, bairro, cidade, UF, complemento from tb_endereco";
		$stmt = $this->db->prepare($query);
        $stmt->execute();

		return $stmt->fetchAll(\PDO::FETCH_ASSOC);
	}
}

?>