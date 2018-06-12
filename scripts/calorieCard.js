//Calorie Card
function addCalorieCard () {
    var elem = document.createElement('div');
    elem.classList.add('grid-item');
    elem.classList.add('grid-item--width5');
    elem.classList.add('box');
}

//Calorie card head
var head = createPanelHead('<i class="far fa-calories-burned-alt fa-3x"></i>', 'calorieCard');
var title2 = $('<h3>')
    .addClass('title is-5')
    .text('Calories Count');

//Calorie card body
var cardBody = document.createElement('div');
    cardBody.addClass('rows');

//Create 2 caloric elements: burned and goal to add content
var burnedCalories = document.createElement('div').addClass('level');
var goalCalories = document.createElement('div').addClass('level-item');

burnedCalories.append + '/' + goalCalories.append;

