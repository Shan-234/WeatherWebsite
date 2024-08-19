const accuWeatherApiKey = 'ohcWJbAu7v1CeoUXpJQmX7hndBq2ASnt';
const googleApiKey = 'AIzaSyCGbGqGj08Q-flsrNm4tTORRr4Krk1jebg';

let system = new WeatherSystem(function(event) {
    const apiKey = googleApiKey;
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=' + apiKey;

    fetch(url).then(response => {
        if (response.ok) {
            return response.json();
        }

        throw new Error('Request failed!');
    }, networkError => console.log(networkError.message)).then(jsonResponse => {
        console.log(jsonResponse);
    });
});

fetch('http://dataservice.accuweather.com/locations/v1/topcities/150?apikey=' + accuWeatherApiKey).then(response => {
    if (response.ok) {
        return response.json();
    }

    throw new Error('Request Failed!');
}, networkError => console.log(networkError.message)).then(jsonResponse => {
    console.log(jsonResponse);
    system.AddMarkers(jsonResponse);
});

// let map = L.map('map').setView([25, 20], 2);

// // Add the OpenStreetMap tiles to the map
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

// map.on('click', function(event) {
//     const apiKey = 'AIzaSyCGbGqGj08Q-flsrNm4tTORRr4Krk1jebg';
//     const lat = event.latlng.lat;
//     const lng = event.latlng.lng;
//     const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=' + apiKey;

//     fetch(url).then(response => {
//         if (response.ok) {
//             return response.json();
//         }

//         throw new Error('Request failed!');
//     }, networkError => console.log(networkError.message)).then(jsonResponse => {
//         console.log(jsonResponse);
//     });
// });

// const search = () => {
//     const city = document.getElementById("searchCity").value;
//     fetch('http://dataservice.accuweather.com/locations/v1/cities/search?apikey=ohcWJbAu7v1CeoUXpJQmX7hndBq2ASnt&q=' + city).then(response => {
//         if (response.ok) {
//             return response.json();
//         }

//         throw new Error('Request failed!');
//     }, networkError => console.log(networkError.message)).then(jsonResponse1 => {
//         console.log(jsonResponse1);
//         const locationKey = jsonResponse1[0].Key;
//         const url = 'http://dataservice.accuweather.com/forecasts/v1/daily/1day/' + locationKey + '?apikey=ohcWJbAu7v1CeoUXpJQmX7hndBq2ASnt';

//         fetch(url).then(response => {
//             if (response.ok) {
//                 return response.json();
//             }

//             throw new Error('Request failed!');
//         }, networkError => console.log(networkError.message)).then(jsonResponse2 => {
//             console.log(jsonResponse2);
//             const cityName = jsonResponse1[0].EnglishName;
//             const countryName = jsonResponse1[0].Country.EnglishName;
//             document.getElementById("city").textContent = "City: " + cityName + ", " + countryName;

//             const forecasts = jsonResponse2.DailyForecasts;
//             const data = forecasts[0];
//             let minTemp = convertToCelsius(data.Temperature.Minimum.Value);
//             let maxTemp = convertToCelsius(data.Temperature.Maximum.Value);

//             document.getElementById("min_temp").textContent = "Minimum Temperature: " + minTemp + "°C";
//             document.getElementById("max_temp").textContent = "Maximum Temperature: " + maxTemp + "°C";
//         });
//     });
// };

// const convertToCelsius = (temp) => {
//     return Math.floor((temp - 32) * 5 / 9);
// };
