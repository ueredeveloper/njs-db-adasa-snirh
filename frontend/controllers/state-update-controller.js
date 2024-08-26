import { getInterferenceType } from "../utils";
import StateUpdateView from "../views/state-update-view";


const StateUpdateController = {
    init: async function (btnIndexId, federalGrant) {

        let { INT_NU_LATITUDE: latitude, INT_NU_LONGITUDE: longitude, INT_TIN_CD, INT_TSU_CD } = federalGrant;

        let ti = getInterferenceType(INT_TIN_CD, INT_TSU_CD)

        StateUpdateView.init(federalGrant, btnIndexId, latitude, longitude, ti);
    }
}

export default StateUpdateController;