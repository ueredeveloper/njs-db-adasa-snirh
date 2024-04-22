import SubterraneaModel from "../models/subterranea-model";
import { getInterferenceType } from "../utils";

const { default: ListAdasaView } = require("../views/list-adasa-view")


const ListGrantsController = {
    init: async function (btnIndexId, snirhGrant) {

        let { INT_NU_LATITUDE: latitude, INT_NU_LONGITUDE: longitude, INT_TIN_CD, INT_TSU_CD  } = snirhGrant;

        let ti = getInterferenceType(INT_TIN_CD, INT_TSU_CD)

        ListAdasaView.init(btnIndexId, latitude, longitude, ti);
    }
}

export default ListGrantsController;