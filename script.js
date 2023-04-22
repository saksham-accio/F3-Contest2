const fetchBtn = document.querySelector("#fetchBtn");
const mapDiv = document.querySelector("#map");
const latitudeValue = document.querySelector("#latitudeValue");
const longitudeValue = document.querySelector("#longitudeValue");
const mapWrapper = document.querySelector(".mapWrapper");
const weatherWrapper = document.querySelector(".weatherWrapper");
const weatherContent = document.querySelector(".weatherContent");

function getlocation() {
    if (navigator.geolocation) {
        fetchBtn.style.display = "none";
        mapWrapper.style.display = "block";
        navigator.geolocation.getCurrentPosition(showPos, showErr);
        weatherWrapper.style.display = "block";
    } else {
        alert("Sorry! your Browser does not support Geolocation API");
        fetchBtn.style.display = "block";
        mapWrapper.style.display = "none";
    }
}
//Showing Current Position on Google Map
function showPos(position) {
    latt = position.coords.latitude;
    long = position.coords.longitude;

    latitudeValue.innerText = latt;
    longitudeValue.innerText = long;

    var lattlong = new google.maps.LatLng(latt, long);
    var myOptions = {
        center: lattlong,
        zoom: 15,
        mapTypeControl: true,
        navigationControlOptions: {
            style: google.maps.NavigationControlStyle.SMALL,
        },
    };
    var maps = new google.maps.Map(mapDiv, myOptions);
    var markers = new google.maps.Marker({
        position: lattlong,
        map: maps,
        title: "You are here!",
    });
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latt}&lon=${long}&appid=e33fcf9b7c069675a79450acbc53a1a6`;

    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            weatherContent.innerHTML = `
                <ul>
                    <li>Location : ${data.name}</li>
                    <li class="inlineListItem"><span>Lat : ${data.coord.lat}</span><span>Long : ${data.coord.lon}</span></li>
                    <li>TimeZone : ${data.timezone}</li>
                    <li>Wind Speed : ${data.wind.speed}</li>
                    <li>Pressure : ${data.main.pressure}</li>
                    <li>Humidity : ${data.main.humidity}</li>
                    <li>Wind Direction : ${data.wind.deg}</li>
                    <li>UV Index : ${data.visibility}</li>
                    <li>Feels Like : ${data.main.feels_like}</li>
                </ul>
            `
            // temperature.textContent = Math.floor(data.main.temp - kelvin) + "°C";
            // summary.textContent = data.weather[0].description;
            // loc.textContent = data.name + "," + data.sys.country;
            // let icon1 = data.weather[0].icon;
            // icon.innerHTML = `<img src="icons/${icon1}.svg" style= 'height:10rem'/>`;


        });
}

//Handling Error and Rejection
function showErr(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation API.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("USer location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

