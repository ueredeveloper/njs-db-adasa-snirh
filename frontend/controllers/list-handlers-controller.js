const { default: ListHandlersView } = require("../views/list-handlers-view")

const ListHandlersController = {
    init: function (){
        this.listHandlersView = ListHandlersView.init()
    }
}

export default ListHandlersController;