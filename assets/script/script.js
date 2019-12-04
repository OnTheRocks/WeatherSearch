console.log("Hi from Script!")

$("#findCity").on("click", function(event) {

  event.preventDefault();

  var city = $("#cityInput").val();

  console.log(city);

  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=e71e90eede3cf2d964e119691ce61ab1"

  console.log(queryURL);
  // console.log(city);

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    // $("#weatherView").text(JSON.stringify(response));
    
        // Converts the UNIX timestamp from API pull to readable Date.
        var weatherDate = moment.unix(response.dt);

  var lat = response.coord.lat
  var lon = response.coord.lat      
  var uvQueryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=e71e90eede3cf2d964e119691ce61ab1&lat=" + lat + "&lon=" + lon

  // Gets UVIndex....
  $.ajax({
    url: uvQueryURL,
    method: "GET"
  }).then(function(uviResponse) {
    // $("#weatherView").text(JSON.stringify(uviResponse));

    $("#srchResult").removeClass("hidden");

    $(".card-header").text(response.name + " Weather Details  --  " + weatherDate.format("MM/DD/YYYY"));    
    $("#liTemp").text("Temperature: " +  response.main.temp);
    $("#liHumitity").text("Humidity: " + response.main.humidity);
    $("#liWindSpeed").text("Wind Speed: " + response.wind.speed);
    $("#liUVI").text("UV Index: " + uviResponse.value);
    


    // debugging

    console.log(uvQueryURL);
    console.log("Date: " +  weatherDate.format("MM/DD/YYYY"));
    console.log(response.dt);
    console.log(response.name);
    console.log(response.main.temp);
    console.log(response.coord.lat);
    console.log(response.coord.lon);
    console.log(response.main.humidity);
    console.log(response.wind.speed);

    console.log(response);
    console.log(uviResponse);

  });  
  }); 
});