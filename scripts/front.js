
//initialize masonry
var $grid = $('.grid').masonry({
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true,
    gutter: 20
});

//returns an object with the current date data
function getNow() {
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

//returns an array of all the dates in the current week
var dateArr = [];
function getDates(day) {
    if (day !== 0) {
        console.log(day);
        date = moment().subtract(day - 1, 'days').format('MMMM Do');
        console.log(date);
        dateArr.push(date);
        day--;
        return getDates(day);
    } else if (dateArr.length !== 7) {
        console.log(dateArr.length);
        var remaining = 7 - dateArr.length;
        console.log('remaining: ', remaining);
        var remainingArr = [];
        console.log(remainingArr);
        for (var i = 0; i < remaining; i++) {
            date = moment().add(i + 1, 'days').format('MMMM Do');
            remainingArr.push(date);
        }
        dateArr = dateArr.concat(remainingArr);
    } else {
        for (var i = 0; i < 7; i++) {
            date = moment().add(i, 'days').format('MMMM Do');
            dateArr.push(date);
        }
    }
}
getDates(moment().format('d'));

function appendActivities(arr) {
    //create a table???
    var $goals = $('#goals');
    $goals.empty();
    ///database call to user to grab any data for today placeholders are used for now
    //fbActivities
    console.log(arr);
    arr.forEach(function (activity) {

        if (activity.date === moment().format('L')) {
            var item = document.createElement('div');
            var label = document.createElement('label');
            label.classList.add('checkbox');
            label.setAttribute('data-checked', false);
            var text = ' ' + activity.Activity + ', ' + activity.Duration
            var checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');

            label.append(checkbox);
            label.append(document.createTextNode(' ' + text));


            item.append(label);
            $goals.append(item);
        }

    });
}

//Creates a header element with an icon and a title
function createPanelHead(icon, title, expand) {
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

    if (expand === true) {
        var right = document.createElement('div');
        right.classList.add('level-right');
        right.innerHTML = '<i class="fas fa-arrows-alt-h" data-fa-transform="rotate--45" data-panel=' + title + '></i>';
        header.append(right);
    }

    //return completed header object
    return header;
}

//Creates the contents of the modal
function createModal(panel, callback, icon) {
    console.log('this element is ', panel);

    var head = createPanelHead(icon, panel, false);


    level1.append(itemA);

    if (arguments[1]) {
        var title2 = $('<h3>')
            .addClass('title is-5')
        var level2 = $('<div>').addClass('level')
        var container = $('<div>').addClass('level-item').css('width', '800px');
        container.append(callback);
        level2.append(container)
    } else {
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
function generateIframe(url) {
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
function generateDropdown(label, itemsArr) {
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
    for (var i = 0; i < itemsArr.length; i++) {
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
function addDaily() {
    var now = getNow();
    var elem = document.createElement('div');
    elem.classList.add('grid-item');
    elem.classList.add('grid-item--width2');
    elem.classList.add('grid-item--height2');
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
    goals.classList.add('table-cell--height2');
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


    return elem;
}

//creates daily report modal
function dailyModal() {
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
function addWeather() {
    var elem = document.createElement('div');
    elem.classList.add('grid-item');
    elem.classList.add('grid-item--width2');
    elem.classList.add('grid-item--height');
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
function weatherModal() {
    var elem = $('<div>');

    var level0 = $('<div>').addClass('level');

    for (var i = 0; i < 5; i++) {

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

//appends pedometer modal content to modal
function pedometerModal(dateArr) {
    var week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var now = getNow();
    var level = $('<div>').addClass('level');
    for (var i = 0; i < 7; i++) {
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
            .addClass('steps has-text-centered')
        var td2 = $('<td>').append('<p>steps</p>');

        var date = $('<p>').append(week[i] + ',<br>' + dateArr[i]);
        th.append(date);

        var text = $('<h3>').addClass('title is-3');

        if (activitiesSummary[i]) {
            text.text(activitiesSummary[i].steps);
        } else {
            text.text('0');
        }

        td1.append(text);
        td1.append('<p>Steps</p>')

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

//Creates the meals card
function addMeals() {
    var elem = document.createElement("div");
    elem.classList.add('grid-item');
    elem.classList.add('grid-item--widthfull');
    elem.classList.add('box');

    var head = createPanelHead('<img class="image is-48x48" src="assets/panel-icons/healthy-nutrition.svg" alt="nutrition-icon">', 'Meals', true);

    var body = document.createElement('div');
        body.setAttribute('id', 'results');
    var field = document.createElement('div');
    field.classList.add('field');
    field.classList.add('has-addons');

    var inputControl = document.createElement('div');
    inputControl.classList.add('control');
    inputControl.classList.add('is-expanded');

    var btnControl = document.createElement('div');
    btnControl.classList.add('control');

    var btn = document.createElement('button');
    btn.setAttribute('id', 'searchMeals');
    btn.classList.add('button');
    btn.classList.add('is-primary');
    btn.innerText = 'Search Meals';


    var search = document.createElement('input');
    search.setAttribute('type', 'text');
    search.setAttribute('placeholder', 'Search Recipes');
    search.classList.add('input');
    search.classList.add('is-primary');

    inputControl.append(search);
    btnControl.append(btn);
    field.append(inputControl);
    field.append(btnControl);

    var filterTitle = document.createElement('h3');
    filterTitle.classList.add('title');
    filterTitle.classList.add('is-6');
    filterTitle.innerText = 'Filters';

    var filters = ['Vegetarian', 'Vegan', 'Pescetarian', 'Gluten-free', 'Dairy-free', 'Keto', 'Paleo', 'Kosher', 'Halal'];
    var level2 = document.createElement('div');
    level2.classList.add('level');

    var btnGroup = document.createElement('div');
    btnGroup.classList.add('buttons');

    filters.forEach(function (filter) {
        var button = document.createElement('span');
        button.classList.add('button');
        button.classList.add('is-primary');
        button.classList.add('is-outlined');
        button.classList.add('btn-filter');
        button.setAttribute('data-selected', 'false');
        button.appendChild(document.createTextNode(filter));
        btnGroup.append(button);
    });
    level2.append(btnGroup);

    elem.append(head);
    elem.append(field);
    elem.append(level2);
    elem.append(body);

    return elem;
}

function getSearchResults(arr) {
    $('#results').empty();
    for (var j = 0; j < arr.length; j++) {

        if (j % 4 === 0) {
            var level = document.createElement('div');
            level.classList.add('level');
            $('#results').append(level);
        }

        var favMeals = document.createElement('div');
        favMeals.classList.add('corners-rounded');
        favMeals.classList.add('has-background-grey-lighter');
        favMeals.classList.add('meal-results');

        var table = document.createElement('table');
        table.classList.add('table');
        table.classList.add('is-fullwidth');
        table.classList.add('corners-rounded');

        var thead = document.createElement('thead');
        var tbody = document.createElement('tbody');
            tbody.classList.add('clickRecipe');
            
        var row1 = document.createElement('tr');
        var row2 = document.createElement('tr');

        var th = document.createElement('th');
        var resultTitle = document.createTextNode(recipeArr[j].name);
        th.appendChild(resultTitle);

        var td = document.createElement('td');
        var img = document.createElement('img');
            img.classList.add('corners-rounded');
            
            img.setAttribute('src', recipeArr[j].image);
            img.setAttribute('alt', 'Query result img');
        td.appendChild(img);

        var link = document.createElement('a');
            link.setAttribute('href', recipeArr[j].url);
            link.setAttribute('target', '_blank');
            link.setAttribute('style', 'display:none');
        tbody.append(link);

        row1.append(th);
        row2.append(td);
        thead.append(row1);
        tbody.append(row2);
        table.append(thead);
        table.append(tbody);

        favMeals.append(table);
        level.append(favMeals);
    }
}

function mealsModal() {
    var container = $('<div>');
    var title1 = $('<h3>').addClass('title is-4').text('Favorites');
    var title2 = $('<h3>').addClass('title is-4').text('Suggested');
    var title3 = $('<h3>').addClass('title is-4').text('Filter');

    var level1 = $('<div>').addClass('corners-rounded has-background-grey-light')
        .css('margin-bottom', '50px').css('padding', '10px');
    var level2 = $('<div>').addClass('corners-rounded has-background-grey-light')
        .css('margin-bottom', '50px').css('padding', '10px');


    //favorites
    var ancestorFav = $('<div>').addClass('tile is-ancestor is-vertical');
    var ancestorSug = $('<div>').addClass('tile is-ancestor is-vertical');

   


    //takes an array of suggested recipies and appends them to the appropriate ancestor
    function appendMeals(arr, ancestor) {
        for (var i = 0; i < arr.length; i++) {
            if (i % 4 === 0) {
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

    appendMeals(favArr, ancestorFav);

    level1.append(ancestorFav);

    //filters
    container
        .append(title1)
        .append(level1);

    return container;
}

//Calorie Card
function addCalorieCard() {
    var elem = document.createElement('div');
    elem.classList.add('grid-item');
    elem.classList.add('grid-item--width2');
    elem.classList.add('grid-item--height');
    elem.classList.add('box');


    //Calorie card head
    var head = createPanelHead('<img src= "assets/panel-icons/man.svg" alt="burnMan">', 'Calories', true);
    var title2 = document.createElement('h3');
    title2.classList.add('title'); -
        title2.classList.add('is-5');
    title2.append(document.createTextNode('Calories Count'));

    //Calorie card body
    var cardBody = document.createElement('div');
    cardBody.classList.add('has-text-centered');
    //cardBody.classList.add('level');

    //Create 2 caloric elements: burned and goal to add content
    var burnedCalories = document.createElement('div');
    burnedCalories.classList.add('level-item');
    var goalCalories = document.createElement('div');
    goalCalories.classList.add('level-item');
    var burnedP = document.createElement('h3');
    burnedP.classList.add('title');
    burnedP.classList.add('is-1');
    burnedP.setAttribute('id', 'caloriesToday');
    //burnedP.classList.add('level-item');
    var goalP = document.createElement('p');
    goalP.classList.add('title');
    goalP.classList.add('is-5');
    goalP.classList.add('level-item');
    var units = document.createElement('p');
    units.innerHTML = 'kcal Burned';


    burnedCalories.append(burnedP);
    //goalCalories.append(goalP);
    cardBody.append(burnedP);
    cardBody.append(units);
    //cardBody.append(goalCalories);

    elem.append(head);
    elem.append(cardBody);

    return elem;

}

function calorieModal() {
    var head = createPanelHead('<img src= "assets/panel-icons/man.svg" alt="burnMan">', 'Calories', false);
    //5day trend
    var level1 = $('<div>').addClass('level');

    var title1 = $('<h3>').addClass('title is-4');
    title1.text('Week View');




    for (var i = 0; i < 7; i++) {
        var date = dateArr[i];
        var week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var item = $('<div>').addClass('level-item calories-level-item corners-rounded has-background-grey-lighter');
        var table = $('<table>').addClass('table is-fullwidth corners-rounded');
        var thead = $('<thead>');
        var tbody = $('<tbody>');
        var row1 = $('<tr>');
        var row2 = $('<tr>');
        var th = $('<th>').html(week[i] + ',<br>' + date);
        var td = $('<td>').addClass('has-text-centered');
        var text = $('<h3>').addClass('title is-3');

        if (activitiesSummary[i]) {
            text.text(activitiesSummary[i].calories);
        } else {
            text.text('0');
        }

        td.append(text).append('<p>kcal Burned</p>');

        row1.append(th);
        row2.append(td);
        thead.append(row1);
        tbody.append(row2);
        table.append(thead);
        table.append(tbody);

        item.append(table);
        level1.append(item);
    }
    //iframe panel
    var title2 = $('<h3>').addClass('title is-4');
    title2.text('Trends');
    var calorieIframe = generateIframe('https://app.powerbi.com/view?r=eyJrIjoiZWEzZmU0ODQtZTYyNS00MGExLWI3NmItMDhmYmE3NDBjYzg5IiwidCI6ImUyYzc3ZjUwLTYyYzUtNDkxYy1iY2Q2LWIyYzBkOTU1YTU4OSIsImMiOjN9');
    var level2 = $('<div>').addClass('level');

    calorieIframe.addClass('level-item');

    level2.append(calorieIframe);
    $('#modalDiv')
        .append(head)
        .append(title1)
        .append(level1)
        .append(title2)
        .append(level2);

}

//Pedometer Card
function addPedometer() {
    var elem = document.createElement("div");
        elem.classList.add("grid-item");
        elem.classList.add('grid-item--width2');
        elem.classList.add("box");
      
    //Create header for the Pedometer
    var head = createPanelHead('<img class="image" src="assets/panel-icons/feel-free.svg" alt="pedomter">', 'Pedometer', true);

    //Create body element 
    var body = document.createElement('div');
        body.classList.add('has-text-centered');
        body.classList.add('level');
    var today = document.createElement('h3');
        today.setAttribute('id', 'todaysStats')
        today.classList.add('title');
        today.classList.add('is-4');
        today.append(document.createTextNode('Today:'));
        today.innerText = `Today: `;

    var stepsTday = document.createElement('h1');
        stepsTday.classList.add('title');
        stepsTday.classList.add('is-1');
        stepsTday.setAttribute('style', 'margin-right: 30px');
        stepsTday.setAttribute('id', 'stepsToday');
        
        body.appendChild(today);
        body.append(stepsTday);

    //Create footer element

    var footer = document.createElement('footer');
        footer.classList.add('has-text-centered');
        footer.classList.add('level');

    var yesterday = document.createElement('h5');
        yesterday.setAttribute('id', 'yStats')
        // yStats.classList.add('subtitle');
        yesterday.classList.add('is-6');
        yesterday.innerText = "Yesterday: "

    var stepsYday = document.createElement('h4');
        stepsYday.classList.add('title');
        stepsYday.classList.add('is-4');
        stepsYday.setAttribute('style', 'margin-right: 30px');
        stepsYday.setAttribute('id', 'stepsYesterday');

        footer.appendChild(yesterday);
        footer.append(stepsYday);
    
        
            elem.append(head);
            elem.append(body);
            elem.append(footer);
            return elem; 
}


//add username
$('#username').text(`Hello, ${userNameNav}`);
//appends Panels to the dashboard
var toAppend = [];


toAppend.push(addDaily(), addWeather(), addCalorieCard(), addPedometer(), addMeals()); 


$grid.append(toAppend).masonry('appended', toAppend);

//All Listeners go here

//Filters onclick funtion changes style and data-selected attribute
$('.btn-filter').on('click', function () {
    var state = $(this).attr('data-selected');
    if (state === 'false') {
        $(this).attr('data-selected', 'true');
        $(this).removeClass('is-outlined');
    } else {
        $(this).attr('data-selected', 'false');
        $(this).addClass('is-outlined');
    }
    console.log($(this).attr('data-selected'));
    
});

//dropdown toggle
$(document).on('click', '.dropdown', function () {
    if ($(this).hasClass('is-active')) {
        $(this).removeClass('is-active');
    } else {
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

            itemA.append(dailyModal());
            itemB.append(iframe);

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
                if (option === '0') {
                    $('#unitsDrop > .dropdown-trigger').find($('span')).text('Reps');
                    $('#unitsDrop').attr('data-selected', 0);
                    console.log('Reps was selected')
                } else {
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
                } else if (units === '1') {
                    duration.text($('#newDuration').val().trim() + ' Mins');
                    fbUnits = "Mins";
                } else {
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
                    Duration: fbDuration + " " + fbUnits,
                    date: moment().format('L'),
                    completed: false
                }

                //send items to firebase
                database.ref(currentUid + "/activty").push(temp);
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
        case "Pedometer":
            var head = createPanelHead('<img class="image" src="assets/panel-icons/feel-free.svg" alt="dummy">', 'Pedometer', false);
            var iframe = generateIframe('https://app.powerbi.com/view?r=eyJrIjoiZWEzZmU0ODQtZTYyNS00MGExLWI3NmItMDhmYmE3NDBjYzg5IiwidCI6ImUyYzc3ZjUwLTYyYzUtNDkxYy1iY2Q2LWIyYzBkOTU1YTU4OSIsImMiOjN9')
            var title1 = $('<h3>').addClass('title is-4').text('Week View');
            var title2 = $('<h3>').addClass('title is-4').text('Trends');
            //get dates for this week
            //call to user database, get pedometer steps for the week



            var level = $('<div>').addClass('level');

            iframe.addClass('level-item');
            level.append(iframe);

            $('#modalDiv')
                .append(head)
                .append(title1)
                .append(pedometerModal(dateArr))
                .append(title2)
                .append(level);
            break;
        case 'Meals':
            var head = createPanelHead('<img class="image is-48x48" src="assets/panel-icons/healthy-nutrition.svg" alt="nutrition-icon">', 'Meals', false);

            $('#modalDiv')
                .append(head)
                .append(mealsModal());

            break;
        case 'Calories':
            //CREATE MODAL
            calorieModal();
            break;
    }
});

//Deactivates Modal
$('#modal-close').on('click', function () {
    $('#modal').removeClass('is-active');
    $('#modalDiv').empty();
});

$(document).on('click', 'label', function (e) {
    e.preventDefault();
    console.log($(this).attr('data-checked'));

    if ($(this).attr('data-checked') === 'false') {
        $(this).attr('data-checked', 'true');
        $(this).css('text-decoration', 'line-through');
    } else {
        $(this).attr('data-checked', 'false');
        $(this).css('text-decoration', 'none');
    }
    console.log(this);

});

//makes meals tbody clickable
$(document).on('click', '.clickRecipe', function (){
    console.log('clicked');
    window.open($(this).find('a').attr('href'));
});