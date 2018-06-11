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

//returns an object with the current date data
function getNow () {
    var now = moment().format('MMMM, D, Do, dddd, YYYY');
    var arr = now.split(',');
    var temp = {
        month: arr[0],
        day: arr[1],
        dayOrdered: arr[2],
        dow: arr[3],
        year: arr[4]
    }

    return temp;
}

//dropdown toggle
$(document).on('click', '.dropdown', function () {
    if ($(this).hasClass('is-active')){
        $(this).removeClass('is-active');
    }else{
        $(this).addClass('is-active');
    }
});

//Activates Modal and appends content 
$(document).on('click', '.fa-arrows-alt-h', function () {

    $('#modal').addClass('is-active');

    var panelName = this.getAttribute('data-panel');
    console.log('panelName: ', panelName);

    //if statement that appends modal content depending on the panel clicked on
    switch (panelName) {
        case "Daily":
            createModal('Daily Report', dailyModal());
            
            //Daily modal dropdown listener
            $('#unitsDrop').find('.dropdown-item').on('click', function () {
                console.log('clicked');
                var option = $(this).attr('data-option')
                console.log(option);
                if(option === '0') {
                    $('#unitsDrop > .dropdown-trigger').find($('span')).text('Reps');
                    $('#unitsDrop').attr('data-selected', 0);
                    console.log('Reps was selected')
                }else{
                    $('#unitsDrop > .dropdown-trigger').find($('span')).text('Minutes');
                    console.log('Minutes was selected');
                    $('#unitsDrop').attr('data-selected', 1);
                }
            });

            //Grab data append and update database
            $('#add-activity').on('click', function () {
                $('#activityForm').find('.help').remove();

                var newItem = $('<tr>');

                var activity = $('<td>').text($('#newActivity').val().trim());

                var duration = $('<td>');

                var close = $('<td>').append('<i class="fas fa-times"></i>');

                var units = $('#unitsDrop').attr('data-selected');

                if (units === '0') {
                    duration.text($('#newDuration').val().trim() + ' Reps');
                }else if(units === '1') {
                    duration.text($('#newDuration').val().trim() + ' Mins');
                }else{
                    return $('#activityForm').append('<p class="help is-danger">Please select a unit</p>');
                }

                newItem
                    .append(activity)
                    .append(duration)
                    .append(close);

                console.log(newItem);

                $('#itemsList').append(newItem);
            });

            $(document).on('click', '.fa-times', function () {
                console.log('clicked');
                $(this).parent().parent().remove();
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
function createPanelHead (icon, title, expand){
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

    //append content elements to structure 
    left.append(iconElem);
    left.append(titleElem);
    header.append(left);

    if (expand === true){
        var right = document.createElement('div');
        right.classList.add('level-right');
        right.innerHTML = '<i class="fas fa-arrows-alt-h" data-fa-transform="rotate--45" data-panel='+ title +'></i>';
        header.append(right);
    }   

    //return completed header object
    return header;
}

//Creates the contents of the modal
function createModal (panel, callback) {
    console.log('this element is ', panel);
    
    var head = createPanelHead('<i class="far fa-calendar-alt fa-3x"></i>', panel, false);
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
        var level2 = $('<div>').addClass('level')
        var container = $('<div>').addClass('level-item').css('width', '800px');
        container.append(callback);
        level2.append(container)
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

//returns a dropdown element, 
function generateDropdown (label, itemsArr) {
    //label is a string that contains the name of the dropdown
    //itemsArr is an array of strings with the items you want to include in the dropdown
    //each item will have a data attribute data-option="[number]" indicating the index of the element in the array
    //the returned dropdown will have an id of [label]Drop
    var contentId = label + 'Menu';
    var dropdownId = label + 'Drop'
    console.log(dropdownId);

    //dropdown button
    var dropdown = $('<div>').addClass('dropdown').attr('id', dropdownId).attr('data-selected', '-1');
    var trigger = $('<div>').addClass('dropdown-trigger');
    var button = $('<div>').addClass('button').attr('aria-haspopup', 'true').attr('aria-controls', contentId);
    var label = $('<span>').text(label);
    var arrow = $('<div>').addClass('icon is-small')
        .append($('<i>').addClass('fas fa-angle-down').attr('aria-hidden', 'true'));
    
    //dropdown content
    var menu = $('<div>').addClass('dropdown-menu').attr('id', contentId).attr('role', 'menu');
    var content = $('<div>').addClass('dropdown-content');

    //dropdown items
    for (var i=0; i<itemsArr.length; i++) {
        var item = $('<p>').addClass('dropdown-item').attr('data-option', i);
            item.text(itemsArr[i]);
        content.append(item);
    }

    menu.append(content);

    button
        .append(label)
        .append(arrow);
    
    trigger.append(button);

    dropdown
        .append(trigger)
        .append(menu);

    return dropdown;

}

//Daily Report
function addDaily () {
    var now = getNow();
    var elem = document.createElement('div');
        elem.classList.add('grid-item');
        elem.classList.add('grid-item--width2');
        elem.classList.add('box');
        elem.setAttribute('id', 'daily');

    var head = createPanelHead('<i class="far fa-calendar fa-3x"></i>', 'Daily Report', true);
    var body = document.createElement('div');
    
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
        row1.innerHTML = `<th><span>${now.month} ${now.dayOrdered}</span>, <span>${now.dow}</span></th>`;
    var row2 = document.createElement('tr');       
    var goals = document.createElement('td');
        goals.classList.add('table-cell--height2')   ;
        goals.setAttribute('id', 'goals');    
      
    row2.append(goals);
    
    //append elements put humpty dumpty together again
    thead.append(row1);
    tbody.append(row2);

    table.append(thead);
    table.append(tbody);
    day.append(table);
    body.append(day);
    //append day element to body
    elem.append(head);
    elem.append(body);

    ///database call to user to grab any data for today placeholders are used for now
    var todos = ['calories', 'go for a run', 'weight lifting'];
    todos.forEach(function (todo) {
        var item = document.createElement('div');
        var label = document.createElement('label');
            label.classList.add('checkbox');
        var checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
       
        label.append(checkbox);  
        label.append(document.createTextNode(' ' + todo));


        item.append(label);
        goals.append(item);
    });
    

    return elem;
}

function dailyModal () {
    //display the users inputted elements and allow the user to delete any elements
    var container = $('<div>').css('width', '70%');
    //INSERT table that displays today's inputted elements
    //the user should be able to click a delete button to delete a tr
    //new items should be appended to the table element
    var todayTitle = $('<h3>').addClass('subtitle is-5').text('Activity log');
    var todayItems = $('<table>').addClass('table is-fullwidth');
    var thead = $('<thead>');
    var theadRow = $('<tr>');
    var tbody = $('<tbody>').attr('id', 'itemsList');
    
    var field = $('<div>')
        .addClass('field has-addons')
        .attr('id', 'activityForm');

    var activity = $('<p>')
        .addClass('control is-expanded');

    var activityInput = $('<input>')
        .addClass('input')
        .attr('type', 'text')
        .attr('placeholder', 'Add a new activity')
        .attr('id', 'newActivity');

    var quantity = $('<p>')
        .addClass('control');

    var quantityInput = $('<input>')
        .addClass('input') 
        .attr('type', 'text')
        .attr('placeholder', 'How many/long')
        .attr('id', 'newDuration');

    var unit = $('<p>')
        .addClass('control');

    var unitDropdown = generateDropdown('units', ['Reps', 'Minutes']);

    var submit = $('<p>')
        .addClass('control');

    var submitBtn = $('<div>')
        .addClass('button is-primary')
        .attr('id', 'add-activity')
        .text('Add'); 

    theadRow
        .append('<th>Activity</th>')
        .append('<th>Reps/Duration</th>')
        .append('<th></th>');
    
    thead.append(theadRow);

    todayItems
        .append(thead)
        .append(tbody);
    
    activity.append(activityInput);

    quantity.append(quantityInput);
    
    unit.append(unitDropdown);

    submit.append(submitBtn);

    
    field
        .append(activity)
        .append(quantity)
        .append(unit)
        .append(submit);

    container
        .append(todayTitle)
        .append(todayItems)
        .append(field);

    return container;
}


//appends Panels to the dashboard
var toAppend = [];
toAppend.push(addDaily());
$grid.append(toAppend).masonry('appended', toAppend);

/*
DEPRECATED
    Calendar Panel
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
*/