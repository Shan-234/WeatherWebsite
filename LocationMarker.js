const DefaultIcon = L.divIcon({
    className: 'custom-div-icon',
    html: '<div style="background-color: blue; width: 10px; height: 10px; border-radius: 50%; border: 2px solid white;"></div>',
    iconSize: [20, 20], // Size of the icon [width, height]
    iconAnchor: [10, 10] // Point of the icon which will correspond to marker's location [x, y]
});

const SelectedIcon = L.divIcon({
    className: 'custom-div-icon',
    html: '<div style="background-color: green; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white;"></div>',
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

    Click(chart) {
        document.getElementById("city").textContent = this.mData.LocalizedName
        this.setIcon(SelectedIcon);
        this.mClicked = true;

        const locationKey = this.mData.Key;
        const url = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/' + locationKey + '?apikey=wGhrzGVpRQcN7D2F3eQeUmv2G7uqZoan';

        fetch(url).then(response => {
            if (response.ok) {
                return response.json();
            }

            throw new Error('Request failed!');
        }, networkError => console.log(networkError.message)).then(jsonResponse => {
            const forecasts = jsonResponse.DailyForecasts;
            console.log(forecasts);

            let dates = [];
            let maxTemps = [];
            let minTemps = [];

            for (let i = 0; i < forecasts.length; i++) {
                const forecast = forecasts[i];
                dates.push(forecast.Date.substring(0, 10));
                maxTemps.push(ConvertToCelsius(forecast.Temperature.Maximum.Value));
                minTemps.push(ConvertToCelsius(forecast.Temperature.Minimum.Value));
            }

            console.log(dates);
            console.log(maxTemps);
            console.log(minTemps);

            chart.data.labels = dates;
            chart.data.datasets[0].data = maxTemps;
            chart.data.datasets[1].data = minTemps;
            chart.update();
        });
    }

    UnClick() {
        this.setIcon(DefaultIcon);
        this.mClicked = false;
    }
}