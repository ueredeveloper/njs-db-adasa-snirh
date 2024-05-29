import SubterraneaModel from "../models/adasa-grants-model";
import { getInterferenceType } from "../utils";

const { default: ListAdasaView } = require("../views/list-adasa-view")


const ListAdasaGrantsController = {
    init: async function (btnIndexId, snirhGrant) {

        let { INT_NU_LATITUDE: latitude, INT_NU_LONGITUDE: longitude, INT_TIN_CD, INT_TSU_CD  } = snirhGrant;

        let ti = getInterferenceType(INT_TIN_CD, INT_TSU_CD)

        ListAdasaView.init(snirhGrant, btnIndexId, latitude, longitude, ti);
    }
}

export default ListAdasaGrantsController;