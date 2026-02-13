import localDbSelectClosestPoints from "../services/local-db-select-closest-points";
import localDBSelectPointByTypeAndId from "../services/local-db-select-point-by-type-and-id";


const StateGrantsModel = {
    subterranea: {
        "INT_TIN_CD": 1,
        "INT_TSU_CD": 2,
        "INT_TSI_CD": "",
        "INT_CR_LATITUDE": "-15,856013",
        "INT_CR_LONGITUDE": "-47,884798",
    },
    // list: [],

    list: async function () {


        const data = {
            "recordsets": [
                [
                    // Inserção: Ok.
                    {
                        "INT_TIN_CD": 1,
                        "INT_TSU_CD": 2,
                        "INT_TSI_CD": "",
                        "INT_CR_LATITUDE": "-15,739174",
                        "INT_CR_LONGITUDE": "-47,355835",
                        "ING_NU_IBGEMUNICIPIO": 5300108,
                        "EMP_NM_EMPREENDIMENTO": "NÚCLEO RURAL RIACHO DAS PEDRAS, CHÁCARA 32 A - FAZENDA SÃO JOSÉ OU CURRAL QUEIMADO",
                        "EMP_NU_CPFCNPJ": "#97404578868",
                        "EMP_NM_USUARIO": "CACILDO GONÇALVES RAMOS",
                        "EMP_DS_EMAILRESPONSAVEL": "naoinformado@gmail.com.br",
                        "EMP_NU_CEPENDERECO": " ",
                        "EMP_DS_LOGRADOURO": " ",
                        "EMP_DS_COMPLEMENTOENDERECO": "",
                        "EMP_NU_LOGRADOURO": "",
                        "EMP_NU_CAIXAPOSTAL": "0",
                        "EMP_CD_CODIGOIBGECORRESPONDENCIA": "",
                        "EMP_NU_DDD": "61",
                        "EMP_NU_TELEFONE": "",
                        "OUT_TPO_CD": 1,
                        "OUT_TSP_CD": 1,
                        "OUT_DT_FINAL": "24/01/2028",
                        "OUT_DT_INICIAL": "24/01/2018",
                        "OUT_NU_PROCESSO": "197001077/2011",
                        "OUT_DS_ATO": "DESPACHO",
                        "OUT_NU_ATO": "012/2018",
                        "INT_NU_SIAGAS": "",
                        "OPE_VZ_MESJAN": "10,80",
                        "OPE_VZ_MESFEV": "10,80",
                        "OPE_VZ_MESMAR": "10,80",
                        "OPE_VZ_MESABR": "10,80",
                        "OPE_VZ_MESMAI": "10,80",
                        "OPE_VZ_MESJUN": "10,80",
                        "OPE_VZ_MESJUL": "10,80",
                        "OPE_VZ_MESAGO": "10,80",
                        "OPE_VZ_MESSET": "10,80",
                        "OPE_VZ_MESOUT": "10,80",
                        "OPE_VZ_MESNOV": "10,80",
                        "OPE_VZ_MESDEZ": "10,80",
                        "OPE_QT_HORASJAN": 8,
                        "OPE_QT_HORASFEV": 8,
                        "OPE_QT_HORASMAR": 8,
                        "OPE_QT_HORASABR": 8,
                        "OPE_QT_HORASMAI": 8,
                        "OPE_QT_HORASJUN": 8,
                        "OPE_QT_HORASJUL": 8,
                        "OPE_QT_HORASAGO": 8,
                        "OPE_QT_HORASSET": 8,
                        "OPE_QT_HORASOUT": 8,
                        "OPE_QT_HORASNOV": 8,
                        "OPE_QT_HORASDEZ": 8,
                        "OPE_QT_DIAJAN": 31,
                        "OPE_QT_DIAFEV": 28,
                        "OPE_QT_DIAMAR": 31,
                        "OPE_QT_DIAABR": 30,
                        "OPE_QT_DIAMAI": 31,
                        "OPE_QT_DIAJUN": 30,
                        "OPE_QT_DIAJUL": 31,
                        "OPE_QT_DIAAGO": 31,
                        "OPE_QT_DIASET": 30,
                        "OPE_QT_DIAOUT": 31,
                        "OPE_QT_DIANOV": 30,
                        "OPE_QT_DIADEZ": 31,
                        "INT_VZ_MAXIMA": "10,80",
                        "FIN_TFN_CD": 6,
                        "FOU_TOU_CD": null,
                        "SIR_TSI_CD": 3,
                        "SIR_TCT_CD": 1120,
                        "SIR_AR_IRRIGADA": "0,00",
                        "IUS_NU_ALTURARES": "",
                        "IUS_AR_RESMAX": "",
                        "IUS_VO_RESMAX": "",
                        "EFL_QT_DBOBRUTO": "",
                        "EFL_QT_DBOTRATADO": "",
                        "EFL_QT_FOSFOROBRUTO": "",
                        "EFL_QT_FOSFOROTRATADO": "",
                        "EFL_QT_NITROGENIOBRUTO": "",
                        "EFL_QT_NITROGENIOTRATADO": "",
                        "ASB_DT_INSTALACAO": "01/01/2005",
                        "ASB_TNP_CD": 10,
                        "ASB_NU_DIAMETROPERFURACAO": "",
                        "ASB_NU_DIAMETROFILTRO": "6,00",
                        "ASB_AQP_CD": "",
                        "ASB_NU_TOPO": "0,00",
                        "ASB_NU_BASE": "",
                        "ASB_TPN_CD": " ",
                        "ASB_TCA_CD": " ",
                        "ASB_NU_PROFUNDIDADEFINAL": "120,00",
                        "ASB_NU_ALTURABOCATUBO": "0,00",
                        "ASB_NU_COTATERRENO": "",
                        "TST_DT": "23/05/2012",
                        "TST_TTB_CD": 6,
                        "TST_DS_TEMPODURACAO": "24,00",
                        "TST_NU_ND": "45,0",
                        "TST_NU_NE": "5,0",
                        "TST_VZ_ESTABILIZACAO": "14,400",
                        "TST_TMI_CD": "",
                        "TST_NU_COEFICIENTEARMAZENAMENTO": "",
                        "TST_NU_TRANSMISSIVIDADE": "",
                        "TST_NU_CONDUTIVIDADEHIDRAULICA": "",
                        "TST_NU_PERMEABILIDADE": "",
                        "AMA_DT_COLETA": "24/07/2017",
                        "AMA_DT_ANALISE": "24/07/2017",
                        "AMA_NU_CONDUTIVIDADEELETRICA": "176,3",
                        "AMA_QT_TEMPERATURA": "0",
                        "AMA_QT_STD": "0",
                        "AMA_QT_PH": "7,5",
                        "AMA_QT_COLIFORMESTOTAIS": "",
                        "AMA_QT_COLIFORMESFECAIS": "",
                        "AMA_QT_ BICARBONATO": "",
                        "AMA_QT_ CALCIO": "",
                        "AMA_QT_ CARBONATO": "",
                        "AMA_QT_ CLORETO": "55,89",
                        "AMA_QT_ DUREZATOTAL": "63,69",
                        "AMA_QT_ FERROTOTAL": "0,17",
                        "AMA_QT_ FLUORETOS": "",
                        "AMA_QT_ NITRATOS": "1,69",
                        "AMA_QT_ NITRITOS": "0,52",
                        "AMA_QT_ POTASSIO": "",
                        "AMA_QT_ SODIO": "",
                        "AMA_QT_ SULFATO": "",
                        "AMA_QT_MAGNESIO": "",
                        "INT_CD_ORIGEM": 3132,
                        "INT_DS_OPCIONAL": ""
                    },
                   
                  
                ]
            ]
        };


        return data.recordsets[0];

        //let subterraneas = await fetchSubterraneo();

        // return subterraneas.recordset;

    },
    localDbSelectClosestPoints: async function (latitude, longitude, ti) {

        let data = await localDbSelectClosestPoints(latitude, longitude, ti);
        return data
    },
    localDBSelectPointByTypeAndId: async function (ti, id) {
         let data = await localDBSelectPointByTypeAndId(ti, id);
        return data
    }
}

export default StateGrantsModel;