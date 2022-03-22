
$(document).ready(() => {

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

    $('.clienteAtual').css('display', 'none'); // esconde a aba do cliente atual
    $('.categoriaAtual').css('display', 'none');

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
                        $('.clienteAtual').prepend('<div class="card mb-3 bg-light peloNome position-relative animate__animated animate__fadeIn animate_duracao"><div class="card-body"><div class="float-left pt-0 mt-0 position-relative"><h5 class="card-title">'+ element.titulo +'</h5><h5 class="card-subtitle mb-2 text-muted">'+ element.categoria +'</h6><p class="card-text">'+ element.descricao +'</p><form><div class="form-check m-0 p-0"><label class="status-font" for="status">Marcar como concluído:</label><br><span><button type="button" value="realizado'+element.id+'" name="status" class="status btn btn-info btn-sm">confirmar</button><small class="font-italic float-right text-dark mr-0 pr-0">'+element.data_mod+'</small></span></div></form></div></div></div>');
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

    $(".input-enviar").on("click", (e)=>{
        e.preventDefault();
        let mensagem = $('.input-conversa').val();
        let nome = $('.input-nome').val();
        let destinatario = $('.input-destino').val();
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
        
        $(".input-conversa").val('');
    });

    $(".chat-pessoal").css('display', 'none');

    let cont = 1;
    // manda mensagem
    function ajax(){
        var req = new XMLHttpRequest();
        req.onreadystatechange = function(){
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

                    for(let i = 0; i < dividindoMsg.length; i++){
                        if(($(".input-nome").val() == dividindoMsg[i][1]) && $(".input-destino").val() == dividindoMsg[i][0]){
                            let div = document.createElement('SPAN');
                            $(div).html(dividindoMsg[i][1]+': '+dividindoMsg[i][2]);
                            $(div).css('background-color', '#eeeeee');
                            $(div).css('border-radius', '15px');
                            $(div).css('padding', '5px 10px 5px 10px');
                            $(div).css('margin', '5px 0px');
                            $(div).css('float', 'left');
                            $(div).css('text-align', 'left');
                            $(div).css('width', 'fit-content');
                            $(".conversa").prepend(div);
                        }else if(($(".input-nome").val() == dividindoMsg[i][0]) && $(".input-destino").val() == dividindoMsg[i][1]){
                            let div = document.createElement('SPAN');
                            $(div).html(dividindoMsg[i][1]+': '+dividindoMsg[i][2]);
                            $(div).css('background-color', '#dfdfdf');
                            $(div).css('border-radius', '15px');
                            $(div).css('padding', '5px 10px 5px 10px');
                            $(div).css('margin', '5px 0px 5px auto');
                            $(div).css('display', 'flex');
                            $(div).css('justify-content', 'right');
                            $(div).css('right', '0');
                            $(div).css('width', 'fit-content');
                            $(".conversa").prepend(div);
                        }
                    }
                }
            }
        }
        req.open('POST', '/recuperaComunicacao', true);
        req.send();
    }
   

    setInterval(function(){ajax();}, 100);

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

    }else {
        console.log('clientes')

        $(".btn-chat-cliente").on("click", (e)=>{
            
            var nomes = $(e.target).val();
            console.log(nomes)
            $(".btn-chat-cliente").css("display", 'none');
            $(".menu-chat").css('display', 'none');
            $(".chat-clientes").css('display', 'none');
            $(".chat").css('display', 'block');

            $(".input-destino").val(nomes);
            $(".chat-pessoal").css('display', 'block');
            $(".chat").addClass('chat-aberto');   
            
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
        
        $(".fecha-conversa").on("click", ()=>{
            $(".conversa").html('1');
            $(".input-destino").val('');
            $(".chat").css('display', 'none');
            $(".chat-pessoal").css('display', 'none');
            $(".btn-chat-cliente").css('display', 'block');
        });
    }

    
    
    
});

window.sr = ScrollReveal({reset: true});

sr.reveal('.scrollRevela', {
    duration: 500,
    rotate: {x:0, y:80, z:0}
});