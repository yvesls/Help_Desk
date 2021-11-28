
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



});