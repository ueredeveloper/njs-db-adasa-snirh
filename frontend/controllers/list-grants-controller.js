import SubterraneaModel from "../models/subterranea-model";
import { fetchSubterraneo } from "../services/fetchSubterraneo";
import selectClosestPoints from "../services/select-closest-points";

const { default: ListGrantsView } = require("../views/list-adasa-view")


const ListGrantsController = {
    init: async function (btnIndexId, snirhGrant) {

        let { INT_NU_LATITUDE: latitude, INT_NU_LONGITUDE: longitude } = snirhGrant;


        //GrantsModels.grants = await fetchAllGrants();
        SubterraneaModel.list = await SubterraneaModel.selectClosestPoints(latitude, longitude)
        ListGrantsView.init(btnIndexId);
    }
}

export default ListGrantsController;