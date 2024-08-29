const { default: FederalController } = require("./controllers/federal-controller");
const { default: ListHandlersController } = require("./controllers/list-handlers-controller");
const { default: ManageDataControler } = require("./controllers/manage-data-controller");
const { default: MapController } = require("./controllers/map-controller");

const { default: TopHandlersController } = require("./controllers/top-handlers-controller");
const { default: TabInsertView } = require("./views/tab-insert-view");
const { default: TabUpdateView } = require("./views/tab-update-view");
const { default: StateInsertController } = require("./controllers/state-insert-controller");
const { default: TopHandlersStateController } = require("./controllers/top-handlers-state-controller");
const { default: MapManagerController } = require("./controllers/map-manager-controller");
const { default: FederalPaginationController } = require("./controllers/federal-pagination-controller");

TopHandlersController.init();
MapController.init();
MapManagerController.init();
ManageDataControler.init();

TabInsertView.init();
TabUpdateView.init();

StateInsertController.init();

FederalController.init();

ListHandlersController.init();
FederalPaginationController.init();