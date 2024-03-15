import SubterraneaModel from "../models/subterranea-model";
import { fetchSubterraneo } from "../services/fetchSubterraneo";

const { default: ListGrantsView } = require("../views/list-grants-view")

const ListGrantsController = {
    init: async function(){

        //GrantsModels.grants = await fetchAllGrants();
        SubterraneaModel.list = await SubterraneaModel.listSubterraneas()
        ListGrantsView.init();
    }
}

export default ListGrantsController;