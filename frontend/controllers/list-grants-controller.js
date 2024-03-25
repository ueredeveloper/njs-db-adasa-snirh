import SubterraneaModel from "../models/subterranea-model";
import { fetchSubterraneo } from "../services/fetchSubterraneo";

const { default: ListGrantsView } = require("../views/list-grants-view")


const ListGrantsController = {
    init: async function(btnIndexId){

        //GrantsModels.grants = await fetchAllGrants();
        SubterraneaModel.list = await SubterraneaModel.listSubterraneas()
        ListGrantsView.init(btnIndexId);
    }
}

export default ListGrantsController;