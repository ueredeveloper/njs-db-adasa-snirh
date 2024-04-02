import SubterraneaModel from "../models/subterranea-model";

const { default: ListAdasaView } = require("../views/list-adasa-view")


const ListGrantsController = {
    init: async function (btnIndexId, snirhGrant) {

        let { INT_NU_LATITUDE: latitude, INT_NU_LONGITUDE: longitude } = snirhGrant;

        ListAdasaView.init(btnIndexId, latitude, longitude);
    }
}

export default ListGrantsController;