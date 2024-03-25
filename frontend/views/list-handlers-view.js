const ListHandlersView = {
    init: function () {
        this.div = $('#list-handlers');

        this.render();
        $('#toggleColumns').change(function (e) {

            var isChecked = $(this).is(":checked");
            
            let tagThead = $('#list-snirh-sub').find('thead');
            let tagTbody = $('#list-snirh-sub').find('tbody');

            let tagTr = tagThead.find('tr');
            let tagsThs = tagTr.find('th');

            if (isChecked) {

    
                //Captura todos os textos do cabeçalho
                let theads = tagsThs.map(function (index, th) {
                    return $(th).text();
                }).get();
    
                // Seleciona aqueles cabeçalhos que serão mostrados na tabela simples, com poucas colunas
                let thIndex = theads.map((element, index) => {
                    if (
                        element.includes('INT_CD')
                        || element.includes("EMP_NM")
                        || element.includes("CPF")
                        || element.includes("LATI")
                        || element.includes("LONG")
                        || element.includes("EMP_DS_LO")
                        || element.includes("INT_CD_ORIGEM")
                    ) {
                        return index;
                    }
                }).filter(index => index !== undefined);
                // Adiciona a última coluna, dos botões
                thIndex.push(theads.length - 1)
                // Busca os componentes necessários para mostrar as colunas específicas.
                let thTrs = tagThead.find('tr');
                thTrs.each(function (index, tr) {
                    let tds = $(tr).find('th');
    
                    tds.each(function (index, th) {
                        if (!thIndex.includes(index)) { // Check if the current index is in the list
                            $(th).css("display", "none");
                        }
                    });
                });
    
                let tbTrs = tagTbody.find('tr');
                tbTrs.each(function (index, tr) {
                    let tds = $(tr).find('td');
    
                    tds.each(function (index, td) {
                        if (!thIndex.includes(index)) { // Check if the current index is in the list
                            $(td).css("display", "none");
                        }
                    });
                });

            } else {

                let thTrs = tagThead.find('tr');
                thTrs.each(function (index, tr) {
                    let tds = $(tr).find('th');
    
                    tds.each(function (index, th) {
                       
                            $(th).css("display", "table-cell");
                       
                    });
                });
    
                let tbTrs = tagTbody.find('tr');
                tbTrs.each(function (index, tr) {
                    let tds = $(tr).find('td');
    
                    tds.each(function (index, td) {
                       
                            $(td).css("display", "table-cell");
                       
                    });
                });

            }

           


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