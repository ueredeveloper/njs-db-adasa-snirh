const { default: ListGrantsController } = require("./controllers/list-grants-controller");
const { default: TabGrantsView } = require("./views/tab-grants-view");

TabGrantsView.init();
ListGrantsController.init();