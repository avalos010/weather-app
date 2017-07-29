 if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        alert("Geolocation is not supported by this browser.");
    }

  function showPosition(position) {
    var latitude =  position.coords.latitude;
     var longitude = position.coords.longitude;
    
    $.getJSON('https://fcc-weather-api.glitch.me/api/current?lat='+latitude+'&lon='+longitude, function(data) {
      var locationName = $('<h2>'+ data.name + '</h2>');
      var currentTemp = $('<p> Current Temperature: ' + (Math.floor(data.main.temp * 1.8 + 32)) + '&#8457/ '+Math.floor(data.main.temp)+'&#8451</p>');
      var mood = $('<h3>'+data.weather[0].description+'</h3>');
      var img = $('<img src="'+data.weather[0].icon+'">');
      $('.weather').append(locationName,currentTemp,mood,img);
      console.log(data.weather[1].icon);
      
    });
  }