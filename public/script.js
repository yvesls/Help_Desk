
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
                        $('.clienteAtual').prepend('<div class="pt-5 d-flex peloNome align-content-center justify-content-center position-relative animate__animated animate__fadeIn animate_duracao"><h2>Este cliente não possui pedidos.</h2></h2></div>')
                    }

                    dados.forEach(element => {
                        $('.clienteAtual').prepend('<div class="card mb-3 bg-light peloNome position-relative animate__animated animate__fadeIn animate_duracao"><div class="card-body"><div class="float-left pt-0 mt-0 position-relative"><h5 class="card-title">'+ element.titulo +'</h5><h5 class="card-subtitle mb-2 text-muted">'+ element.categoria +'</h6><p class="card-text">'+ element.descricao +'</p></div></div></div>');
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
                            $('.categoriaAtual').prepend('<div class="pt-5 d-flex pelaCategoria align-content-center justify-content-center position-relative animate__animated animate__fadeIn animate_duracao"><h2>Esta categoria não possui pedidos.</h2></h2></div>')
                    }

                    dados.forEach(element => {
                        $('.categoriaAtual').prepend('<div class="card mb-3 bg-light pelaCategoria  position-relative animate__animated animate__fadeIn animate_duracao"><div class="card-body"><p class="card-subtitle font-italic float-right position-relative p-0 m-0 relative-name-adm">' + element.nome + '</p><div class="float-left pt-0 mt-0 position-relative relative-card-adm col-12"><h5 class="card-title">'+ element.titulo +'</h5><h5 class="card-subtitle mb-2 text-muted">'+ element.categoria +'</h6><p class="card-text">'+ element.descricao +'</p></div></div></div>');
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

});