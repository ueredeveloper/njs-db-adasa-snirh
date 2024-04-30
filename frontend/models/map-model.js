const MapModel = {
    
    // Function to initialize the map
    initMap: function () {
        // Initialize the map
        this.map = new window.google.maps.Map(window.document.getElementById('map'), {
            center: {lat: -15.7495823, lng: -47.7086703},
            zoom: 10
        });
    },

    // Function to add markers to the map
    addMarker: function (position, animation) {
        let marker = new window.google.maps.Marker({
            position: position,
            map: this.map
        });

        if (animation){
            marker.setAnimation(window.google.maps.Animation.BOUNCE); 
        }
    }, 
    setMapCenter : function (position){
        this.map.setCenter(position)
    },
    addMarkerWithBounceAnimation (position){
        let marker = new window.google.maps.Marker({
            position: position,
            map: this.map
        });
        //marker.setAnimation(window.google.maps.Animation.BOUNCE);
    }
};

export default MapModel;
