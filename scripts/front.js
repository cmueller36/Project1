
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

        moment: moment(),
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
            var head = createPanelHead('<img class="image is-64x64" src="assets/panel-icons/schedule.svg" alt="schedule-icon">', 'Daily Report', false);
            var level1 = $('<div>').addClass('level');
            var level2 = $('<div>').addClass('level');
            var iframe = generateIframe('https://app.powerbi.com/view?r=eyJrIjoiZWEzZmU0ODQtZTYyNS00MGExLWI3NmItMDhmYmE3NDBjYzg5IiwidCI6ImUyYzc3ZjUwLTYyYzUtNDkxYy1iY2Q2LWIyYzBkOTU1YTU4OSIsImMiOjN9')
            var itemA = $('<div>').addClass('level-item');
            var itemB = $('<div>').addClass('level-item');

            itemA.append(iframe);
            itemB.append(dailyModal());

            level1.append(itemA);
            level2.append(itemB)

            $('#modalDiv')
                .append(head)
                .append(level1)
                .append(level2);
            
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
                event.preventDefault();
                $('#activityForm').find('.help').remove();

                var newItem = $('<tr>');

                var activity = $('<td>').text($('#newActivity').val().trim());

                var duration = $('<td>');

                var close = $('<td>').append('<i class="fas fa-times"></i>');

                var units = $('#unitsDrop').attr('data-selected');

                var fbUnits = "";

                if (units === '0') {
                    duration.text($('#newDuration').val().trim() + ' Reps');
                    fbUnits = "Reps";
                }else if(units === '1') {
                    duration.text($('#newDuration').val().trim() + ' Mins');
                    fbUnits = "Mins";
                }else{
                    return $('#activityForm').append('<p class="help is-danger">Please select a unit</p>');
                }

                newItem
                    .append(activity)
                    .append(duration)
                    .append(close);

                $('#itemsList').append(newItem);

                //collect items for Firebase
                var fbActivity = $("#newActivity").val().trim();
                var fbDuration = $("#newDuration").val().trim();

                console.log(fbActivity);
                console.log(fbDuration);
                console.log(fbUnits);

                //store items in temp in JSON
                temp = {
                    User: currentUid,
                    Activity: fbActivity,
                    Duration: fbDuration+" "+fbUnits
                }
        
                //send items to firebase
                database.ref(currentUid+"/activty").push(temp);
            });

            $(document).on('click', '.fa-times', function () {
                console.log('clicked');
                $(this).parent().parent().remove();
            });
            break;
        case "Weather":
            var head = createPanelHead('<img class="image is-64x64" src="assets/weather-icons/sun.svg" alt="weather">', 'Weather', false);

            var body = weatherModal();

            $('#modalDiv')
                .append(head)
                .append(body);
            
            break;
        case "pedometer":
            var head = createPanelHead('<img class="image" src="assets/panel-icons/feel-free.svg" alt="dummy">', 'Pedometer', false);
            var iframe = generateIframe('https://app.powerbi.com/view?r=eyJrIjoiZWEzZmU0ODQtZTYyNS00MGExLWI3NmItMDhmYmE3NDBjYzg5IiwidCI6ImUyYzc3ZjUwLTYyYzUtNDkxYy1iY2Q2LWIyYzBkOTU1YTU4OSIsImMiOjN9')
            var title1 = $('<h3>').addClass('title is-4').text('Week View');
            var title2 = $('<h3>').addClass('title is-4').text('Trends');
            //get dates for this week
            //call to user database, get pedometer steps for the week
            
            
            function getDates (day) {
                //returns an array of all the dates in the current week
               var dateArr = [];
               if(day !== 0){
                   date = moment().add(day-1, 'days').format('MMMM Do');
                   dateArr.push(date);
                   day--;
                   return getDates(day);
               }else if(dateArr.length !== 7) {
                   var remaining = 7 - dateArr.length;
                   var remainingArr = [];
                    for (var i=0; i < remaining; i++) {
                        date = moment().add(i + 1, 'days').format('MMMM Do');
                        remainingArr.push(date);
                    }
                    dateArr = dateArr.concat(remainingArr);
               }else if(day === 0) {
                   for (var i=0; i<7; i++) {
                    date = moment().add(i, 'days').format('MMMM Do');
                    dateArr.push(date);
                   }
               }
               return dateArr;
            }
            var level = $('<div>').addClass('level');
                
                iframe.addClass('level-item');
                level.append(iframe);
            
            $('#modalDiv')
                .append(head)
                .append(title1)
                .append(pedometerModal(getDates(moment().format('d'))))
                .append(title2)
                .append(level);
            break;
        case 'Meals':
            var head = createPanelHead('<img class="image" src="assets/panel-icons/feel-free.svg" alt="dummy">', 'Meals', false);
            
            $('#modalDiv')
                .append(head)
                .append(mealsModal());
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
function createModal (panel, callback, icon) {
    console.log('this element is ', panel);
    
    var head = createPanelHead(icon, panel, false);
            
    
    level1.append(itemA);

    if(arguments[1]){
        var title2 = $('<h3>')
            .addClass('title is-5')
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

    var head = createPanelHead('<img class="image is-64x64" src="assets/panel-icons/schedule.svg" alt="schedule-icon">', 'Daily Report', true);
    
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

//creates daily report modal
function dailyModal () {
    //display the users inputted elements and allow the user to delete any elements
    var container = $('<div>');
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

//creates daily weather card
function addWeather () {
    var elem = document.createElement('div');
        elem.classList.add('grid-item');
        elem.classList.add('grid-item--width1');
        elem.classList.add('box');
        elem.setAttribute('id', 'daily');

    var head = createPanelHead('<img class="image is-48x48" src="assets/weather-icons/sun.svg" alt="sunny-icon">', 'Weather', true);

    var level1 = document.createElement('div');
        level1.classList.add('level');

    var level2 = document.createElement('div');
        level2.classList.add('level');
    

    var iconDiv = document.createElement('div');
        iconDiv.classList.add('level-item');

    var icon = document.createElement('div');
        icon.classList.add('image');
        icon.classList.add('is-96x96');
        icon.setAttribute('id', 'weather-icon');
    
    var forecast = document.createElement('p');
        forecast.classList.add('level-right');
        forecast.setAttribute('id', 'forecast');

    var tempDiv = document.createElement('div');
        tempDiv.classList.add('level-left');

    var temp = document.createElement('h3');
        temp.classList.add('subtitle');
        temp.classList.add('is-4')
        temp.setAttribute('id', 'temp');


    tempDiv.append(temp);
    iconDiv.append(icon);
    
    level1.append(iconDiv);
    level2.append(tempDiv);
    level2.append(forecast);
    

    elem.append(head);
    elem.append(level1);
    elem.append(level2);
  

    return elem;
}

//creates 5 day forecast modal
function weatherModal () {
    var elem = $('<div>');

    var level0 = $('<div>').addClass('level');

    for(var i=0; i<5; i++){

        var date = moment().add(i, 'days').format('dddd, MMMM Do');

        var level1 = $('<div>').addClass('level');

        var level2 = $('<div>').addClass('level');

        var item = $('<div>').addClass('card-weather corners-rounded has-background-grey-lighter');

        var head = $('<h3>').addClass('subtitle is-5 card-title-weather');
            head.text(date);
        var iconDiv = $('<div>').addClass('level-item');

        var icon = $('<div>').html(weatherData[i].icon)
            icon.addClass('image is-96x96');

        var temp = $('<h3>').addClass('item-left subtitle is-5').css('width', '50px');
            temp.text(weatherData[i].temp + String.fromCharCode(176) + 'F');

        var forecastDiv = $('<div>').addClass('level').css('width', '125px').css('height', '50px');

        var forecast = $('<p>').addClass('item-right has-text-centered');
            forecast.text(weatherData[i].forecast);

        forecastDiv.append(forecast);
        iconDiv.append(icon);
        level1.append(iconDiv);
        
        level2
            .append(temp)
            .append(forecastDiv);

        item
            .append(head)
            .append(level1)
            .append(level2);

        level0.append(item);
    }

    elem
        .append(level0)
        
    return elem;
}

//DEV FUNCTION DELETE FOR PRODUCTION 
function dummyCard () {
    var elem = document.createElement('div');
        elem.classList.add('grid-item');
        elem.classList.add('grid-item--width1');
        elem.classList.add('box');
        elem.setAttribute('id', 'dummy');

    var head = createPanelHead('<img class="image" src="assets/panel-icons/feel-free.svg" alt="dummy">', 'Meals', true);

    elem.append(head);

    return elem;
}


function pedometerModal (dateArr) {
    var week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var now = getNow();
    var level = $('<div>').addClass('level');
    for (var i=0; i<7; i++){

        var item = $('<div>')
            .addClass('level-item corners-rounded has-background-grey-lighter')
            .css('margin', '5px')
            .css('padding', '10px');

        
        var table = $('<table>').addClass('table is-fullwidth corners-rounded');
        var thead = $('<thead>');
        var tbody = $('<tbody>')
        var row1 = $('<tr>');
        var row2 = $('<tr>');
        var th = $('<th>');
        var td1 = $('<td>')
            .addClass('has-text-centered');
        var td2 = $('<td>').append('<p>steps</p>');

        var date = $('<p>').append(week[i] + ',<br>' + dateArr[i]);
        th.append(date);
        
        var steps = $('<h3>').addClass('subtitle is-3')
            .html('10,245');
        td1
            .append(steps)
            .append('<p>steps</p>');

        row1.append(th);
        row2.append(td1);

        thead.append(row1);
        tbody.append(row2);
        
        table
            .append(thead)
            .append(tbody);
        
        item.append(table);

        level.append(item);
    }

    return level;
}


function addMeals() {
    var elem = document.createElement("div");
        elem.classList.add('grid-item');
        elem.classList.add('grid-item--width5');
        elem.classList.add('box');
    
    var head = createPanelHead('<img class="image is-48x48" src="assets/panel-icons/healthy-nutrition.svg" alt="sunny-icon">', 'Meals', true);
    
    var body = document.createElement('div');

    //grouped inputs need the field class
    var field = document.createElement('div');
        field.classList.add('field');
        field.classList.add('has-addons'); //has addons makes the submit button attached to the input

    //to format alignment, every input needs the control class
    var inputControl = document.createElement('div');
        inputControl.classList.add('control');
        inputControl.classList.add('is-expanded');

    var btnControl = document.createElement('div');
        btnControl.classList.add('control');

    //make a button with text
    var btn = document.createElement('button');
        btn.classList.add('button');
        btn.classList.add('is-primary');
        btn.innerText = 'Search Meals';
    
    //when creating a form the tag has to be an input tag
    //the input tag needs the type attribute to be specified is it radio? checkbox? text? ect
    //the placeholder attribute allows us to set placeholder text that is deleted when the user inputs text
    //we add the bulma class input to format the style of the input
    var search = document.createElement('input');
        search.setAttribute('type', 'text');
        search.setAttribute('placeholder', 'Search Recipes');
        search.classList.add('input');
        search.classList.add('is-primary');
 
        //now the elements are appended together 
        /*
            <div class="field">
                <div class="control">
                    <input class="input" type="text">
                </div>
                <div class="control">
                    <button class="button">Text here</button>
                </div>
            </div>
        */
        inputControl.append(search);
        btnControl.append(btn);
        field.append(inputControl);
        field.append(btnControl);
    //instead of having each result as a string, I made them objects so we can add both a title and a body text
    var mealsResults = [
        {
            name: 'The Best Chiken',
            text: 'The Best Chicken anyone is ever had can be yours click here!'
        },
        {
            name: 'The Best Chiken',
            text: 'The Best Chicken anyone is ever had can be yours click here!'
        },
        {
            name: 'The Best Chiken',
            text: 'The Best Chicken anyone is ever had can be yours click here!'
        },
        {
            name: 'The Best Chiken',
            text: 'The Best Chicken anyone is ever had can be yours click here!'
        },
        {
            name: 'The Best Chiken',
            text: 'The Best Chicken anyone is ever had can be yours click here!'
        },
    ];
    //setting < mealsResults.length allows us to dynamically insert as many elements as we want
    for (var j= 0; j < mealsResults.length; j++) {
        //if the index is divisible by 4 then we add a new level
        //this means we add a level every 4th element
        //since we declare var level, we are creating a new element and assigning it the name of level
        //this way content always gets appended to the last level we create
        //the level class ensures that all elements are vertically centered in their container
        if(j%4 === 0) {
            var level = document.createElement('div');
                level.classList.add('level');
            body.append(level);
        }
        
        //usually we add the level-item class to each result, but that messes with the width so I didnt' add it
        var favMeals = document.createElement('div');
            favMeals.classList.add('corners-rounded');
            favMeals.classList.add('has-background-grey-lighter');
            favMeals.classList.add('meal-results');

        var table = document.createElement('table');
            table.classList.add('table');
            table.classList.add('is-fullwidth');
            table.classList.add('corners-rounded');

        //while we don't have to use thead and tbody usually bulma uses them to style tables and make them look pretty
        var thead = document.createElement('thead');
        var tbody = document.createElement('tbody');
        
        //thead and tbody need a row class 
        var row1 = document.createElement('tr');
        var row2 = document.createElement('tr');
        
        //th means table head and is the tabel cell that usually goes in the row contained in the  thead tag if you have one
        //it makes the text bolder
        var th = document.createElement('th');
        var resultTitle = document.createTextNode(mealsResults[j].name);
            th.appendChild(resultTitle);

        //td stands for table data and is you adverage table cell that usually goes in rows contained in tbody if you have one 
        var td = document.createElement('td');
        var p2 = document.createElement('p');
        var resultText = document.createTextNode(mealsResults[j].text);
            p2.appendChild(resultText);
            td.appendChild(p2);


        //put them all together
        /*
            <table>
                <thead>
                    <tr>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                    <tr>
                <tbody>
            </table>
        */
        row1.append(th);
        row2.append(td);
        thead.append(row1);
        tbody.append(row2);
        table.append(thead);
        table.append(tbody);

        favMeals.append(table);
        level.append(favMeals);  
        
    }
    
    elem.append(head);
    elem.append(field);
    elem.append(body);
            
    return elem;
}

function mealsModal () {
    //list of favorited recipiecs 
    //list of random suggested recipies for calorie meal goal
    //list of button filters like gluten-free, vegetarian...ect.
    //button filters are user settings that are stored and activated from the user database
    //3 levels
    var container = $('<div>');
    var title1 = $('<h3>').addClass('title is-4').text('Favorites');
    var title2 = $('<h3>').addClass('title is-4').text('Suggested');
    var title3 = $('<h3>').addClass('title is-4').text('Filter');

    var level1 = $('<div>').addClass('corners-rounded has-background-grey-light')
        .css('margin-bottom', '50px').css('padding', '10px');
    var level2 = $('<div>').addClass('corners-rounded has-background-grey-light')
        .css('margin-bottom', '50px').css('padding', '10px');
    var level3 = $('<div>').addClass('level')
        .css('margin-bottom', '50px').css('padding', '10px');;
    
    //favorites
    var ancestorFav = $('<div>').addClass('tile is-ancestor is-vertical');
    var ancestorSug = $('<div>').addClass('tile is-ancestor is-vertical');
    
    var favArr = [
        {
            name: "noodles", 
            description: 'boil some water to start making these fantastically bland noodles',
            url: 'URL HERE'
        },
        {
            name: "noodles", 
            description: 'boil some water to start making these fantastically bland noodles',
            url: 'URL HERE'
        },
        {
            name: "noodles", 
            description: 'boil some water to start making these fantastically bland noodles',
            url: 'URL HERE'
        },
        {
            name: "noodles", 
            description: 'boil some water to start making these fantastically bland noodles',
            url: 'URL HERE'
        },
        {
            name: "noodles", 
            description: 'boil some water to start making these fantastically bland noodles',
            url: 'URL HERE'
        },
        {
            name: "noodles", 
            description: 'boil some water to start making these fantastically bland noodles',
            url: 'URL HERE'
        },
        {
            name: "noodles", 
            description: 'boil some water to start making these fantastically bland noodles',
            url: 'URL HERE'
        },
        {
            name: "noodles", 
            description: 'boil some water to start making these fantastically bland noodles',
            url: 'URL HERE'
        },
        {
            name: "noodles", 
            description: 'boil some water to start making these fantastically bland noodles',
            url: 'URL HERE'
        },

    ]

    var sugArr = [
        {
            name: 'po-ta-toes', 
            description: 'boil em, mash em, stick em in a stew po-ta-toes',
            URL: 'URL HERE'
        },
        {
            name: 'po-ta-toes', 
            description: 'boil em, mash em, stick em in a stew po-ta-toes',
            URL: 'URL HERE'
        },
        {
            name: 'po-ta-toes', 
            description: 'boil em, mash em, stick em in a stew po-ta-toes',
            URL: 'URL HERE'
        },
        {
            name: 'po-ta-toes', 
            description: 'boil em, mash em, stick em in a stew po-ta-toes',
            URL: 'URL HERE'
        },
        {
            name: 'po-ta-toes', 
            description: 'boil em, mash em, stick em in a stew po-ta-toes',
            URL: 'URL HERE'
        },
        {
            name: 'po-ta-toes', 
            description: 'boil em, mash em, stick em in a stew po-ta-toes',
            URL: 'URL HERE'
        },
        {
            name: 'po-ta-toes', 
            description: 'boil em, mash em, stick em in a stew po-ta-toes',
            URL: 'URL HERE'
        },
    ]

    //takes an array of suggested recipies and appends them to the appropriate ancestor
    function appendMeals (arr, ancestor) {
        for (var i=0; i<arr.length; i++){
            if(i%4===0){
                var parent = $('<div>').addClass('tile is-parent');
                    parent.attr('id', 'parent' + i);
                ancestor.append(parent);
                
            }
            var tileContents = $('<div>').addClass('corners-rounded has-background-grey-lighter').css('margin', '5px').css('padding', '10px');
            var tile = $('<div>').addClass('tile is-child is-3');
                tile.css('margin', '10px');    
            var title = $('<h3>').addClass('title is-5').text(arr[i].name);
            var snippet = $('<p>').text(arr[i].description);
    
            tileContents
                .append(title)
                .append(snippet);
    
            tile.append(tileContents);
            parent.append(tile);
        }
    }
    
    appendMeals (favArr, ancestorFav);
    appendMeals(sugArr, ancestorSug);

    var filters = ['Vegetarian', 'Vegan', 'Pescetarian', 'Gluten-free', 'Dairy-free', 'Keto', 'Paleo', 'Kosher', 'Halal'];

    var btnGroup = $('<div>').addClass('buttons');
    
    filters.forEach(function(filter) {
        var button = $('<button>').addClass('button is-primary is-outlined');
            button.attr('data-selected', 'false');
            button.text(filter);
            btnGroup.append(button);
    });

    $('.buttons > .button').on('click', function(){
        var state = $(this).attr('data-selected');
        if(state === 'false'){
            $(this).attr('data-selected', 'true');
            $(this).removeClass('is-outlined');
        }else{
            $(this).attr('data-selected', 'false');
            $(this).addClass('is-outlined');
        }
        console.log($(this).attr('data-selected'));
    });

    level1.append(ancestorFav);
    level2.append(ancestorSug);
    level3.append(btnGroup);
  

    //filters
    
    container
        .append(title1)
        .append(level1)
        .append(title2)
        .append(level2)
        .append(title3)
        .append(level3);
    
    return container;
}

//appends Panels to the dashboard
var toAppend = [];

toAppend.push(addDaily(), addWeather(), dummyCard(), addMeals()); 

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
