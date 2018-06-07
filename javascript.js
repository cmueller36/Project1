//User Variables with Access tokens - the access token is added to the API to call the user information
var tokenChris = "8ca56d8bd42e31e70a1104a9dc5fd89f26f20474";
var tokenJordan = "t-mZj_5LAmXZaYzqpSvhUKl1wiE=AjjK-jpf1669011c1fd767db3eb85fc5614bbd0c85920f860da5b9378340236b9340c142fea80e7b6a20a845512bc0f1ee373b17dbab5b58ecb0155d8728540ee948c7869497e85866ff6f84a07cd5f9ff035d0be5896899c793fbc35c26597b118876b24adece043e984a055577c80eead4622b";
var tokenClaire ="";
var tokenAnna = "";
var tokenJasmine = "";

//User dropdown selection
// var userSelected = "";
// $("button").on("click",function(){
//     userSelected = "";
// })


//Human API for getting activity summary
$("button").on("click",function(){
   //Activity Summary URL
   summaryURL = "https://api.humanapi.co/v1/human/activities/summaries?access_token="+tokenChris;

   $.ajax({
       url: summaryURL,
       method:"GET"
   }).then(function(response){
       //this grabs the first index in the object array and gets the calories for it
       var summaryCalories = response[0].calories;
       console.log(summaryCalories);
   })
})


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
var recipeSearch = "chicken";
var recipeAppId = "&app_id=c8284a5e";
var recipeApiKey = "&app_key=f9089a432857da4b4db6c2f729879c06";
var numberOfRecipes = "&from=0&to=20";
var calories = "&calories=500-800"; //add data from Human API per activity
var health = "&health=no-sugar"; //add limiting food group from dropdown menu --> see HEALTH documentation in the Recipes API
var queryURL = "https://api.edamam.com/search?q=" + recipeSearch + recipeAppId + recipeApiKey;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    console.log(response)
})