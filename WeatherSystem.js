class WeatherSystem {
    constructor(mapOnClick) {
        this.mMap = L.map('map').setView([20, 20], 2);

        // Add the OpenStreetMap tiles to the map
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.mMap);

        this.mMap.on('click', mapOnClick);
        this.mSelectedMarker = null;
        this.mMarkers = [];

        let ctx = document.getElementById('forecast_chart').getContext('2d');
        let config = {
            type: 'bar',
            data: {
                labels: [],
                datasets: [
                    {
                        label: 'Maximum Temperature (°C)',
                        data: [],
                        backgroundColor: 'rgba(54, 162, 235, 0.7)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Minimum Temperature (°C)',
                        data: [],
                        backgroundColor: 'rgba(255, 99, 132, 0.7)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                indexAxis: 'y',
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: 'Dates (YYYY-MM-DD)'
                        }
                    },
                    x: {
                        position: 'top'
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                }
            }
        };

        this.mChart = new Chart(ctx, config);
    }

    AddMarkers(jsonArray) {
        for (let i = 0; i < jsonArray.length; i++) {
            let marker = new LocationMarker(jsonArray[i], this);
            this.mMap.addLayer(marker);
            this.mMarkers.push(marker);
        }
    }

    SelectMarker(marker) {
        if (this.mSelectedMarker) {
            this.mSelectedMarker.UnClick();
        }

        if (marker != this.mSelectedMarker) {
            marker.Click(this.mChart);
            this.mSelectedMarker = marker;
        } else {
            this.mSelectedMarker = null;
        }
    }
}
