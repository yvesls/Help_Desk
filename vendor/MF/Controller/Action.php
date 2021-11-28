<?php

    namespace MF\Controller;

    abstract class Action {
       
        protected $view;

        public function __construct(){
            $this->view = new \stdClass(); // classe nativa do php 
            // cria objetos vazios preenchidos dinamicamente
        }

        protected function render($view, $layout) {
            $this->view->page = $view;
            if(file_exists("../App/Views/".$layout.".phtml")){
                require_once "../App/Views/".$layout.".phtml";
            }else {
                $this->content();
            }
            
        }

        protected function content(){

            $classAtual = get_class($this); // retorna o nome da classe
            $classAtual = str_replace('App\\Controllers\\', '', $classAtual); // subistituindo por vazio a saida
            $classAtual = strtolower(str_replace('Controller', '', $classAtual));

            require_once "../App/Views/".$classAtual."/".$this->view->page.".phtml";
        }
    }


?>