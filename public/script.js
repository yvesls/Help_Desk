$(document).ready(() => {
    // inicio -- configurações dos popovers --
    $('.img-icon').mouseenter( () => {
        $('.pai1').css('position', 'relative');
        let d = document.createElement('div');
        let text = 'Fazer solicitação de chamado';
        $(d).addClass('popoverClass')
            .html(text)
            .appendTo($(".pai1"));
    });
    $('.img-icon2').mouseenter( () => {
        $('.pai2').css('position', 'relative');
        let d = document.createElement('div');
        let text = 'Abrir lista de chamados';
        $(d).addClass('popoverClass')
            .html(text)
            .appendTo($(".pai2"));
    });
    $('.img-icon').mouseleave( () => {
        $('.pai1').css('position', 'static');
        $('.popoverClass').remove();
    });
    $('.img-icon2').mouseleave( () => {
        $('.pai2').css('position', 'static');
        $('.popoverClass').remove();
    });
    // fim -- configurações dos popovers (nas imagens até o momento) -- 
    // inicio configurações das chamadas ----------------------------------------------------------------------------------------------------------------------------------------
    $('.clienteAtual').css('display', 'none'); // esconde a aba do cliente atual
    $('.categoriaAtual').css('display', 'none');
    // selecionando chamados por nome
    $('#nome').on('change', (e)=> {
        let cliente = $(e.target).val();
        $('.peloNome').remove();       

        $.ajax({ // realiza uma requisição para o servidor
            // busca no servidor por via get
            type: 'POST', 
            // url da página que interage com o servidor
            url: '/consultar_cliente_adm',
            // envia os dados que serão parametros para busca no servidor (neste caso a data)
            data: 'nome=' + cliente, // x-ww-form-urlencoded - sintaxe usada, formato urlencoded passa quantos valores quanto necessário (&parametro=valor)
            dataType: 'json',// modifica o tipo de retorno (padrao html)
            success: dados => {
                // retorna os dados objtidos a partir do parametro enviado  
                if(cliente != 'Clientes') {
                    $('.todosClientes').css('display', 'none'); 
                    $('.clienteAtual').css('display', 'block');
                    $('.categoriaAtual').css('display', 'none');
                    $('#categoria').val('Categorias');

                    if(dados == ""){
                        $('.clienteAtual').prepend('<div class="pt-5 d-flex peloNome align-content-center justify-content-center position-relative animate__animated animate__fadeIn animate_duracao"><h2>Este cliente não possui pedidos.</h2></div>')
                    }

                    dados.forEach(element => {
                        $('.clienteAtual').prepend('<div class="card mb-3 bg-light peloNome position-relative animate__animated animate__fadeIn animate_duracao"><div class="card-body"><div class="float-left pt-0 mt-0 position-relative w-100"><h5 class="card-title">'+ element.titulo +'</h5><h5 class="card-subtitle mb-2 text-muted">'+ element.categoria +'</h6><p class="card-text">'+ element.descricao +'</p><form><div class="form-check m-0 p-0"><label class="status-font" for="status">Marcar como concluído:</label><br><span><button type="button" value="realizado'+element.id+'" name="status" class="status float-left btn btn-info btn-sm">confirmar</button><small class="font-italic float-right text-dark mr-0 pr-0">'+element.data_mod+'</small></span></div></form></div></div></div>');
                    });
                }else {
                    $('.todosClientes').css('display', 'block');
                    $('.clienteAtual').css('display', 'none');
                    $('.categoriaAtual').css('display', 'none');
                }
                
            }, // mostra os dados de erro do back
            error: function ( status, error)  {
                alert('Deu erro na recuperação dos dados');
                console.log(arguments);
                console.log(status);
                console.log(error.message);
            }
        });      
        // metodo, url, dados, sucesso, erro, etc (ele realiza. Informações basicas)
    });
    // selecionando os chamados pela categoria
    $('#categoria').on('change', (e)=> {
        let categoria = $(e.target).val();
        $('.pelaCategoria').remove();

        $.ajax({ // realiza uma requisição para o servidor
            // busca no servidor por via get
            type: 'POST', 
            // url da página que interage com o servidor
            url: '/consultar_categoria_adm',
            // envia os dados que serão parametros para busca no servidor (neste caso a data)
            data: 'categoria=' + categoria, // x-ww-form-urlencoded - sintaxe usada, formato urlencoded passa quantos valores quanto necessário (&parametro=valor)
            dataType: 'json',// modifica o tipo de retorno (padrao html)
            success: dados => {
                // retorna os dados objtidos a partir do parametro enviado  
                if(categoria != 'Categorias') {
                    $('#nome').val('Clientes');
                    $('.categoriaAtual').css('display', 'block');
                    $('.todosClientes').css('display', 'none');
                    $('.clienteAtual').css('display', 'none');

                    if(dados == ""){
                        $('.categoriaAtual').prepend('<div class="pt-5 d-flex pelaCategoria align-content-center justify-content-center position-relative animate__animated animate__fadeIn animate_duracao"><h2>Esta categoria não possui pedidos.</h2></div>')
                    }

                    dados.forEach(element => {
                        // inserindo chamado no final da lista
                        $('.categoriaAtual').prepend('<div class="card mb-3 bg-light pelaCategoria  position-relative animate__animated animate__fadeIn animate_duracao"><div class="card-body"><p class="card-subtitle font-italic float-right position-relative p-0 m-0 relative-name-adm">' + element.nome + '</p><div class="float-left pt-0 mt-0 position-relative relative-card-adm col-12"><h5 class="card-title">'+ element.titulo +'</h5><h5 class="card-subtitle mb-2 text-muted">'+ element.categoria +'</h6><p class="card-text">'+ element.descricao +'</p><form><div class="form-check m-0 p-0"><label class="status-font" for="status">Marcar como concluído:</label><br><span><button type="button" value="realizado'+element.id+'" name="status" class="status btn btn-info btn-sm">confirmar</button><small class="font-italic float-right text-dark mr-0 pr-0">'+element.data_mod+'</small></span></div></form></div></div></div>');
                        var ids = [];
                        ids = element.id;
                        console.log(ids);
                        // alterando status quando concluído
                        $(".status").on("click", (e)=>{
                            e.preventDefault(); // impedir o evento submit
                            
                            let status_inteiro = $(e.target).val();
                            let id = status_inteiro.slice(9); // recuperando id passado junto com status
                            let status = status_inteiro.slice(0,9) // recortando apenas a parte do status (por ter tamanho unico, slice funciona)
                            
                            let bloco = $(e.target).closest('.card');
                    
                            console.log(bloco)
                            
                            $.ajax({ // realiza uma requisição para o servidor
                                // busca no servidor por via get
                                type: 'POST', 
                                // url da página que interage com o servidor
                                url: '/alterar_status_adm',
                                // envia os dados que serão parametros para busca no servidor (neste caso a data)
                                data: 'id=' + id, // x-ww-form-urlencoded - sintaxe usada, formato urlencoded passa quantos valores quanto necessário (&parametro=valor)
                                dataType: 'text',// modifica o tipo de retorno (padrao html)
                                success: dados => {
                                    // se for sucesso ele remove a tag
                                    $(bloco).addClass('animate__fadeOut');
                    
                                    window.setTimeout(realizaAnimacao, 1000);
                                    function realizaAnimacao(){
                                        $(bloco).remove(); // ao invés de display none, usar remove()
                                    }
                                    console.log(dados);
                                }, // mostra os dados de erro do back
                                error: function ( status, error)  {
                                    alert('Deu erro na recuperação dos dados');
                                    console.log(arguments);
                                    console.log(status);
                                    console.log(error.message);
                                }
                            }); 
                        });

                        
                    });
                    
                }else {
                    $('.categoriaAtual').css('display', 'none');
                    $('.todosClientes').css('display', 'block');
                }
                
            }, // mostra os dados de erro do back
            error: function ( status, error)  {
                alert('Deu erro na recuperação dos dados');
                console.log(arguments);
                console.log(status);
                console.log(error.message);
            }
        }); 
    });
    // selecionando os chamados por status
    $(".status").on("click", (e)=>{
        e.preventDefault(); // impedir o evento submit
        
        let status_inteiro = $(e.target).val();
        let id = status_inteiro.slice(9); // recuperando id passado junto com status
        let status = status_inteiro.slice(0,9) // recortando apenas a parte do status (por ter tamanho unico, slice funciona)
        
        let bloco = $(e.target).closest('.card');

        console.log(bloco)
        
        $.ajax({ // realiza uma requisição para o servidor
            // busca no servidor por via get
            type: 'POST', 
            // url da página que interage com o servidor
            url: '/alterar_status_adm',
            // envia os dados que serão parametros para busca no servidor (neste caso a data)
            data: 'id=' + id, // x-ww-form-urlencoded - sintaxe usada, formato urlencoded passa quantos valores quanto necessário (&parametro=valor)
            dataType: 'text',// modifica o tipo de retorno (padrao html)
            success: dados => {
                // se for sucesso ele remove a tag
                $(bloco).addClass('animate__fadeOut');

                window.setTimeout(realizaAnimacao, 1000);
                function realizaAnimacao(){
                    $(bloco).remove(); // ao invés de display none, usar remove()
                }
                console.log(dados);
            }, // mostra os dados de erro do back
            error: function ( status, error)  {
                alert('Deu erro na recuperação dos dados');
                console.log(arguments);
                console.log(status);
                console.log(error.message);
            }
        }); 

    });
    
    // animação das chamadas -- realizadas e pendentes --
    window.sr = ScrollReveal({reset: true});

    sr.reveal('.scrollRevela', {
        duration: 500,
        rotate: {x:0, y:80, z:0}
    });
    // fim -- configurações das chamadas -- 
    // inicio das configurações do chat ---------------------------------------------------------------------------------------------------------------------------------
    
    // envia mensagem para o banco de dados
    if($('.input-nome').val() != 'administrador'){
        $('.input-enviar').css('display', 'none');
        $('.input-conversa').css('display', 'none');
        let areaMsgAuto = document.createElement('div');
        $(areaMsgAuto).addClass("areaAuto");
        $('.chat-pessoal').prepend(areaMsgAuto);
        function* conversar() {             
            //escopo próprio
            // opcao
            //1 bloco
            let opcao = yield 'Olá, sou o bot responsável por ajudá-lo a entender nossa aplicação. <br> - Para acessar o guia, digite 1.<br> - Se quiser falar diretamente com o técnico, digite 2.'
            //2 bloco
            //o parâmetro enviado no next
            if(opcao == '2') {

                opcao = yield 'Ótimo! O técnico entrará em contado em um instante. Nesse meio tempo,<br> gostaria de ouvir uma piada? digite (s) para sim e (n) para não'

                if(opcao == 's' || opcao == 'S') {
                    
                    fetch('dados/piadas.json') // função nativa que faz requisição
                        .then(resposta => resposta.json()) // etapa de execução que recebe a resposta em formato json
                        .then(piadas => { // segunda etapa de execução 
                            let idx = Math.floor((Math.random() * 10))
                            let piada = piadas[idx]
                            
                            let msgAuto = document.createElement('div');
                            $(msgAuto).css('width', 'auto').css('display', 'flex').css('justify-content', 'center').css('padding', '10px 0').css('background-color', ' #eeeeee').css('margin', '5px 5px');
                            $(msgAuto).html(piada.piada);
                            $(areaMsgAuto).prepend(msgAuto);

                            setTimeout(() => {
                                let msgAuto = document.createElement('div');
                                $(msgAuto).css('width', 'auto').css('display', 'flex').css('justify-content', 'center').css('padding', '10px 0').css('background-color', ' #eeeeee').css('margin', '5px 5px');
                                $(msgAuto).html(piada.resposta + '<br> kkkkkkkkk muito boa né!');
                                $(areaMsgAuto).prepend(msgAuto);
                                return true
                            }, 4000)
                            setTimeout(() => {
                                acao()
                            }, 8000)
                        })
                    yield ''
                }     
                    
            } else {
    
                opcao = yield '   Nosso site é responsável por facilitar a solicitação de conserto do seu dispositivo <br>(computador, celular, impressora, tablet, notbook, etc).<br>    Nele você realiza um chamado, que é uma solicitação de manutenção. Na aba <br> "abrir chamado", onde, ao preencher os campos, o chamado será arquivado <br>e o nosso técnico irá agendar a busca por esse canal assim que possível. <br>Qualquer dúvida é tirada por aqui. Atendemos a domicílio e o pagamento pode <br>ser combinado aqui mas só será realizado pessoalmente (para sua segurança). <br> <br> Digite 1 para sair.'
                    
            }
            if(opcao != '1'){
                return 'Aguarde até que um técnico entre em contato. Levará um instante.'
            }
        }
            
        let conversa = conversar() //objeto iterator
        acao();
        function acao() {
            let resposta = $('.input-conversa-bot').val();
            let interacao = conversa.next(resposta)
            $('.input-conversa-bot').val('');
            let msgAuto = document.createElement('div');
            $(msgAuto).addClass('botConversa');
            
            if(interacao.value != ''){
                $(msgAuto).html(interacao.value);
                $(areaMsgAuto).prepend(msgAuto);
            }
            if(interacao.done) {
                setTimeout(() => {
                    $('.conversa').css('height', '49.5vh');
                    $('.areaAuto').css('height', '0').css('display', 'none');
                    $('.input-enviar-bot').css('display', 'none');
                    $('.input-conversa-bot').css('display', 'none');
                    $('.input-enviar').css('display', 'block');
                    $('.input-conversa').css('display', 'block');
                }, 2000)
            }
        }
        $('.input-enviar-bot').delay(500).click(function() {
            acao();
        });
    }else{
        $('.conversa').css('height', '49.5vh');
        $('.input-enviar-bot').css('display', 'none');
        $('.input-conversa-bot').css('display', 'none');
        $('.input-enviar').css('display', 'block');
        $('.input-conversa').css('display', 'block');
    }
    $(".input-enviar").on("click", (e)=>{
        
        e.preventDefault();
        let mensagem = $('.input-conversa').val();
        let nome = $('.input-nome').val();     
        let destinatario = $('.input-destino').val();
        if(mensagem){
            let concatenaMensagem = nome+'Er32'+destinatario+'Er32'+mensagem;
            
            $.ajax({ // realiza uma requisição para o servidor
                // busca no servidor por via get
                type: 'POST', 
                // url da página que interage com o servidor
                url: '/comunicacao',
                // envia os dados que serão parametros para busca no servidor (neste caso a data)
                data: 'msg=' + concatenaMensagem, // x-ww-form-urlencoded - sintaxe usada, formato urlencoded passa quantos valores quanto necessário (&parametro=valor)
                dataType: 'text',// modifica o tipo de retorno (padrao html)
                success: dados => {
                        
                }, // mostra os dados de erro do back
                error: function ( status, error)  {
                    alert('Deu erro na recuperação dos dados');
                    console.log(arguments);
                    console.log(status);
                    console.log(error.message);
                }
            }); 
        }
        
    }); 

    $(".chat-pessoal").css('display', 'none');
    $(".input-conversa").val('');
    let cont = 1;
    
    // manda mensagem
       // chama a função ajax que recupera os dados da comunicação a cada 200 milésimos de segundo -- chat --  
    $(".nomes-chat").on("click", ()=>{
        const chamaAjax = setInterval(timeAjax, 200);
        function timeAjax(){ajax()};
        
        $(".fecha-conversa").on("click", ()=>{
            clearInterval(chamaAjax);
        });
    });

    $(".btn-chat-cliente").on("click", ()=>{
        const chamaAjax = setInterval(timeAjax, 200);
        function timeAjax(){ajax()};
        
        $(".fecha-conversa").on("click", ()=>{
            clearInterval(chamaAjax);
        });
    }); 
    

    function ajax(){
        var req = new XMLHttpRequest();
        req.onreadystatechange = function(){
            // verifica se a conexão com o bd deu certo (parte comunicação)
            if (req.readyState == 4 && req.status == 200) {
                $(".conversa").html('');
                // tratando retorno tipo texto (transformando em matriz de matriz)
                let array1 = req.responseText.split('@@@fim@@@');

                var dividindoMsg = [];
                for(let i = 0; i < array1.length; i++){
                    dividindoMsg = new Array;
                }

                for(let i = 0; i < array1.length; i++){
                    
                    for(let j = 0; j < 3 ; j++){
                        dividindoMsg[i] = array1[i].split('@@@y@@@');
                    }
                }
                if(cont == 1){
                    /*
                        0 - destino
                        1 - remetente
                        2 - mensagem
                    */
                    let  data = [], dataSeparado = [];
                    // tratando mensagem 
                    for(let i = 0; i < dividindoMsg.length; i++){
                        // modificando formato de data com split (precisa ser melhorado, fazendo isso no próprio banco de dados)
                        data[i] = dividindoMsg[i][3].split(' ');
                        //console.log(data[i][0]) // data ano mes dia
                        dataSeparado[i] = data[i][0].split('-');
                        //console.log(dataSeparado[i]); // data separada [0]ano [1]mes [2]dia
                        //console.log(data[i][1]) // horário certo 
                        if(($(".input-nome").val() == dividindoMsg[i][1]) && $(".input-destino").val() == dividindoMsg[i][0]){ // mensagem recebida
                            let div = document.createElement('SPAN'), hora = document.createElement('P'); //cria divs
                             // insere data formatada em hora
                            $(hora).html(dividindoMsg[i][1] + ' - ' + dataSeparado[i][2]+'/'+dataSeparado[i][1]+'/'+dataSeparado[i][0]+' às '+data[i][1]);
                            // configuração de css da div (necessário refinar. Por enquanto irei colocar em fila para economizar espaço)
                            $(hora).css('font-size', '14px').css('float', 'right').css('font-style', 'italic');
                            // insere remetente e mensagem dentro da div
                            $(div).html(dividindoMsg[i][2]);
                            // configuração de css da div (necessário refinar. Por enquanto irei colocar em fila para economizar espaço)
                            $(div).css('background-color', '#eeeeee').css('border-radius', '15px').css('padding', '5px 10px 5px 10px').css('margin', '5px 0px').css('float', 'left').css('text-align', 'left').css('width', 'fit-content');
                            // insere no final da tela do chat
                            $(".conversa").prepend(div);
                            $(".conversa").prepend(hora);

                        }else if(($(".input-nome").val() == dividindoMsg[i][0]) && $(".input-destino").val() == dividindoMsg[i][1]){ // mensagem enviada
                            let div = document.createElement('SPAN'), hora = document.createElement('P'); // cria divs
                            // insere data formatada em hora
                            $(hora).html(dividindoMsg[i][1] + ' - ' + dataSeparado[i][2]+'/'+dataSeparado[i][1]+'/'+dataSeparado[i][0]+' às '+data[i][1]);
                            // configuração de css da div (necessário refinar. Por enquanto irei colocar em fila para economizar espaço)
                            $(hora).css('font-size', '14px').css('float', 'right').css('font-style', 'italic').css('display', 'flex').css('justify-content', 'right');
                            // insere remetente e mensagem dentro da div
                            $(div).html(dividindoMsg[i][2]);
                            // configuração de css da div (necessário refinar. Por enquanto irei colocar em fila para economizar espaço)
                            $(div).css('background-color', '#dfdfdf').css('border-radius', '15px').css('padding', '5px 10px 5px 10px').css('margin', '5px 0px 5px auto').css('display', 'flex').css('justify-content', 'right').css('right', '0').css('width', 'fit-content');
                            // insere no final da tela do chat
                            $(".conversa").prepend(div);
                            $(".conversa").prepend(hora);
                        }
                    }
                }
            }
        }
        // recuperando dados da comunicação -- chat --
        req.open('POST', '/recuperaComunicacao', true);
        req.send();
    }
   
    // Verificação de qual aplicação será aplicada para o chat ----------------------------------------------------------------------------------------------------------------------------------
    
    // verifica se o usuário é o administrador. Caso seja, o chat exibirá todos os clientes do usuário -- chat --
    if($(".input-nome").val() == "administrador"){ // para o adm mostra todos
        console.log('adm')
        $(".btn-chat").on("click", ()=>{
            $(".btn-chat").css('display', 'none');
            $(".chat").css('display', 'block');
            $(".fecha-chat").css('display', 'block');
        });
        $(".fecha-chat").on("click", ()=>{
            $(".btn-chat").css('display', 'block');
            $(".chat").css('display', 'none');
            $(".fecha-chat").css('display', 'none');
        });

        $(".fecha-conversa").on("click", ()=>{
            $(".conversa").html('1');
            $(".input-destino").val('');
            $(".chat").removeClass('chat-aberto');
            $(".chat-pessoal").css('display', 'none');
            $(".menu-chat").css('display', 'block');
            $(".chat-clientes").css('display', 'block');
            $(".fecha-chat").css('display', 'block');
        });

        $(".nomes-chat").on("click", (e)=>{
            var nomes = $(e.target).val();
            
            $.ajax({ // realiza uma requisição para o servidor
                // busca no servidor por via get
                type: 'POST', 
                // url da página que interage com o servidor
                url: '/recuperaComunicacao',
                // envia os dados que serão parametros para busca no servidor (neste caso a data)
                data: 'chat=' + nomes, // x-ww-form-urlencoded - sintaxe usada, formato urlencoded passa quantos valores quanto necessário (&parametro=valor)
                dataType: 'text',// modifica o tipo de retorno (padrao html)
                success: dados => {
                    
                }, // mostra os dados de erro do back
                error: function ( status, error)  {
                    alert('Deu erro na recuperação dos dados');
                    console.log(arguments);
                    console.log(status);
                    console.log(error.message);
                }
            }); 
    
            $(".input-destino").val(nomes);
            $(".chat-pessoal").css('display', 'block');
            $(".chat").addClass('chat-aberto');
            $(".menu-chat").css('display', 'none');
            $(".chat-clientes").css('display', 'none');
        });

    }else { // caso seja cliente, o chat abrirá apenas para falar com o administrador ) -- chat --

        $(".btn-chat-cliente").on("click", (e)=>{
            
            var nomes = $(e.target).val();
            console.log(nomes)
            $(".btn-chat-cliente").css("display", 'none');
            $(".img-chat").css("display", 'none');
            $(".menu-chat").css('display', 'none');
            $(".chat-clientes").css('display', 'none');
            $(".chat").css('display', 'block');

            $(".input-destino").val(nomes);
            $(".chat-pessoal").css('display', 'block');
            $(".chat").addClass('chat-aberto');   
            
            // recupera a comunicação -- chat --
            $.ajax({ // realiza uma requisição para o servidor
                // busca no servidor por via get
                type: 'POST', 
                // url da página que interage com o servidor
                url: '/recuperaComunicacao',
                // envia os dados que serão parametros para busca no servidor (neste caso a data)
                data: 'chat=' + nomes, // x-ww-form-urlencoded - sintaxe usada, formato urlencoded passa quantos valores quanto necessário (&parametro=valor)
                dataType: 'text',// modifica o tipo de retorno (padrao html)
                success: dados => {
                    
                }, // mostra os dados de erro do back
                error: function ( status, error)  {
                    alert('Deu erro na recuperação dos dados');
                    console.log(arguments);
                    console.log(status);
                    console.log(error.message);
                }
            }); 
        });
        
        // botão fecha a conversa -- chat --
        $(".fecha-conversa").on("click", ()=>{
            $(".conversa").html('1');
            $(".input-destino").val('');
            $(".chat").css('display', 'none');
            $(".chat-pessoal").css('display', 'none');
            $(".btn-chat-cliente").css('display', 'block');
            $(".img-chat").css("display", 'block');
        });
    }

    // fim -- configurações dos chats --
    // inicio -- configurações de envio -- abrir chamado --
    if($('#temEndereco').html()){
        $('#complemento').blur(function(){
            
            if($('#titulo').val() != '' && $('#categoria_chamado').val() != 'Tipo de problema' && $('#descricao').val() != '' && $('#CEP').val() != '' && $('#endereco').val() != '' && $('#bairro').val() != '' && $('#cidade').val() != '' && $('#uf').val() != '' && $('#complemento').val() != ''){
                $('.btn-abrir').removeAttr('disabled');
                $('.preencher-corretamente-aviso').html('');
            }
        }); // fim -- configurações de envio -- abrir chamado --
    }else{
        $('#descricao').blur(function(){
            if($('#titulo').val() != '' && $('#categoria_chamado').val() != 'Tipo de problema' && $('#descricao').val() != ''){
                $('.btn-abrir').removeAttr('disabled');
                $('.preencher-corretamente-aviso').html('');
            }
        })
    }$('.preencher-corretamente-aviso').html('Para liberar o botão, preencha os campos.');

    // inicio -- menu burguer -- 
    $('.menu-hamburguer').on('click', function(){
        $('.menu-content').css('right', '0');
        $('.menu-content').css('transition', 'right 0.5s');
        $('.menu-hamburguer').css('right', '-3vw');
        $('.menu-hamburguer-fechar').css('right', '1vw');
        $('.menu-hamburguer').css('transition', 'right 0.3s');
        $('.menu-hamburguer-fechar').css('transition', 'right 0.3s');
    });
    $('.menu-hamburguer-fechar').on('click', function(){
        $('.menu-content').css('right', '-300px');
        $('.menu-content').css('transition', 'right 0.5s');
        $('.menu-hamburguer').css('right', '1vw');
        $('.menu-hamburguer-fechar').css('right', '-3vw');
        $('.menu-hamburguer-fechar').css('transition', 'right 0.3s');
        $('.menu-hamburguer').css('transition', 'right 0.3s');
    });

    // limpa campo após enviar mensagem

    $('.input-enviar').on('click', function(){
        $('.input-conversa').delay(500).val('');
    });
    $('.input-conversa').keypress(function(event){
        if ( event.value == 13 ) {
            $('.input-conversa').delay(500).val('');
         }
    });
});

// inicio -- endereço do cliente -- abrir-chamado -------------------------------------------------------------------------------------------------------
function getDadosEnderecoPorCEP(cep) {
    let url = 'https://viacep.com.br/ws/'+cep+'/json/'
    let xmlHttp = new XMLHttpRequest()
    xmlHttp.open('GET', url)
    xmlHttp.onreadystatechange = () => {
        if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            let dadosJSONText = xmlHttp.responseText
            let dadosJSONObj = JSON.parse(dadosJSONText)
            document.getElementById('endereco').value = dadosJSONObj.logradouro
            document.getElementById('bairro').value = dadosJSONObj.bairro
            document.getElementById('cidade').value = dadosJSONObj.localidade
            document.getElementById('uf').value = dadosJSONObj.uf            
        }
    }

    xmlHttp.send()
}
// fim -- endereço do cliente --

