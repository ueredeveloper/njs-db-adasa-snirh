import MapModel from "../models/map-model";

const MapView = {
    init: function () {
        // Initialize the map
        MapModel.initMap();
        // Add event listeners or other view-related initialization here

        let adasaPosition = {lat: -15.7651947,lng: -47.8903739}
        this.addMarker(adasaPosition)
    },

    // Example function to add marker to the map
    addMarker: function (position) {
        MapModel.addMarker(position);
    }
};

export default MapView;
