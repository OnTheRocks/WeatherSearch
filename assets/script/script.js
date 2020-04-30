console.log("Hi from Script!")

$("#findCity").on("click", function(event) {

  event.preventDefault();

  // clears existing data
  $("#liIcon").empty();
  $("#fiveDay").empty(); 

  var city = $("#cityInput").val();

  console.log(city);

  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=e71e90eede3cf2d964e119691ce61ab1"
  var fiveDayQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&APPID=e71e90eede3cf2d964e119691ce61ab1"
  


  console.log(queryURL);
  console.log(fiveDayQueryURL);
  // console.log(city);

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    // $("#weatherView").text(JSON.stringify(response));
    
        // Converts the UNIX timestamp from API pull to readable Date.
        var weatherDate = moment.unix(response.dt);

        // Get weather icon.
  var icon = response.weather[0].icon
  var iconUrl = "https://openweathermap.org/img/wn/" + icon + ".png"

        // Get lat and lon for UVI.
  var lat = response.coord.lat
  var lon = response.coord.lat   
  
        // create URL for UVI.
  var uvQueryURL = "https://api.openweathermap.org/data/2.5/uvi?APPID=e71e90eede3cf2d964e119691ce61ab1&lat=" + lat + "&lon=" + lon

  // Gets UVIndex....
  $.ajax({
    url: uvQueryURL,
    method: "GET"
  }).then(function(uviResponse) {

    // Gets 5 day
  $.ajax({
    url: fiveDayQueryURL,
    method: "GET"
  }).then(function(fiveDayResponse) { 

    var icon5day = fiveDayResponse.list[0].weather[0].icon
    var iconUrl5day = "https://openweathermap.org/img/wn/" + icon5day + ".png"
    // $("#weatherView").text(JSON.stringify(fiveDayResponse));



  //  filling single day details.
    $("#srchResult").removeClass("hidden");
    $(".card-header").text(response.name + "  --  " + weatherDate.format("MM/DD/YYYY"));
    $("#liTemp").text("Temperature: " +  Math.round(response.main.temp) + " °F");
    $("#liIcon").append($("<img>").attr({"class":"icon","src":iconUrl}));
    $("#liHiTemp").text("High: " +  Math.round(response.main.temp_max) + " °F");
    $("#liLoTemp").text("Low: " +  Math.round(response.main.temp_min) + " °F");
    $("#liHumitity").text("Humidity: " + response.main.humidity + "%");
    $("#liWindSpeed").text("Wind Speed: " + response.wind.speed + " mph");
    $("#liUVI").text("UV Index: " + uviResponse.value);



    // 5-day forecast.
    for (i=1; i<40; i+=8) {
      var day = $("<div></div>");
      day.addClass("card mb-2 bg-primary text-white days").attr({"style":"width: 8rem"});  
      var cardBody = $("<div></div");
      cardBody.addClass("card-body");
      var cardDate = moment(fiveDayResponse.list[i].dt_txt);
      var icon5day = fiveDayResponse.list[i].weather[0].icon
      var iconUrl5day = "http://openweathermap.org/img/wn/" + icon5day + ".png"
      var cardIcon = $(`<div><img src="${iconUrl5day}" /></div>`); 
      var temp5dayHigh = $("<p></p>");
      temp5dayHigh.text("High: " + Math.round(fiveDayResponse.list[i].main.temp_max) + " °F");
      var temp5dayLow = $("<p></p>");
      temp5dayLow.text("Low: " + Math.round(fiveDayResponse.list[i].main.temp_min) + " °F");
      var humidity5day = $("<p></p>");
      humidity5day.text("Humitity: " + fiveDayResponse.list[i].main.humidity + "%");
      cardBody.append(cardDate.format("MM/DD/YYYY"));
      cardBody.append(cardIcon);
      cardBody.append(temp5dayHigh);
      cardBody.append(temp5dayLow);
      cardBody.append(humidity5day);
      day.append(cardBody);
      $("#fiveDay").append(day);

    };
  });  
  }); 
});
});



    // Save/pull to/from loacl Storage...

    // Geoloactoin feature...
 


    // debugging

    // console.log("The weather icon is: " + icon);
    // console.log("The weather icon URL is: " + iconUrl);
    // console.log(uvQueryURL);
    // console.log("Date: " +  weatherDate.format("MM/DD/YYYY"));
    // console.log(response.dt);
    // console.log(response.name);
    // console.log(response.main.temp);
    // console.log(response.coord.lat);
    // console.log(response.coord.lon);
    // console.log(response.main.humidity);
    // console.log(response.wind.speed);
    // console.log(response);
    // console.log(uviResponse);
    // console.log(fiveDayResponse);

 