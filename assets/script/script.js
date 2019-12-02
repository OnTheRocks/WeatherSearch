console.log("Hi from Script!")

$("#findCity").on("click", function(event) {

  event.preventDefault();

  var city = $("#cityInput").val();

  console.log(city);

  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=e71e90eede3cf2d964e119691ce61ab1"

  console.log(queryURL);
  // console.log(city);

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    $("#weatherView").text(JSON.stringify(response)); 
    


    console.log(response.name);
    console.log(response.main.temp);
    console.log(response.coord.lat);
    console.log(response.coord.lon);
    console.log(response.main.humidity);
    console.log(response.wind.speed);
    console.log(response);
  });  
}); 