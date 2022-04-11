var apiKey = "ec1adb15cd1e6cb24a504f57722bba8d"
var searchButton = document.querySelector("#search");
var date = moment().format('MMMM Do, YYYY');
var whereDateGoes = document.querySelector("#dateGoesHere");
whereDateGoes.innerHTML = `(${date})`;

//function called when search button is clicked
searchButton.addEventListener("click", function(e) {
    e.preventDefault();
    var chosenCity = document.querySelector("#searchForm").value;
    fetchWeather(chosenCity);
})

//function that generates url for the city using longitude and latitude
async function fetchWeather(searchBarInput) {
    var geoDataObject = await fetchGeoCode(searchBarInput);
    console.log(geoDataObject);
    var lon = geoDataObject[0].lon;
    var lat = geoDataObject[0].lat;
    var weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
    
    fetch(weatherURL).then(response =>response.json()).then(data => displayUpperData(data));
    // console.log(data);
    // displayLowerData(data);
}

//function that takes city name and gives back object containing longitude and latitude
function fetchGeoCode(cityname) {
    var geoCodeURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityname}&appid=${apiKey}`
   var geoData = fetch(geoCodeURL).then(response => response.json())
    .then(data => data);
    return geoData;
}

function displayUpperData(theData) {
    //Make variables that store required values
    //Update the text content on the HTML
    
    console.log(theData);
    var theTemperature = document.querySelector("#temperature");
    theTemperature.innerHTML = theData.current.temp + " F";
}


