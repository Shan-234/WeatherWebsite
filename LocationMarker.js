const DefaultIcon = L.divIcon({
    className: 'custom-div-icon',
    html: '<div style="background-color: blue; width: 10px; height: 10px; border-radius: 50%; border: 2px solid white;"></div>',
    iconSize: [20, 20], // Size of the icon [width, height]
    iconAnchor: [10, 10] // Point of the icon which will correspond to marker's location [x, y]
});

const SelectedIcon = L.divIcon({
    className: 'custom-div-icon',
    html: '<div style="background-color: green; width: 10px; height: 10px; border-radius: 50%; border: 2px solid white;"></div>',
    iconSize: [20, 20], // Size of the icon [width, height]
    iconAnchor: [10, 10] // Point of the icon which will correspond to marker's location [x, y]
});

const ConvertToCelsius = (temp) => {
    return Math.floor((temp - 32) * 5 / 9);
};

class LocationMarker extends L.Marker {
    constructor(jsonData, weatherSystem) {
        const latLng = [jsonData.GeoPosition.Latitude, jsonData.GeoPosition.Longitude];
        super(latLng, {icon: DefaultIcon});
        this.mData = jsonData;
        this.mClicked = false;
        this.on('click', function() {
            weatherSystem.SelectMarker(this);
        });
    }

    Click() {
        this.setIcon(SelectedIcon);
        this.mClicked = true;

        const locationKey = this.mData.Key;
        const url = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/' + locationKey + '?apikey=ohcWJbAu7v1CeoUXpJQmX7hndBq2ASnt';

        fetch(url).then(response => {
            if (response.ok) {
                return response.json();
            }

            throw new Error('Request failed!');
        }, networkError => console.log(networkError.message)).then(jsonResponse => {
            console.log(jsonResponse);
            const forecast = jsonResponse.DailyForecasts[0];
            const minTemp = ConvertToCelsius(forecast.Temperature.Minimum.Value);
            const maxTemp = ConvertToCelsius(forecast.Temperature.Maximum.Value);
            document.getElementById("city").textContent = this.mData.LocalizedName;
            document.getElementById("min_temp").textContent = "Minimum Temperature: " + minTemp + "°C";
            document.getElementById("max_temp").textContent = "Maximum Temperature: " + maxTemp + "°C";
        });
    }

    UnClick() {
        this.setIcon(DefaultIcon);
        this.mClicked = false;
    }
}