//Jquery refrence to static elements
var $dash = $('#dash');
var $aside = $('#aside');
var $nav = $('#nav');

//initialize masonry
var $grid = $('.grid').masonry({
    itemSelector: '.grid-item',
    columnWidth:'.grid-sizer', 
    percentPosition: true
});

//dropdown function 
$('.dropdown').on('click', function () {
    if($(this).hasClass('is-active')){
        $(this).removeClass('is-active');
    }else{
        $(this).addClass('is-active');
    }
});

//developer function to generate random elements
function createElement() {
    var type = Math.floor(Math.random() * 4);
    var elem = document.createElement('div')
        elem.classList.add('grid-item');
        elem.classList.add('box');
        
    if (type === 0) {
        elem.classList.add('grid-item--width2');
        elem.append('<h3 class="title">Cat ipsum dolor</h3>');
        elem.append('<p>Stare at ceiling cough furball a nice warm laptop for me to sit on </p>');
    }else if (type === 1){
        elem.classList.add('grid-item--width3');
        elem.append('<h3>Cat ipsum dolor</h3>');
        elem.append('<p>Sleep in the bathroom sink peer out window, chatter at birds, lure them to mouth. Jump off balcony, onto strangers head sit in window and stare oooh, a bird, yum and be a nyan cat, feel great about it, be annoying 24/7 poop rainbows in litter box all day so with tail </p>');
    }else if (type === 3){
        elem.classList.add('grid-item--width-full');
        elem.append('<h3>Cat ipsum dolor</h3>');
        elem.append('<p>Ooh, are those your $250 dollar sandals? lemme use that as my litter box claw drapes, for sit on the laptop plays league of legends hiss and stare at nothing then run suddenly away but paw at your fat belly, being gorgeous with belly side up. Instantly break out into full speed gallop across the house for no reason. Cat slap dog in face find empty spot in cupboard and sleep all day, dont wait for the storm to pass, dance in the rain, kitty power for sit on human they not getting up ever yet hide from vacuum cleaner. </p> ');
    }
    return elem;
}

//developer function to append num of elements to .grid
function generate(num){
    var arr = [];
    for (var i=0; i<num; i++){ 
        arr.push(createElement());
    }
    var $arr = $(arr);
    console.log(arr); 
    $grid.append(arr).masonry('appended', arr);
}


generate(10);