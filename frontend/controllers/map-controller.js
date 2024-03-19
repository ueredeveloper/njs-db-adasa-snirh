import MapView from "../views/map-view";


const MapController = {
    init: function () {
        // Initialize the view
        MapView.init();

        // Example: Add marker to the map
        const markerPosition = {lat: -34.397, lng: 150.644};
        MapView.addMarker(markerPosition);
    }
};

export default MapController;
