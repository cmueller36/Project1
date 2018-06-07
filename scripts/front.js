//Jquery refrence to static elements
var $dash = $('#dash');
var $aside = $('#aside');
var $nav = $('#nav');

//initialize masonry
var $grid = $('.grid').masonry({
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true,
    gutter: 20
});

//dropdown function 
$('.dropdown').on('click', function () {
    if($(this).hasClass('is-active')){
        $(this).removeClass('is-active');
    }else{
        $(this).addClass('is-active');
    }
});