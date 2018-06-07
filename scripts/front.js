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

//Activate and deactivate modals
$(document).on('click', '.grid-item', function () {
    $('#modal').addClass('is-active');
});

$('#modal-close').on('click', function() {
    $('#modal').removeClass('is-active');
 }); 

function createPanelHead (icon, title){
    //argument icon is a string containing icon html
    //title is a string containing the title text

    //create structure using bulma level class
    var header = document.createElement('div');
        header.classList.add('level');
    var left = document.createElement('div');
        left.classList.add('level-left');

    //create icon and append classes
    var iconElem = document.createElement('span');
        iconElem.classList.add('icon');
        iconElem.classList.add('is-medium');
        iconElem.innerHTML = icon;
    
    //create title element and append classes
    var titleElem = document.createElement('h2');
        titleElem.classList.add('title');
        titleElem.classList.add('is-4');
        titleElem.appendChild(document.createTextNode(title));

    //append content elements to structure elements
    left.append(iconElem);
    left.append(titleElem);
    header.append(left);

    //return completed header object
    return header;
}

//Calendar

function addCalendar () {
    //create the .box panel element
    var elem = document.createElement('div');
        elem.classList.add('grid-item');
        elem.classList.add('grid-item--width5');
        elem.classList.add('box');

    //create the head of the panel
    var head = createPanelHead('<i class="far fa-calendar-alt fa-3x"></i>', 'Calendar');

    //create a body element
    var body = document.createElement('div');
        body.classList.add('columns');

    //creates 5 day elements containing a table to add content to
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    for (i=0; i<5; i++){
        var day = document.createElement('div');
            day.classList.add('column');
            day.classList.add('calendar-column');
            day.classList.add('corners-rounded');
            day.classList.add('has-background-grey-lighter');
        var table = document.createElement('table');
            table.classList.add('table');
            table.classList.add('is-fullwidth');
            table.classList.add('corners-rounded');
        var thead = document.createElement('thead');
        var tbody = document.createElement('tbody');
        var row1 = document.createElement('tr');
            //innerHTML needs to be canged to reflect the day and date
            row1.innerHTML = `<th><span>Date</span> <span>Day</span></th>`;
        var row2 = document.createElement('tr');
            row2.innerHTML = '<td class="table-cell--height1"></td>';
        var row3 = document.createElement('tr');
            row3.innerHTML = '<td class="table-cell--height1"></td>';
        
        //append elements put humpty dumpty together again
        thead.append(row1);
        tbody.append(row2);
        tbody.append(row3);
        table.append(thead);
        table.append(tbody);
        day.append(table);
        //append day element to body
        body.append(day);
    }

    
    elem.append(head);
    elem.append(body);
    return elem;
}

//append to the dashboard
var toAppend = [];
toAppend.push(addCalendar());
$grid.append(toAppend).masonry('appended', toAppend);

