const { default: ListGrantsController } = require("./controllers/list-grants-controller");
const { default: MapController } = require("./controllers/map-controller");
const { default: ListGrantsSNIRHController } = require("./controllers/snirh/list-grants-snirh-controller");
const { default: TabGrantsView } = require("./views/tab-grants-view");

MapController.init();
TabGrantsView.init();
ListGrantsController.init();
ListGrantsSNIRHController.init()