let markers = []; // Array para armazenar os marcadores

const MapModel = {
    map: null, // Referência para o objeto do mapa

    /**
     * Inicializa o mapa.
     * @function
     */
    initMap: function () {
        // Inicializa o mapa com centro e zoom definidos
        this.map = new window.google.maps.Map(window.document.getElementById('map'), {
            center: { lat: -15.7495823, lng: -47.7086703 },
            zoom: 15
        });
    },

    /**
     * Adiciona um marcador ao mapa.
     * @function
     * @param {Object} position - A posição do marcador, contendo as propriedades lat (latitude) e lng (longitude).
     * @param {boolean} [animation] - Se true, aplica a animação de bounce ao marcador.
     */
    addMarker: function (position, animation) {
        let marker = new window.google.maps.Marker({
            position: position,
            map: this.map
        });
        markers.push(marker); // Adiciona o marcador ao array de marcadores

        if (animation) {
            marker.setAnimation(window.google.maps.Animation.BOUNCE); // Aplica animação de bounce se definido
        }
    },

    /**
     * Define o centro do mapa para uma posição específica.
     * @function
     * @param {Object} position - A posição para a qual o centro do mapa deve ser definido, contendo lat (latitude) e lng (longitude).
     */
    setMapCenter: function (position) {
        this.map.setCenter(position); // Centraliza o mapa na posição especificada
    },

    /**
     * Adiciona um marcador ao mapa com animação (pulo, bounce).
     * @function
     * @param {Object} position - A posição do marcador, contendo lat (latitude) e lng (longitude).
     */
    addMarkerWithBounceAnimation: function (position) {
        let marker = new window.google.maps.Marker({
            position: position,
            map: this.map
        });
        // Descomente a linha abaixo para aplicar a animação de bounce
        // marker.setAnimation(window.google.maps.Animation.BOUNCE);
    },

    /**
     * Remove todos os marcadores do mapa.
     * @function
     */
    clearMarkers: function () {
        for (let i = 0; i < markers.length; i++) {
            // Define o mapa associado ao marcador como null, removendo-o visualmente do mapa.
            markers[i].setMap(null); // Remove o marcador do mapa
        }
        markers = []; // Opcionalmente, limpa o array de marcadores
    }
};

export default MapModel;
