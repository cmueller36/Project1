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

//Activates Modal and appends content 
$(document).on('click', '.grid-item', function () {

    $('#modal').addClass('is-active');

    var panelName = this.getAttribute('id');

    //if statement that appends modal content depending on the panel clicked on
    switch (panelName) {
        case "calendar":
            //calendar specific code here
            createModal(panelName, function () {
                /*
                    The user should be able to add a workout to their calendar
                    The workout should be appended to the appropriate calendar day
                    When the workout is checked off it should move to the completed section of the calendar

                    each input element should contained in a control container
                    all controls should be contained within the field container
                    each field can contain a label, a control, and a help text
                */
               var container = $('<div>').addClass('level-item has-background-grey-lighter');
               var field = $('<div>').addClass('field');
               var activity = $('<div>').addClass('control');
               var activitiesLabel = $('<label>')
                    .addClass('label')
                    .text('Add Activity: ');
               var input = $('<input>').addClass('input').attr('type', 'text');
               var submit = $('<div>').addClass('control');
               var submitBtn = $('<div>')
                    .addClass('button is-primary')
                    .attr('id', 'add-activity')
                    .text('Add'); 
               activity
                    .append(activitiesLabel)
                    .append(input);

                submit.append(submitBtn);
                
                container
                    .append(activity)
                    .append(submit);

                return container;
            });
            break;
    }
});

//Deactivates Modal
$('#modal-close').on('click', function() {
    $('#modal').removeClass('is-active');
    $('#modalDiv').empty();
}); 

 //Creates a header element with an icon and a title
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

//Returns an iframe element to be inserted into the modal
function generateIframe (url) {
    var iframe = $('<iframe>')
    .addClass('iframe-size corners-rounded has-background-grey-lighter')
    .attr('id', 'userData')
    .attr('width', '800')
    .attr('height', '600')
    .attr('src', url)
    .attr('frameborder', '0')
    .attr('allowFullscreen', 'true');
    return iframe;
}

//Creates the contents of the modal
function createModal (panel, callback) {
    console.log('this element is ', panel);
    
    var head = createPanelHead('<i class="far fa-calendar-alt fa-3x"></i>', 'Calendar');
    var title1 = $('<h3>')
        .addClass('title is-5')
        .text("My Data Summary");
    
    var level1 = $('<div>').addClass('level');
    var itemA = $('<div>').addClass('level-item');
    var iframe = generateIframe('https://app.powerbi.com/view?r=eyJrIjoiZWEzZmU0ODQtZTYyNS00MGExLWI3NmItMDhmYmE3NDBjYzg5IiwidCI6ImUyYzc3ZjUwLTYyYzUtNDkxYy1iY2Q2LWIyYzBkOTU1YTU4OSIsImMiOjN9')
            
    
    itemA.append(iframe);
    level1.append(itemA);

    if(arguments[1]){
        var title2 = $('<h3>')
            .addClass('title is-5')
            .text('Add Data');
        var level2 = $('<div>').addClass('level');
        level2.append(callback);
    }else{
        console.log('nothing to append');
    }

    $('#modalDiv')
        .append(head)
        .append(title1)
        .append(level1)
        .append(title2)
        .append(level2);
}
//Calendar Panel
function addCalendar () {
    //create the .box panel element
    var elem = document.createElement('div');
        elem.classList.add('grid-item');
        elem.classList.add('grid-item--width5');
        elem.classList.add('box');
        elem.setAttribute('id', 'calendar');
        

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
            row1.setAttribute('data-day', i);
            //innerHTML needs to be canged to reflect the day and date
            row1.innerHTML = `<th><span>Date</span> <span>Day</span></th>`;
        var row2 = document.createElement('tr');
            row2.setAttribute('data-day', i);
        var goals = document.createElement('td');
            goals.classList.add('table-cell--height1')
            goals.setAttribute('id', 'goal' + i);
        var row3 = document.createElement('tr');
            row3.setAttribute('data-day', i);
        var completed = document.createElement('td');
            completed.setAttribute('id', 'completed' + i);
            completed.classList.add('table-cell--height1');
            
        row2.append(goals);
        row3.append(completed);
        
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



//appends Panels to the dashboard
var toAppend = [];
toAppend.push(addCalendar());
$grid.append(toAppend).masonry('appended', toAppend);

