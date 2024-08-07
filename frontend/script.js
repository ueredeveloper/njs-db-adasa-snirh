const { default: ListGrantsSNIRHController } = require("./controllers/list-grants-snirh-controller");
const { default: ListHandlersController } = require("./controllers/list-handlers-controller");
const { default: ManageDataControler } = require("./controllers/manage-data-controller");
const { default: MapController } = require("./controllers/map-controller");
const { default: TopHandlersController } = require("./controllers/top-handlers-controller");
const { default: TabGrantsView } = require("./views/tab-grants-view");


TopHandlersController.init();
MapController.init();
ManageDataControler.init();
TabGrantsView.init();

ListGrantsSNIRHController.init()
ListHandlersController.init();