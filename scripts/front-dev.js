//This file is for functions that are only to be used for development phase
//do not add in production

//developer function to generate random elements
function createElement() {
    var width = Math.floor(Math.random() * 4);
    var height = Math.floor(Math.random() * 4);
    var elem = document.createElement('div')
        elem.classList.add('grid-item');
        elem.classList.add('grid-item--width1');
        elem.classList.add('box');
        elem.classList.add('container');

    var header = document.createElement('div');
        header.classList.add('level');


    var icon = document.createElement('i');
        icon.classList.add('icon');
        icon.classList.add('is-large');
        icon.classList.add('level-item');

    var left = document.createElement('div');
        left.classList.add('level-left');
        left.append(icon);

    var titleText = document.createTextNode('Title');
    
    var title = document.createElement('h3');
        title.classList.add('title');
        title.classList.add('is-5');
        title.classList.add('level-item');
        title.appendChild(titleText);

    var right = document.createElement('div');
        right.classList.add('level-right');
        right.append(title);

    var textContent = document.createTextNode('Curl up and sleep on the freshly laundered towels knock over christmas tree.');
    var text = document.createElement('p');
        text.appendChild(textContent);
        
    header.append(left);
    header.append(right);
    elem.append(header);
    elem.append(text);
   
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