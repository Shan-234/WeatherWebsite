class WeatherSystem {
    constructor(mapOnClick) {
        this.mMap = L.map('map').setView([20, 20], 2);

        // Add the OpenStreetMap tiles to the map
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.mMap);

        this.mMap.on('click', mapOnClick);
        this.mSelectedMarker = null;
        this.mMarkers = []
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
            marker.Click();
            this.mSelectedMarker = marker;
        } else {
            this.mSelectedMarker = null;
        }
    }
}