
const SNIRHSubterraneaModel = {
    subterranea: {
        "INT_TIN_CD": 1,
        "INT_TSU_CD": 2,
        "INT_TSI_CD": "",
        "INT_CR_LATITUDE": "-15,856013",
        "INT_CR_LONGITUDE": "-47,884798",
    },
    list:[],

    listSubterraneas: async function () {

       /* const data = {
            "recordsets": [
                [
                    {
                        "INT_TIN_CD": 1,
                        "INT_TSU_CD": 2,
                        "INT_TSI_CD": "",
                        "INT_CR_LATITUDE": "-15,856013",
                        "INT_CR_LONGITUDE": "-47,884798",
                        "ING_NU_IBGEMUNICIPIO": 5300108,
                        "EMP_NM_EMPREENDIMENTO": "SHIS QI 05, CHACARA Nº 52",
                        "EMP_NU_CPFCNPJ": "#06863426153",
                        "EMP_NM_USUARIO": "PAULO TARSO FLECHA DE LIMA",
                        "EMP_DS_EMAILRESPONSAVEL": "naoinformado@gmail.com.br",
                        "EMP_NU_CEPENDERECO": "71600570",
                        "EMP_DS_LOGRADOURO": "SHIS QI 05, Chacara nº 52",
                        "EMP_DS_COMPLEMENTOENDERECO": ""
                    }
                ]
            ]
        };

        return data.recordsets[0];*/

        let subterraneas = await fetchSubterraneo();

        return subterraneas.recordset;

    }
}

export default SNIRHSubterraneaModel;