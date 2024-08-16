import MapModel from "../models/map-model";

/**
 * Representa a visualização do mapa.
 * @namespace
 */
const MapView = {
    /**
     * Inicializa a visualização do mapa.
     * @function
     */
    init: function () {
        // Inicializa o mapa
        MapModel.initMap();
        // Adiciona event listeners ou outras inicializações relacionadas à visualização aqui

        let statePosition = { lat: -15.7651947, lng: -47.8903739 }
        this.addMarker(statePosition)
    },

    /**
     * Adiciona um marcador ao mapa.
     * @function
     * @param {Object} position - A posição do marcador, com as propriedades lat (latitude) e lng (longitude).
     */
    addMarker: function (position, animation) {
        MapModel.addMarker(position, animation);
    },

    /**
     * Define o centro do mapa para uma posição específica.
     * @function
     * @param {Object} position - A posição para a qual o centro do mapa deve ser definido, com as propriedades lat (latitude) e lng (longitude).
     */
    setMapCenter: function (position) {
        MapModel.setMapCenter(position)
    }
};

export default MapView;
