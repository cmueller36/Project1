//initializing firebase database
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
var recipeSearch;
var recipeAppId = "c8284a5e";
var recipeApiKey = "f9089a432857da4b4db6c2f729879c06";
var numberOfRecipes = "&from=0&to=20";
var calories = "&calories=" + $().value().trim();
var health = "&health=" + $().value().trim();
var queryURL = "https://api.edamam.com/search?q=";