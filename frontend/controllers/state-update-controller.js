import { getInterferenceType } from "../utils";
import StateUpdateView from "../views/state-update-view";


const StateUpdateController = {
    init: async function (btnIndexId, snirhGrant) {

        let { INT_NU_LATITUDE: latitude, INT_NU_LONGITUDE: longitude, INT_TIN_CD, INT_TSU_CD } = snirhGrant;

        let ti = getInterferenceType(INT_TIN_CD, INT_TSU_CD)

        StateUpdateView.init(snirhGrant, btnIndexId, latitude, longitude, ti);
    }
}

export default StateUpdateController;