<?php

    namespace MF\init;

    abstract class Bootstrap {
        private $routes;

        abstract protected function initRoutes();

        public function __construct(){
            $this->initRoutes();
            $this->run($this->getUrl()); 
        }

        public function getRoutes(){
            return $this->routes;
        }

        public function setRoutes(array $routes){
            $this->routes = $routes;
        }

        protected function run($url) {

            foreach ($this->getRoutes() as $key => $route) {
                // se for acessado o método sobre_nos, este parâmetro sera recebido na url, foreach busca, pra cada indice, se a url é compatível pra cada path interno
                // se for, entra na lógica e trabalha na instância da classe e no disparo dinâmico
                if($url == $route['route']){
                    $class = "App\\Controllers\\".ucfirst($route['controller']);
                    $controller = new $class;
                    
                    $action = $route['action'];
                    $controller->$action();
                }
            }
        }
        
        // retorna a parte de acesso da url
        protected function getUrl() {

            return parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH); // retorna todos os detalhes do servidor 
            // request_uri retorna o que foi acessado depois do / no navegador. Ex: www.exemplo.com/contato Return: contato
            // parse_url retorna um array detalhando seus componentes
            // segundo parametro: constante que, quando submetida, retorna apenas a string relativa ao path (a informação inicial)
        } // basicamente retorna a url filtrada

    }

    

?>