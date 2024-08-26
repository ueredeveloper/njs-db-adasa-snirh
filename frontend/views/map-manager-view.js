import MapView from "./map-view";

const MapManagerView = {
    init: async function () {
        this.div = $('#map-manager-view');
        this.render();

        $(document).on("click", "button#btn-clear-map", function () {
            MapView.clearMarkers()
        });

    },
    render: function () {
        this.div.append(`
            <button id="btn-clear-map" class="m-2 bg-gray-200 cursor-pointer rounded-lg hover:bg-violet-600 active:bg-violet-700"> Limpar Mapa</button>
            `)
    }

}

export default MapManagerView;