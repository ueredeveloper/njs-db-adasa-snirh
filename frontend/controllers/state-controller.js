import { getInterferenceType } from "../utils";
const { default: StateView } = require("../views/state-view")

const StateController = {
    initInsertData: async function (params) {


        StateView.init()
    },
    init: async function (btnIndexId, snirhGrant) {

        let { INT_NU_LATITUDE: latitude, INT_NU_LONGITUDE: longitude, INT_TIN_CD, INT_TSU_CD  } = snirhGrant;

        let ti = getInterferenceType(INT_TIN_CD, INT_TSU_CD)

        StateView.init(snirhGrant, btnIndexId, latitude, longitude, ti);
    }
}

export default StateController;