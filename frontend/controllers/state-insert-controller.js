import StateInsertView from "../views/state-insert-view";
import TopHandlersStateInsertView from "../views/top-handlers-state-insert-view";

const StateInsertController = {
    init: async function () {
        this.topHandlersStateInsertView = TopHandlersStateInsertView.init();
        StateInsertView.init()
    }
}

export default StateInsertController;