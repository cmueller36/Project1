//User Variables with Access tokens - the access token is added to the API to call the user information
var tokenChris = "8ca56d8bd42e31e70a1104a9dc5fd89f26f20474";
var tokenJordan = "t-mZj_5LAmXZaYzqpSvhUKl1wiE=AjjK-jpf1669011c1fd767db3eb85fc5614bbd0c85920f860da5b9378340236b9340c142fea80e7b6a20a845512bc0f1ee373b17dbab5b58ecb0155d8728540ee948c7869497e85866ff6f84a07cd5f9ff035d0be5896899c793fbc35c26597b118876b24adece043e984a055577c80eead4622b";
var tokenClaire = "bSntZcVkuv897xKBSRqXTwd8R1o=_dFFVh6_e48ddda0c0087f16c4bb6507c4cc5bc655ea4abe44907452794ca1522a8ee9bc65fbc6d856dd37e39b5a5824937850ca8fded0ac7de3f926f77ecdb878e437284bcf2def4c036095676ef4be57d9678e5ae2f29758cefca38c48ccdd9bafd9e6db015a795fa9b1242318fe6f9784e6e1";
var tokenAnna = "mQ6i3wRrcNmdeWY4rGZ39yudyl4=xoS25AIu3bf05deb827095f3853e1550209cee1eba255059eba694b8aeabb3353406a825da5cf02a29b84cd5a684a9c755504f0f6904096f545d7227eb7d4549283aadacb2461132276de770d247c9d2fd067eb8850b04f6212c2f899db1c4a3604325d9fa5d1e7697fc9fa864c9e90f6ea87584";
var tokenJasmine = "RV4o-8h4_NS8HDJvQsfdadLoUt4=ZYsF7cWP9206144c105875aa4347cf3bfb96340ba944663f1f3baa424b463dd7f1a5d0a5807dcb59f00ada1f55ccd794e30999a4e2ad9d2ca93e80b4be3e71d0c40ca1b1ddd5d404535999cddd3b1c32b16f7e1088714be59f927e768aa00a849c9eeac6bf7ef814552825326980e0aa362e35c1";

var userToken = "";
var userSelected = "";

//iframes for Power BI Dashboards
var iframeChris = "https://app.powerbi.com/view?r=eyJrIjoiYTIzZTA3MTMtZWU3ZS00NzE2LTgxN2YtMTAyODEwZDM5YTY2IiwidCI6ImUyYzc3ZjUwLTYyYzUtNDkxYy1iY2Q2LWIyYzBkOTU1YTU4OSIsImMiOjN9";
var iframeJordan = "https://app.powerbi.com/view?r=eyJrIjoiNDJlZTIwOTItYjM1Ni00NDFmLWJmMzUtNWEwNTgzZDVmMWJiIiwidCI6ImUyYzc3ZjUwLTYyYzUtNDkxYy1iY2Q2LWIyYzBkOTU1YTU4OSIsImMiOjN9";
var iframeClaire = "https://app.powerbi.com/view?r=eyJrIjoiY2MxNTE5MjctODA4OS00MDhlLTg4YTItNmFlNDlkNTJhYzNlIiwidCI6ImUyYzc3ZjUwLTYyYzUtNDkxYy1iY2Q2LWIyYzBkOTU1YTU4OSIsImMiOjN9";
var iframeAnna = "https://app.powerbi.com/view?r=eyJrIjoiMmFmMzc3YzYtM2RhNS00MDAyLWExNTEtMWU3YzRhNWY5YzIwIiwidCI6ImUyYzc3ZjUwLTYyYzUtNDkxYy1iY2Q2LWIyYzBkOTU1YTU4OSIsImMiOjN9";
var iframeJasmine = "https://app.powerbi.com/view?r=eyJrIjoiZDhjZTNiNTUtNzliNi00ZjIyLTgzMDEtMDFjM2Y4ZjQ2MGI3IiwidCI6ImUyYzc3ZjUwLTYyYzUtNDkxYy1iY2Q2LWIyYzBkOTU1YTU4OSIsImMiOjN9";

var useriframe = "";

//iframe Calories for Power BI Dashboard
var iframeCaloriesChris = "https://app.powerbi.com/view?r=eyJrIjoiZTI0NDg5ZTEtMTFjOC00YjNjLWI0ZTgtYzVlY2NjZDIzYTU2IiwidCI6ImUyYzc3ZjUwLTYyYzUtNDkxYy1iY2Q2LWIyYzBkOTU1YTU4OSIsImMiOjN9";
var iframeCaloriesJordan = "https://app.powerbi.com/view?r=eyJrIjoiMmM5YWI0OGEtY2RjMS00MzZiLTg0ZTctNzZhZTMyZWI4NGE1IiwidCI6ImUyYzc3ZjUwLTYyYzUtNDkxYy1iY2Q2LWIyYzBkOTU1YTU4OSIsImMiOjN9";
var iframeCaloriesClaire = "https://app.powerbi.com/view?r=eyJrIjoiOTA5YTdjOTEtYWYwOS00ZWMxLWE1ZGQtM2U4NDIwNTM2NjEzIiwidCI6ImUyYzc3ZjUwLTYyYzUtNDkxYy1iY2Q2LWIyYzBkOTU1YTU4OSIsImMiOjN9";
var iframeCaloriesAnna = "https://app.powerbi.com/view?r=eyJrIjoiMTBjNWY3ZmItZDA4Ni00MzUwLWE3NTYtNTFiODk4NTZjZTc2IiwidCI6ImUyYzc3ZjUwLTYyYzUtNDkxYy1iY2Q2LWIyYzBkOTU1YTU4OSIsImMiOjN9";
var iframeCaloriesJasmine = "https://app.powerbi.com/view?r=eyJrIjoiODBlMDVhMWUtYTE2OC00YzdhLTk3YWQtMjYxYzgyNzc1MWFmIiwidCI6ImUyYzc3ZjUwLTYyYzUtNDkxYy1iY2Q2LWIyYzBkOTU1YTU4OSIsImMiOjN9";

var useriframeCalories = "";

//iframe Pedometer for Power BI Dashboard
var iframePedometerChris = "https://app.powerbi.com/view?r=eyJrIjoiZTU4YTdiODItOGZmNC00YzhlLTkxNDgtZjA3ZTk4YWRlOWU4IiwidCI6ImUyYzc3ZjUwLTYyYzUtNDkxYy1iY2Q2LWIyYzBkOTU1YTU4OSIsImMiOjN9";
var ifrmaePedometerJordan = "https://app.powerbi.com/view?r=eyJrIjoiMjE2YjhiZjYtYzkyMS00NGExLWEwNzEtNGRhNmEwNTFlZTUwIiwidCI6ImUyYzc3ZjUwLTYyYzUtNDkxYy1iY2Q2LWIyYzBkOTU1YTU4OSIsImMiOjN9";
var iframePedometerClaire = "https://app.powerbi.com/view?r=eyJrIjoiMzEyNTY5YmYtNzgyMy00YTE1LTk5ZjctZTk5YzNmMDRlMTFlIiwidCI6ImUyYzc3ZjUwLTYyYzUtNDkxYy1iY2Q2LWIyYzBkOTU1YTU4OSIsImMiOjN9";
var iframePedometerAnna = "https://app.powerbi.com/view?r=eyJrIjoiNmY1MjVlZWMtYTVjMC00OWM1LTk4NDQtNDI3YjUxNWMwYWJlIiwidCI6ImUyYzc3ZjUwLTYyYzUtNDkxYy1iY2Q2LWIyYzBkOTU1YTU4OSIsImMiOjN9";
var iframePedometerJasmine = "https://app.powerbi.com/view?r=eyJrIjoiMjhiYTA5YzEtNTliNi00NGZhLWIzYTItN2JkMjQ3MDcxMWJhIiwidCI6ImUyYzc3ZjUwLTYyYzUtNDkxYy1iY2Q2LWIyYzBkOTU1YTU4OSIsImMiOjN9";

var useriframePedometer = "";

//user ids from firebase
var uidChris = "lJLzL33avkdSXjBz9pNKnAe0Dug2";
var uidClaire = "stRYWlF1dJYish2vDnfNZEGVt7W2";
var uidJordan = "VTn0jLWUetgMwJmUce0Cf3mWtuY2";
var uidAnna = "dWKyQd8BGof1eOfrFXRJdrJuFY92";
var uidJasmine = "AarJudUzomQymI5HS72yehqoBAX2";


var activitiesSummary = [];

var userNameNav = "";

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBBmBBRUZAr5nK4iW39KtxrjXiUPWyW1eQ",
    authDomain: "project1-testdev.firebaseapp.com",
    databaseURL: "https://project1-testdev.firebaseio.com",
    projectId: "project1-testdev",
    storageBucket: "project1-testdev.appspot.com",
    messagingSenderId: "128017361927"
};
firebase.initializeApp(config);

var database = firebase.database();


// Initialize the FirebaseUI Widget using Firebase.  
var ui = new firebaseui.auth.AuthUI(firebase.auth());

// FirebaseUI config.
var uiConfig = {
    signInSuccessUrl: "./index.html",
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
};

// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

//once the user is authenticated
// Track the UID of the current user.  
var currentUid = "";
var fbActivities = [];
firebase.auth().onAuthStateChanged(function (user) {

    // onAuthStateChanged listener triggers every time the user ID token changes.  
    // This could happen when a new user signs in or signs out.  
    // It could also happen when the current user ID token expires and is refreshed.  
    if (user && user.uid != currentUid) {
        // Update the UI when a new user signs in.  
        // Otherwise ignore if this is a token refresh.  
        // Update the current user UID.  
        currentUid = user.uid;

        var ref = database.ref();
        //grabs user activity
        ref.child(currentUid).child("activty").orderByChild("User").equalTo(currentUid).on("value", function (snapshot) {
            console.log(snapshot.val());
            fbActivities.push(snapshot.val());
        });

    } else {
        // Sign out operation. Reset the current user UID.  
        currentUid = null;
        console.log("no user signed in");
    }
    if (currentUid === uidChris) {
        userToken = tokenChris;
        useriframe = iframeChris;
        userNameNav = "Chris";
        useriframeCalories = iframeCaloriesChris;
        useriframePedometer = iframePedometerChris;
    }

    if (currentUid === uidAnna) {
        userToken = tokenAnna;
        useriframe = iframeAnna;
        userNameNav = "Anna";
        useriframeCalories = iframeCaloriesAnna;
        useriframePedometer = iframePedometerAnna;
    }

    if (currentUid === uidJordan) {
        userToken = tokenJordan;
        useriframe = iframeJordan;
        userNameNav = "Jordan";
        useriframeCalories = iframeCaloriesJordan;
        useriframePedometer = ifrmaePedometerJordan;
    }

    if (currentUid === uidClaire) {
        userToken = tokenClaire;
        useriframe = iframeClaire;
        userNameNav = "Claire";
        useriframeCalories = iframeCaloriesClaire;
        useriframePedometer = iframePedometerClaire;
    }

    if (currentUid === uidJasmine) {
        userToken = tokenJasmine;
        useriframe = iframeJasmine;
        userNameNav = "Jasmine";
        useriframeCalories = iframeCaloriesJasmine;
        useriframePedometer = iframePedometerJasmine;
    }

    var summaryURL = "https://api.humanapi.co/v1/human/activities/summaries?access_token=" + userToken;

    $.ajax({
        url: summaryURL,
        method: "GET"
    }).then(function (response) {
        //this grabs the first index in the object array and gets the calories for it
        activitiesSummary = response;
        console.log(response);

        activitiesSummary.forEach(function (value) {
            console.log(response);
        activitiesSummary = [];
        var days = parseInt(moment().format('d')) + 1;

        for (var i=0; i<days; i++){
            activitiesSummary.push(response[i]);
        }
        //append relevent card data
        //calories card
        $('#caloriesToday').text(activitiesSummary[0].calories);
        $('#stepsToday').text(activitiesSummary[0].steps);
        $('#stepsYesterday').text(activitiesSummary[0].steps);

        $('.grid').masonry();
        //reverse array to append the data to modals easier
        activitiesSummary.reverse();
        console.log('activities Summary', activitiesSummary);
        
        });
    });

    $("#powerbiIframe").attr("src", useriframe);
});




    //logout of firebase
    $("#logout").on("click", function (event) {
        firebase.initializeApp(config);
        console.log("logout");
        event.preventDefault();
        firebase.auth().signOut().then(function () {
            console.log("Sign-out successful");
            window.location = "login.html";
        }).catch(function (error) {
            console.log(error);
            console.log("An error happened");
        });

    });
    //variables storing information relevant to Recipe API

var recipeArr = [];

$(document).on("click","#searchMeals",function(){

    recipeSearchValue = $("#searchInput").val().trim();


    var recipeSearch = recipeSearchValue;
    var recipeAppId = "&app_id=84dfbeab";
    var recipeApiKey = "&app_key=b2a7ec1260a71c648f7c481c5934f15b";
    var numberOfRecipes = "&from=0&to=8";
    var caloriesQuery = $("#caloriesToday").text();
    var diet = "";
    var health = "&healthLabel=" + diet; //add limiting food group from dropdown menu --> see HEALTH documentation in the Recipes API
    var queryURL = "https://api.edamam.com/search?q=" + recipeSearch + recipeAppId + recipeApiKey + numberOfRecipes + caloriesQuery + health;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function (response) {
        console.log(response);


        for (var i=0; i<8; i++){
            var temp = {
                name: response.hits[i].recipe.label,
                image: response.hits[i].recipe.image,
                url: response.hits[i].recipe.url
            }
            recipeArr.push(temp);
        }
        console.log(recipeArr);
        getSearchResults(recipeArr);

});

var favArr = [];





    //weather data
    var weatherAPI = "?apikey=YmtcFPorPCo5IQDz9HzhufW3JeeVaA2f";
    var weatherURL = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/329823" + weatherAPI;
    var weatherData = [];

    $.ajax({
        url: weatherURL,
        method: "GET"
    }).then(function (res) {
        console.log(res);
        for (var i = 0; i < res.DailyForecasts.length; i++) {
            var data = res.DailyForecasts[i];
            var day = {
                icon: undefined,
                forecast: data.Day.IconPhrase,
                temp: data.Temperature.Maximum.Value
            }
            weatherData.push(day);

            //get correct icon for weather forecast

            switch (data.Day.Icon) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    day.icon = '<img src="assets/weather-icons/sun.svg" alt="sunny">'
                    break;
                case 6:
                    day.icon = '<img src="assets/weather-icons/cloudy.svg"" alt="partly-cloudy">'
                    break;
                case 7:
                case 8:
                    day.icon = '<img src="assets/weather-icons/cloudy-1.svg" alt="cloudy">';
                    break;
                case 11:
                    day.icon = '<img src="assets/weather-icons/fog-1.svg" alt="fog">';
                    break;
                case 12:
                case 13:
                    day.icon = '<img src="assets/weather-icons/rain-1.svg" alt="showers">';
                    break;
                case 14:
                    day.icon = '<img src="assets/weather-icons/rain-3.svg" alt="showers-partly-sunny">';
                    break;
                case 15:
                case 16:
                case 17:
                case 41:
                case 42:
                    day.icon = '<img src="assets/weather-icons/thunder.svg" alt="thunder">';
                    break;
                case 18:
                    day.icon = '<img src="assets/weather-icons/rain.svg" alt="rain">';
                    break;
                case 19:
                case 20:
                case 21:
                case 43:
                case 44:
                    day.icon = '<img src="assets/weather-icons/snowflake.svg" alt="flurries">';
                    break;
                case 22:
                case 23:
                    day.icon = '<img src="assets/weather-icons/snow.svg" alt="snow">';
                    break;
                case 24:
                    day.icon = '<img src="assets/weather-icons/snowflake.svg" alt="ice">';
                    break;
                case 25:
                case 26:
                case 29:
                    day.icon = '<img src="assets/weather-icons/rain-1.svg" alt="fog">';
                    break;
                case 30:
                    day.icon = '<img src="assets/weather-icons/hot.svg" alt="hot">';
                    break;
                case 31:
                    day.icon = '<img src="assets/weather-icons/thermometer.svg" alt="cold-thermometer">';
                    break;
                case 32:
                    day.icon = '<img src="assets/weather-icons/wind.svg" alt="windy">';
                    break;
                case 33:
                case 34:
                    day.icon = '<img src="assets/weather-icons/full-moon-and-stars.svg" alt="moon">';
                    break;
                case 35:
                case 36:
                case 37:
                case 38:
                    day.icon = '<img src="assets/weather-icons/cloudy-2.svg" alt="moon-clouds">';
                    break;
                case 39:
                case 40:
                    day.icon = '<img src="assets/weather-icons/rain-2.svg" alt="raindrops">';
                    break;
                default:
                    day.icon = '<img src="assets/weather-icons/rainbow.svg" alt="rainbow"><p>Icon exception</p>';
                    break;
            }
        }
        console.log(weatherData);
        $('#weather-icon').html(weatherData[0].icon);
        $('#temp').text(weatherData[0].temp + String.fromCharCode(176) + 'F');
        $('#forecast').text(weatherData[0].forecast);
    });
})