$(document).ready(function () {
    $('.dropdown-trigger').dropdown({
    constrainWidth: false,
    coverTrigger: false
    });
    $('select').formSelect();
    $('.carousel.carousel-slider').carousel({
    fullWidth: true,
    indicators: true,
    duration: 200
    });
    $('.modal').modal();
});