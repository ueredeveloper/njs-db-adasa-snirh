const ListHandlersView = {
    init: function () {
        this.div = $('#list-handlers');

        this.render();
        $('#toggleColumns').change(function (e) {
  
            var isChecked = $(this).is(":checked");

            if (isChecked){

            } else {
                
            }

            let tagThead = $('#list-snirh-sub').find('thead');
            let tagTbody = $('#list-snirh-sub').find('tbody');

            let filteredTheadsIndex = [3, 4, 6, 7, 8];

           

            let thTrs = tagThead.find('tr');
            thTrs.each(function (index, tr) {
                let tds = $(tr).find('th');

                tds.each(function (index, th) {
                    if (!filteredTheadsIndex.includes(index)) { // Check if the current index is in the list
                        $(th).css("display", "none");
                    }
                });
            });

            let tbTrs = tagTbody.find('tr');
            tbTrs.each(function (index, tr) {
                let tds = $(tr).find('td');

                tds.each(function (index, td) {
                    if (!filteredTheadsIndex.includes(index)) { // Check if the current index is in the list
                        $(td).css("display", "none");
                    }
                });
            });


        })

    },
    render() {
        this.div.append(`
        <form>
            <input type="checkbox" id="toggleColumns">
            <label for="toggleColumns"> Alternar colunas </label>
        </form>
            `)
    }
}

export default ListHandlersView;