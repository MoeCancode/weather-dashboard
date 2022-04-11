var apiKey = "ec1adb15cd1e6cb24a504f57722bba8d"
var searchButton = document.querySelector("#search");

//
async function fetchWeather(searchBarInput) {
    var geoDataObject = await fetchGeoCode(searchBarInput);
    console.log(geoDataObject);
    var lon = geoDataObject[0].lon;
    var lat = geoDataObject[0].lat;
    var weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`
    
    fetch(weatherURL).then(response =>response.json()).then(data => console.log(data));
    // displayData(data);
}


function fetchGeoCode(cityname) {
    var geoCodeURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityname}&appid=${apiKey}`
   var geoData = fetch(geoCodeURL).then(response => response.json())
    .then(data => data);
    return geoData;
}

searchButton.addEventListener("click", function(e) {
    e.preventDefault();
    var chosenCity = document.querySelector("#searchForm").value;
    fetchWeather(chosenCity);
})
