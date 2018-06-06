//User Variables with Access tokens - the access token is added to the API to call the user information
var tokenChris = "8ca56d8bd42e31e70a1104a9dc5fd89f26f20474";
var tokenJordan = "t-mZj_5LAmXZaYzqpSvhUKl1wiE=AjjK-jpf1669011c1fd767db3eb85fc5614bbd0c85920f860da5b9378340236b9340c142fea80e7b6a20a845512bc0f1ee373b17dbab5b58ecb0155d8728540ee948c7869497e85866ff6f84a07cd5f9ff035d0be5896899c793fbc35c26597b118876b24adece043e984a055577c80eead4622b";
var tokenClaire ="";
var tokenAnna = "";
var tokenJasmine = "";

//User dropdown selection
var userSelected = "";
$(body).on("click",function(){
    userSelected = "";
})


//Human API for getting activity summary
$(body).on("click",function(){
   //Activity Summary URL
   summaryURL = "https://api.humanapi.co/v1/human/activities/summaries?access_token="+userSelected;
})