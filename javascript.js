//User Variables with Access tokens - the access token is added to the API to call the user information
var tokenChris = "8ca56d8bd42e31e70a1104a9dc5fd89f26f20474";
var tokenJordan = "t-mZj_5LAmXZaYzqpSvhUKl1wiE=AjjK-jpf1669011c1fd767db3eb85fc5614bbd0c85920f860da5b9378340236b9340c142fea80e7b6a20a845512bc0f1ee373b17dbab5b58ecb0155d8728540ee948c7869497e85866ff6f84a07cd5f9ff035d0be5896899c793fbc35c26597b118876b24adece043e984a055577c80eead4622b";
var tokenClaire ="bSntZcVkuv897xKBSRqXTwd8R1o=_dFFVh6_e48ddda0c0087f16c4bb6507c4cc5bc655ea4abe44907452794ca1522a8ee9bc65fbc6d856dd37e39b5a5824937850ca8fded0ac7de3f926f77ecdb878e437284bcf2def4c036095676ef4be57d9678e5ae2f29758cefca38c48ccdd9bafd9e6db015a795fa9b1242318fe6f9784e6e1";
var tokenAnna = "mQ6i3wRrcNmdeWY4rGZ39yudyl4=xoS25AIu3bf05deb827095f3853e1550209cee1eba255059eba694b8aeabb3353406a825da5cf02a29b84cd5a684a9c755504f0f6904096f545d7227eb7d4549283aadacb2461132276de770d247c9d2fd067eb8850b04f6212c2f899db1c4a3604325d9fa5d1e7697fc9fa864c9e90f6ea87584";
var tokenJasmine = "";

var userToken = "";
var userSelected = "";


var activitiesSummary = [];


<<<<<<< modal


=======
>>>>>>> master
//User dropdown selection
$(".dropdown-item").on("change",function(){
    userSelected = $(this).val();

    if ( userSelected === "Chris"){
        userToken = tokenChris;
    }
    
    if ( userSelected === "Anna"){
        userToken = tokenAnna;
    }
    
    if ( userSelected === "Jordan"){
        userToken = tokenJordan;
    }

    var summaryURL = "https://api.humanapi.co/v1/human/activities/summaries?access_token=" + userToken;

   $.ajax({
       url: summaryURL,
       method:"GET"
   }).then(function(response){
       //this grabs the first index in the object array and gets the calories for it
       activitiesSummary = response;
<<<<<<< modal
       console.log(response);

       activitiesSummary.forEach(function (value) {
        console.log('this: ', value);
        var entry = document.createElement('div');
            entry.classList.add('has-background-grey-lighter');
            entry.classList.add('corners-rounded');
            entry.innerHTML = `<p class="margin-small">Distance: ${value.distance}</p>` + `<p class="margin-small">Duration: ${value.duration}</p>`;
        $('#completed0').append(entry);
       });
    });
});





=======
       console.log(activitiesSummary);
    
   })
})
>>>>>>> master

//firebase data
var config = {
    apiKey: "AIzaSyDoB53ra_Ww0RrOLHrUUADmGIMGMuKKZz8",
    authDomain: "project1-91897.firebaseapp.com",
    databaseURL: "https://project1-91897.firebaseio.com",
    projectId: "project1-91897",
    storageBucket: "project1-91897.appspot.com",
    messagingSenderId: "593996265632"
  };
  firebase.initializeApp(config);

var database = firebase.database();

//variables storing information relevant to Recipe API

$("#run").on("click", function(event) {

    event.preventDefault();

    var recipeSearch = "chicken";
    var recipeAppId = "&app_id=84dfbeab";
    var recipeApiKey = "&app_key=b2a7ec1260a71c648f7c481c5934f15b";
    var numberOfRecipes = "&from=0&to=20";
    var caloriesQuery = "&calories=" + activitiesSummary[0].calories; //add data from Human API per activity
    var health = "&healthLabel=no-sugar"; //add limiting food group from dropdown menu --> see HEALTH documentation in the Recipes API
    var queryURL = "https://api.edamam.com/search?q=" + recipeSearch + recipeAppId + recipeApiKey + numberOfRecipes + caloriesQuery;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response)
    })

});

var weatherAPI = "?apikey=YmtcFPorPCo5IQDz9HzhufW3JeeVaA2f";
var weatherURL = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/329823" + weatherAPI;

$.ajax({
    url: weatherURL,
    method: "GET"
}).then(function(response){
    console.log(response)
})