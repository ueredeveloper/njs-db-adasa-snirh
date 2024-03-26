const ListHandlersView = {
    init: function () {
        this.div = $('#list-handlers');

        this.render();
        $('#toggleColumns').change(function (e) {

            var isChecked = $(this).is(":checked");
            // ListSnirhView
            let tagThead = $('#list-snirh-sub').find('thead');
            let tagTbody = $('#list-snirh-sub').find('tbody');

            let tagTr = tagThead.find('tr');
            let tagsThs = tagTr.find('.th-snirh');

            // ListAdasaView
            let tagAdasaThead = $('#list-snirh-sub').find('table').find('thead');
            let tagAdasaTbody = $('#list-snirh-sub').find('table').find('tbody');

            let tagAdasaTr = tagAdasaThead.find('tr');
            let tagsAdasaThs = tagAdasaTr.find('.th-adasa');

            if (isChecked) {

    
                //Captura todos os textos do cabeçalho
                let theads = tagsThs.map(function (index, th) {
                    return $(th).text();
                }).get();

                //Captura todos os textos do cabeçalho
                let theadsAdasa = tagsAdasaThs.map(function (index, th) {
                    return $(th).text();
                }).get();

                // Seleciona aqueles cabeçalhos que serão mostrados na tabela simples, com poucas colunas
                let thIndex = theads.map((element, index) => {
                    // adicionar um sort para o nome, endere vir primeiro...
                    if (
                        element === 'INT_CD'
                        || element === 'EMP_NM_EMPREENDIMENTO'
                        || element === 'EMP_NU_CPFCNPJ'
                        || element === 'INT_NU_LATITUDE'
                        || element === 'INT_NU_LONGITUDE'
                        || element === 'EMP_DS_LOGRADOURO'
                        || element === 'INT_CD_ORIGEM'
                    ) {
                        return index;
                    }
                }).filter(index => index !== undefined);


                // Seleciona aqueles cabeçalhos que serão mostrados na tabela simples, com poucas colunas
                let thAdasaIndex = theadsAdasa.map((element, index) => {
                    // adicionar um sort para o nome, endere vir primeiro...
                    if (
                        element === 'INT_TIN_CD'
                        || element === 'INT_CR_LATITUDE'
                        || element === 'INT_CR_LONGITUDE'
                        || element === 'EMP_NM_EMPREENDIMENTO'
                        || element === 'EMP_NU_CPFCNPJ'
                        || element === 'EMP_NM_USUARIO'
                        || element === 'EMP_DS_LOGRADOURO'
                    ) {
                        return index;
                    }
                }).filter(index => index !== undefined);


                // Adiciona a última coluna, dos botões
                thIndex.push(theads.length - 1)
                thAdasaIndex.push(theadsAdasa.length-1)


                // Busca os componentes necessários para mostrar as colunas específicas.
                let thTrs = tagThead.find('tr');
                thTrs.each(function (index, tr) {
                    // Buscar as ths apenas com a classe `th-snirh`, pois há outras ths da outra tabela inserida.
                    let tds = $(tr).find('.th-snirh');
    
                    tds.each(function (index, th) {
                        if (!thIndex.includes(index)) { // Check if the current index is in the list
                            $(th).css("display", "none");
                        }
                    });
                });
    
                let tbTrs = tagTbody.find('tr');
                tbTrs.each(function (index, tr) {
                    // Buscar as tds apenas com a classe `td-snirh`, pois há outras tds da outra tabela inserida.
                    let tds = $(tr).find('.td-snirh');
    
                    tds.each(function (index, td) {
                        if (!thIndex.includes(index)) { // Check if the current index is in the list
                            $(td).css("display", "none");
                        }
                    });
                });

                // Busca os componentes necessários para mostrar as colunas específicas.
                let thAdasaTrs = tagAdasaThead.find('tr');
                thAdasaTrs.each(function (index, tr) {
                    // Buscar as ths apenas com a classe `th-snirh`, pois há outras ths da outra tabela inserida.
                    let tds = $(tr).find('.th-adasa');
    
                    tds.each(function (index, th) {
                        if (!thAdasaIndex.includes(index)) { // Check if the current index is in the list
                            $(th).css("display", "none");
                        }
                    });
                });
    
                let tbAdasaTrs = tagAdasaTbody.find('tr');
                tbAdasaTrs.each(function (index, tr) {
                    // Buscar as tds apenas com a classe `td-snirh`, pois há outras tds da outra tabela inserida.
                    let tds = $(tr).find('.td-adasa');
    
                    tds.each(function (index, td) {
                        if (!thAdasaIndex.includes(index)) { // Check if the current index is in the list
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