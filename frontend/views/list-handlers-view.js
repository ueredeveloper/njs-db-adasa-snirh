import snirhUpdate from "../services/snirh-update";
import toUpdateGrants from "../shared/to-update-grants";

const ListHandlersView = {
    init: function () {
        this.div = $('#list-handlers');

        this.tables = [
            { class: 'federal-list', id: 'federal-list-sub', tipo: '1', subtipo: '2' },
            { class: 'federal-list hidden', id: 'federal-list-sup', tipo: '1', subtipo: '1' },
            { class: 'federal-list hidden', id: 'federal-list-lan', tipo: '2', subtipo: '1' },
            { class: 'federal-list hidden', id: 'federal-list-bar', tipo: '3', subtipo: '1' }
        ];

        this.render();

        $('#toggle-columns').change(function (e) {

            var isChecked = $(this).is(":checked");

            ListHandlersView.tables.forEach(element => {

                // ListSnirhView
                let tagThead = $(`#${element.id}`).find('thead');

                let tagTbody = $(`#${element.id}`).find('tbody');

                let tagTr = tagThead.find('tr');
                let tagsThs = tagTr.find('.th-snirh');

                // 
                let theadState = $(`#${element.id}`).find('table').find('thead');

                let tbodyState = $(`#${element.id}`).find('table').find('tbody');

                let trState = theadState.find('tr');
                let thsState = trState.find('.th-state-update');

                if (isChecked) {

                    //Captura todos os textos do cabeçalho
                    let theads = tagsThs.map(function (index, th) {
                        return $(th).text();
                    }).get();

                    //Captura todos os textos do cabeçalho
                    let theadsState = thsState.map(function (index, th) {
                        return $(th).text();
                    }).get();

                    // Seleciona aqueles cabeçalhos que serão mostrados na tabela simples, com poucas colunas
                    let thIndex = theads.map((element, index) => {
                        // adicionar um sort para o nome, endere vir primeiro...


                        if (
                            element === 'INT_CD'
                            || element === 'INT_TIN_CD'
                            || element === 'INT_TSU_CD'
                            || element === 'FIN_CD'
                            || element === 'INT_CD_ORIGEM'
                            || element === 'EMP_NM_RESPONSAVEL'
                            || element === 'EMP_NM_EMPREENDIMENTO'
                            || element === 'EMP_NU_CPFCNPJ'
                            || element === 'INT_CR_LATITUDE'
                            || element === 'INT_CR_LONGITUDE'
                            || element === 'INT_NU_LATITUDE'
                            || element === 'INT_NU_LONGITUDE'
                            || element === 'OUT_DT_OUTORGAINICIAL'
                            || element === 'OUT_DT_OUTORGAFINAL'

                            // adiciona th dos botões
                            || element === ''
                        ) {
                            return index;
                        }
                    }).filter(index => index !== undefined);


                    // Seleciona aqueles cabeçalhos que serão mostrados na tabela simples, com poucas colunas
                    let thStateIndex = theadsState.map((element, index) => {


                        // adicionar um sort para o nome, endere vir primeiro...
                        if (
                            element === 'INT_CD'
                            || element === 'INT_TIN_CD'
                            || element === 'INT_TSU_CD'
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
                            || element === 'EMP_DS_LOGRADOURO'
                            // Datas nos dois formatos
                            || element === 'OUT_DT_INICIAL'
                            || element === 'OUT_DT_OUTORGAINICIAL'
                            || element === 'OUT_DT_FINAL'
                            || element === 'OUT_DT_OUTORGAFINAL'
                            // adiciona th dos botões
                            || element === ''
                        ) {
                            return index;
                        }
                    }).filter(index => index !== undefined);


                    // Adiciona a última coluna, dos botões
                    thIndex.push(theads.length - 1)
                    thStateIndex.push(theadsState.length - 1)


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
                    let thStateTrs = theadState.find('tr');
                    thStateTrs.each(function (index, tr) {
                        // Buscar as ths apenas com a classe `th-snirh`, pois há outras ths da outra tabela inserida.
                        let tds = $(tr).find('.th-state-update');

                        tds.each(function (index, th) {
                            if (!thStateIndex.includes(index)) { // Check if the current index is in the list
                                $(th).css("display", "none");
                            }
                        });
                    });

                    let tbStateTrs = tbodyState.find('tr');
                    tbStateTrs.each(function (index, tr) {
                        // Buscar as tds apenas com a classe `td-snirh`, pois há outras tds da outra tabela inserida.
                        let tds = $(tr).find('.td-state-update');

                        tds.each(function (index, td) {
                            if (!thStateIndex.includes(index)) { // Check if the current index is in the list
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
            });
        })

        $('#btn-save').on('click', async function() { 
            let toUpdate = toUpdateGrants.getToUpdateGrants();

            let response =  await snirhUpdate('DF', toUpdate);

            console.log(response)

        });

    },
    render() {
        this.div.append(`
        <div>
            <input type="checkbox" id="toggle-columns">
            <label for="toggle-columns"> Alternar colunas </label>
            <button id="btn-save" class="hover:bg-sky-600 active:bg-sky-700 focus:outline-none focus:ring focus:ring-sky-300 mx-10"> Salvar </button>
        </div>
            `)
    }
}

export default ListHandlersView;