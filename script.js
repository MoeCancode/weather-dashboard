var apiKey = "ec1adb15cd1e6cb24a504f57722bba8d"


function fetchGeoCode(cityname, statecode, countrycode) {
    var geoCodeURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityname},${statecode},${countrycode}&appid=${apiKey}`
   var geoData = fetch(geoCodeURL).then(response => response.json())
    .then(data => data);
    return geoData;
}

async function fetchWeather() {
    var geoDataObject = await fetchGeoCode("Danville", "CA", "US");
    console.log(geoDataObject);
    var lon = geoDataObject[0].lon;
    var lat = geoDataObject[0].lat;
    var weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`
    
    fetch(weatherURL).then(response =>response.json()).then(data => console.log(data));
}
fetchWeather();