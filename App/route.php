<?php

    namespace App;

    use MF\init\Bootstrap;

    class Route extends Bootstrap {

        // quais rotas a aplicacao possui
        protected function initRoutes() {
            // configurando rotas (buscadas pelo navegador). Amarrando rotas.
            $routes['index'] = array(
                'route' => '/',
                'controller' => 'indexController',
                'action' => 'index'
            );

            $routes['inscreverse'] = array(
                'route' => '/inscreverse',
                'controller' => 'indexController',
                'action' => 'inscreverse'
            );
    
            $routes['registrar'] = array(
                'route' => '/registrar',
                'controller' => 'indexController',
                'action' => 'registrar'
            );
    
            $routes['autenticar'] = array(
                'route' => '/autenticar',
                'controller' => 'AuthController',
                'action' => 'autenticar'
            );

            $routes['home'] = array(
                'route' => '/home',
                'controller' => 'AppController',
                'action' => 'home'
            );

            $routes['adm'] = array(
                'route' => '/adm',
                'controller' => 'AppController',
                'action' => 'adm'
            );

            $routes['abrir_chamado'] = array(
                'route' => '/abrir_chamado',
                'controller' => 'AppController',
                'action' => 'abrir_chamado'
            );

            $routes['registra_chamado'] = array(
                'route' => '/registra_chamado',
                'controller' => 'AppController',
                'action' => 'registra_chamado'
            );

            $routes['consultar_chamado'] = array(
                'route' => '/consultar_chamado',
                'controller' => 'AppController',
                'action' => 'consultar_chamado'
            );

            $routes['consultar_chamado_adm'] = array(
                'route' => '/consultar_chamado_adm',
                'controller' => 'AppController',
                'action' => 'consultar_chamado_adm'
            );

            $routes['consultar_cliente_adm'] = array(
                'route' => '/consultar_cliente_adm',
                'controller' => 'AppController',
                'action' => 'consultar_cliente_adm'
            );

            $routes['consultar_categoria_adm'] = array(
                'route' => '/consultar_categoria_adm',
                'controller' => 'AppController',
                'action' => 'consultar_categoria_adm'
            );

            $routes['alterar_status_adm'] = array(
                'route' => '/alterar_status_adm',
                'controller' => 'AppController',
                'action' => 'alterar_status_adm'
            );

            $routes['consultar_chamados_realizados_adm'] = array(
                'route' => '/consultar_chamados_realizados_adm',
                'controller' => 'AppController',
                'action' => 'consultar_chamados_realizados_adm'
            );

            $routes['comunicacao'] = array(
                'route' => '/comunicacao',
                'controller' => 'AppController',
                'action' => 'comunicacao'
            );

            $routes['recuperaComunicacao'] = array(
                'route' => '/recuperaComunicacao',
                'controller' => 'AppController',
                'action' => 'recuperaComunicacao'
            );

            $routes['enderecos'] = array(
                'route' => '/enderecos',
                'controller' => 'AppController',
                'action' => 'enderecos'
            );

            $routes['dashboard'] = array(
                'route' => '/dashboard',
                'controller' => 'AppController',
                'action' => 'dashboard'
            );

            $routes['sair'] = array(
                'route' => '/sair',
                'controller' => 'AuthController',
                'action' => 'sair'
            );

            $this->setRoutes($routes); // iniciando array de rotas
        }
    }


?>