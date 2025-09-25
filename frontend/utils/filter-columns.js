const filterColumns = (component, checkBox)=> {

    var isChecked = checkBox.is(":checked");

    component.tables.forEach(element => {

        // ListSnirhView
        let federalThead = $(`#${element.id}`).find('thead');

        let federalTbody = $(`#${element.id}`).find('tbody');

        let federalTr = federalThead.find('tr');
        let federalThs = federalTr.find('.th-snirh');

        // 
        let stateThead = $(`#${element.id}`).find('table').find('thead');

        let stateTbody = $(`#${element.id}`).find('table').find('tbody');

        let stateTr = stateThead.find('tr');
        let stateThs = stateTr.find('.th-state-update');

        if (isChecked) {

            //Captura todos os textos do cabeçalho
            let theads = federalThs.map(function (index, th) {
                return $(th).text();
            }).get();

            //Captura todos os textos do cabeçalho
            let theadsState = stateThs.map(function (index, th) {
                return $(th).text();
            }).get();

            // Seleciona aqueles cabeçalhos que serão mostrados na tabela simples, com poucas colunas
            let thFederalIndexes = theads.map((element, index) => {
                // adicionar um sort para o nome, endere vir primeiro...

                if (
                    element === 'INT_CD'
                    || element === 'FIN_CD'
                    || element === 'INT_CD_ORIGEM'
                    || element === 'EMP_NM_RESPONSAVEL'
                    || element === 'EMP_NM_EMPREENDIMENTO'
                    || element === 'EMP_NU_CPFCNPJ'
                    // Latitude e Longitude nos dois formatos
                    || element === 'INT_CR_LATITUDE'
                    || element === 'INT_CR_LONGITUDE'
                    || element === 'INT_NU_LATITUDE'
                    || element === 'INT_NU_LONGITUDE'
                    
                    // Datas nos dois formatos
                    || element === 'OUT_DT_INICIAL'
                    || element === 'OUT_DT_OUTORGAINICIAL'
                    || element === 'OUT_DT_FINAL'
                    || element === 'OUT_DT_OUTORGAFINAL'
                    // adiciona th dos botões
                    || element === 'OUT_NU_PROCESSO'
                    || element === ''
                ) {
                    return index;
                }
            }).filter(index => index !== undefined);

            // Seleciona aqueles cabeçalhos que serão mostrados na tabela simples, com poucas colunas
            let thStateIndexes = theadsState.map((element, index) => {

                // adicionar um sort para o nome, endere vir primeiro...
                if (
                    element === 'INT_CD'
                    || element === 'FIN_CD'
                    || element === 'INT_CD_ORIGEM'
                    || element === 'EMP_NM_RESPONSAVEL'
                    || element === 'EMP_NM_EMPREENDIMENTO'
                    || element === 'EMP_NU_CPFCNPJ'
                    // Latitude e Longitude nos dois formatos
                    || element === 'INT_CR_LATITUDE'
                    || element === 'INT_CR_LONGITUDE'
                    || element === 'INT_NU_LATITUDE'
                    || element === 'INT_NU_LONGITUDE'
                    
                    // Datas nos dois formatos
                    || element === 'OUT_DT_INICIAL'
                    || element === 'OUT_DT_OUTORGAINICIAL'
                    || element === 'OUT_DT_FINAL'
                    || element === 'OUT_DT_OUTORGAFINAL'
                    // adiciona th dos botões
                    || element === 'OUT_NU_PROCESSO'
                    || element === ''
                ) {
                    return index;
                }
            }).filter(index => index !== undefined);

            // Adiciona a última coluna, dos botões
            thFederalIndexes.push(theads.length - 1)
            thStateIndexes.push(theadsState.length - 1)

            // Busca os componentes necessários para mostrar as colunas específicas.
            let thTrs = federalThead.find('tr');
            thTrs.each(function (index, tr) {
                // Buscar as ths apenas com a classe `th-snirh`, pois há outras ths da outra tabela inserida.
                let tds = $(tr).find('.th-snirh');

                tds.each(function (index, th) {
                    if (!thFederalIndexes.includes(index)) { // Check if the current index is in the list
                        $(th).css("display", "none");
                    }
                });
            });

            let tbTrs = federalTbody.find('tr');
            tbTrs.each(function (index, tr) {
                // Buscar as tds apenas com a classe `td-snirh`, pois há outras tds da outra tabela inserida.
                let tds = $(tr).find('.td-snirh');

                tds.each(function (index, td) {
                    if (!thFederalIndexes.includes(index)) { // Check if the current index is in the list
                        $(td).css("display", "none");
                    }
                });
            });

            // Busca os componentes necessários para mostrar as colunas específicas.
            let thStateTrs = stateThead.find('tr');
            thStateTrs.each(function (index, tr) {
                // Buscar as ths apenas com a classe `th-snirh`, pois há outras ths da outra tabela inserida.
                let tds = $(tr).find('.th-state-update');

                tds.each(function (index, th) {
                    if (!thStateIndexes.includes(index)) { // Check if the current index is in the list
                        $(th).css("display", "none");
                    }
                });
            });

            let tbStateTrs = stateTbody.find('tr');
            tbStateTrs.each(function (index, tr) {
                // Buscar as tds apenas com a classe `td-snirh`, pois há outras tds da outra tabela inserida.
                let tds = $(tr).find('.td-state-update');

                tds.each(function (index, td) {
                    if (!thStateIndexes.includes(index)) { // Check if the current index is in the list
                        $(td).css("display", "none");
                    }
                });
            });

        } else {

            let thTrs = federalThead.find('tr');
            thTrs.each(function (index, tr) {
                let tds = $(tr).find('th');

                tds.each(function (index, th) {

                    $(th).css("display", "table-cell");

                });
            });

            let tbTrs = federalTbody.find('tr');
            tbTrs.each(function (index, tr) {
                let tds = $(tr).find('td');

                tds.each(function (index, td) {

                    $(td).css("display", "table-cell");

                });
            });

        }
    });
}

export {filterColumns}