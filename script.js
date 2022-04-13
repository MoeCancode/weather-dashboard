var apiKey = "ec1adb15cd1e6cb24a504f57722bba8d"
var searchButton = document.querySelector("#search");
var date = moment().format('MMMM Do, YYYY');
var mainWeatherIcon = document.querySelector("#weatherIcon");
var whereDateGoes = document.querySelector("#dateGoesHere");
whereDateGoes.innerHTML = `(${date})`;
var sideLeft = document.querySelector(".leftSide");
var citySearch = document.querySelector("#searchForm");
var alreadyssigned = false;
var memoryStore = [];

console.log(localStorage);

if(localStorage.length != 0 || localStorage.getItem("cities") != null) {

    console.log(JSON.parse(localStorage.getItem("cities")).length)

    for(var q = 0; q<(JSON.parse(localStorage.getItem("cities")).length); q++) {
        var storageButtons = document.createElement("button");

        var storeArray = JSON.parse(localStorage.getItem("cities"));
        console.log(storeArray);
        storageButtons.innerHTML = storeArray[q];
        storageButtons.classList.add("searchHistoryButton");
        sideLeft.append(storageButtons);

        storageButtons.addEventListener("click", function(e) {
            citySearch.value = e.target.textContent;
                fetchWeather(e.target.textContent);
        })
}
}

//function called when search button is clicked
searchButton.addEventListener("click", function(e) {
    e.preventDefault();
    var chosenCity = document.querySelector("#searchForm").value;

    fetchWeather(chosenCity);


        memoryStore.push(chosenCity);
        localStorage.setItem("cities", JSON.stringify(memoryStore));
    
})

//function that generates url for the city using longitude and latitude
async function fetchWeather(searchBarInput) {
    console.log(searchBarInput);
    var geoDataObject = await fetchGeoCode(searchBarInput);
    // console.log(geoDataObject);
    var lon = geoDataObject[0].lon;
    var lat = geoDataObject[0].lat;
    var weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
    
    // fetch(weatherURL).then(response =>response.json()).then(data => displayUpperData(data));
    fetch(weatherURL).then(function(response) {
        console.log(response.ok);

             return response.json();

        
    }).then(function(data) {
        console.log(data);
    
            var cityButton = document.createElement("button");
            cityButton.innerHTML = citySearch.value;
            cityButton.classList.add("searchHistoryButton");
            sideLeft.append(cityButton);
            

            cityButton.addEventListener("click", function(e) {
                console.log("clickity");
                citySearch.value = e.target.textContent;
                fetchWeather(e.target.textContent);
                // console.log(e.target.textContent);
            })
        

        displayUpperData(data);
    })
}

//function that takes city name and gives back object containing longitude and latitude
function fetchGeoCode(cityname) {
    console.log(cityname);
    var geoCodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityname}&appid=${apiKey}`

   var geoData = fetch(geoCodeURL).then(response => response.json()).then(data => data);

return geoData;
}

function displayUpperData(theData) {
    //Create Recent search button
    console.log(theData);
    // console.log(theData);
    
    var theTemperature = document.querySelector("#temperature");
    theTemperature.innerHTML = theData.current.temp + " F";

    var theHumidity = document.querySelector("#humidity");
    theHumidity.innerHTML = theData.current.humidity + "%";

    var theWindSpeed = document.querySelector("#windSpeed");
    theWindSpeed.innerHTML = theData.current.wind_speed + " MPH";

    var theUVIndex = document.querySelector("#uvIndex");
    theUVIndex.innerHTML = theData.current.uvi;

    var cityChosen = document.querySelector("#myCity");
    cityChosen.innerHTML = document.querySelector("#searchForm").value + " ";

    var icon = theData.current.weather[0].icon;
    mainWeatherIcon.src= `https://openweathermap.org/img/wn/${icon}@2x.png`;

    uvIndexColor(theData.current.uvi);
    displayLowerData(theData);
}

//Function that adds color to uv index 
function uvIndexColor(val) {
    if(val > 7) {
        document.querySelector("#uvIndex").style.backgroundColor = "rgb(134, 31, 31)";
    }
    else if(val > 4) {
        document.querySelector("#uvIndex").style.backgroundColor = "rgb(234, 186, 57)";
    }
    else {
        document.querySelector("#uvIndex").style.backgroundColor = "rgb(23, 104, 23)";
    }
}

function displayLowerData(theDataObject) {
    console.log(theDataObject);

    //Update dates for the next five days in the daycards
    var traverseDiv = document.querySelector("#traverse");
    traverseDiv.style.opacity = "1";

    for(var i =0; i<5; i++) {
        traverseDiv.children[i].innerHTML = moment().add(i+1,'days').format('MMMM Do, YYYY');
        // console.log(traverseDiv.children[i]);
    }
    
    for(var x = 0; x < 5; x++) {
    
        //Update icon for next 5 days
        var smallIcon = theDataObject.daily[x].weather[0].icon;
        var newImg = document.createElement("img");
        newImg.src = `https://openweathermap.org/img/wn/${smallIcon}@2x.png`;
        newImg.classList.add("resize");
        traverseDiv.children[x].appendChild(newImg);
    
       
        //Update Temperature for next 5 days
        var dayTemperature = theDataObject.daily[x].temp.day; 

        var newDiv1 = document.createElement("p")
        newDiv1.innerHTML = "Temperature: " + dayTemperature + " F";
        newDiv1.classList.add("daycardInfo");
        traverseDiv.children[x].appendChild(newDiv1);

        //Update humidity for next 5 days
        var dayHumidity = theDataObject.daily[x].humidity; 

        var newDiv2 = document.createElement("p");
        newDiv2.innerHTML = "Humidity: " + dayHumidity + "%";
        newDiv2.classList.add("daycardInfo");
        traverseDiv.children[x].appendChild(newDiv2);

    }

}


// 