const { default: FederalController } = require("./controllers/federal-controller");
const { default: ListHandlersController } = require("./controllers/list-handlers-controller");
const { default: ManageDataControler } = require("./controllers/manage-data-controller");
const { default: MapController } = require("./controllers/map-controller");

const { default: TopHandlersController } = require("./controllers/top-handlers-controller");
const { default: TabInsertView } = require("./views/tab-insert-view");
const { default: TabUpdateView } = require("./views/tab-update-view");
const { default: StateInsertController } = require("./controllers/state-insert-controller");

TopHandlersController.init();
MapController.init();
ManageDataControler.init();

TabInsertView.init();
TabUpdateView.init();

StateInsertController.init();
FederalController.init();

ListHandlersController.init();