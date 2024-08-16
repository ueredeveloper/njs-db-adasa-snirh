const { isFloat, convertFloatToCommaString } = require('./convert-float-to-string');
const { convertJSONToCSV } = require('./convert-json-to-csv');
const { formatCpfCnpj } = require('./format-cpf-cnpj');
const { isDate, convertDateFormat } = require('./verify-and-convert-dates');

const compareJson = () => {

    //rever, colocar "", não null => EMP_NU_CEPENDERECO
    // rever, colocar "", não null => EMP_DS_BAIRRO



    let snirhJson = {
        "INT_CD": "928329",
        "INT_CD_ORIGEM": "",
        "INT_DS_OPCIONAL": "",
        "INT_TIN_CD": "1",
        "INT_TSU_CD": "1",
        "INT_NU_SIAGAS": "",
        "INT_NU_LATITUDE": "#-15.745614",
        "INT_NU_LONGITUDE": "#-47.392625",
        "INT_NM_CORPOHIDRICOALTERADO": "",
        "EMP_NM_EMPREENDIMENTO": "NÚCLEO RURAL RIO PRETO, CHÁCARA 104/105",
        "EMP_NM_RESPONSAVEL": "LUCIANO STEPHAN NASCENTE",
        "EMP_NU_CPFCNPJ": "590.093.651-15",
        "EMP_DS_EMAILRESPONSAVEL": "",
        "EMP_NU_CEPENDERECO": "",
        "EMP_DS_LOGRADOURO": "",
        "EMP_DS_COMPLEMENTOENDERECO": "",
        "EMP_NU_LOGRADOURO": "",
        "EMP_NU_CAIXAPOSTAL": "",
        "EMP_DS_BAIRRO": "",
        "EMP_NU_DDD": "",
        "EMP_NU_TELEFONE": "",
        "EMP_CD_IBGEMUNCORRESPONDENCIA": "",
        "OUT_TP_OUTORGA": "1",
        "OUT_TP_SITUACAOOUTORGA": "1",
        "OUT_DT_OUTORGAINICIAL": "28/09/2018",
        "OUT_DT_OUTORGAFINAL": "28/09/2023",
        "OUT_NU_PROCESSO": "197001289/2010",
        "OUT_TP_ATO": "DESPACHO",
        "OUT_NU_ATO": "936/2018",
        "DAD_QT_VAZAODIAJAN": "4,25",
        "DAD_QT_VAZAODIAFEV": "4,25",
        "DAD_QT_VAZAODIAMAR": "4,25",
        "DAD_QT_VAZAODIAABR": "4,25",
        "DAD_QT_VAZAODIAMAI": "4,25",
        "DAD_QT_VAZAODIAJUN": "4,25",
        "DAD_QT_VAZAODIAJUL": "4,25",
        "DAD_QT_VAZAODIAAGO": "4,25",
        "DAD_QT_VAZAODIASET": "4,25",
        "DAD_QT_VAZAODIAOUT": "4,25",
        "DAD_QT_VAZAODIANOV": "4,25",
        "DAD_QT_VAZAODIADEZ": "4,25",
        "DAD_QT_HORASJAN": "3",
        "DAD_QT_HORASFEV": "3",
        "DAD_QT_HORASMAR": "3",
        "DAD_QT_HORASABR": "3",
        "DAD_QT_HORASMAI": "3",
        "DAD_QT_HORASJUN": "3",
        "DAD_QT_HORASJUL": "3",
        "DAD_QT_HORASAGO": "3",
        "DAD_QT_HORASSET": "3",
        "DAD_QT_HORASOUT": "3",
        "DAD_QT_HORASNOV": "3",
        "DAD_QT_HORASDEZ": "3",
        "DAD_QT_DIAJAN": "31",
        "DAD_QT_DIAFEV": "28",
        "DAD_QT_DIAMAR": "31",
        "DAD_QT_DIAABR": "30",
        "DAD_QT_DIAMAI": "31",
        "DAD_QT_DIAJUN": "30",
        "DAD_QT_DIAJUL": "31",
        "DAD_QT_DIAAGO": "31",
        "DAD_QT_DIASET": "30",
        "DAD_QT_DIAOUT": "31",
        "DAD_QT_DIANOV": "30",
        "DAD_QT_DIADEZ": "31",
        "FIN_CD": "716914",
        "FIN_TFN_CD": "6",
        "FES_NU_PROFUNDIDADEMEDIATANQUE": "",
        "FES_NU_AREATOTALTANQUE": "",
        "TTC_CD": "",
        "TTC_TCU_CD": "",
        "FSE_TES_CD": "",
        "FIE_TPS_CD": "",
        "FAH_TAH_CD": "",
        "FAH_NU_POTENCIAINSTALADA": "",
        "FAH_IC_APROVEITAMENTOFIODAGUA": "",
        "FAH_NU_AREAINUNDADANA": "",
        "FAH_NU_VOLUMENA": "",
        "FPE_TPE_CD": "",
        "FPE_CNA_CD": "",
        "ETP_CD": "",
        "ETP_MPE_CD": "",
        "ETP_NU_QUANTIDADEMAXMENSAL": "",
        "IUS_NU_ALTURARES": "",
        "IUS_NU_AREARESMAX": "",
        "IUS_NU_VOLUMERES": "",
        "IUS_NM_ENTIDADECONCEDENTE": "",
        "IUS_NU_CONCESSAO": "",
        "IUS_DT_FINALCONCESSAO": "",
        "SIR_CD": "",
        "SIR_TSI_CD": "",
        "SIR_TCT_CD": "",
        "SIR_NU_AREAIRRIGADA": "",
        "FTE_NU_POTENCIAINSTALADA": "",
        "FTE_NU_PRODUCAOMENSALMEDIA": "",
        "FTE_TCO_CD": "",
        "FTE_TSR_CD": "",
        "FEA_NU_PRODUCAOMAXMENSALAREIA": "",
        "FEA_NU_PROPORCAOAGUAPOLPA": "",
        "FEA_PC_TEORUMIDADE": "",
        "FOH_TOH_CD": "",
        "FRE_NU_AREAINUNDADANA": "",
        "FRE_NU_VOLUMENA": "",
        "OTO_TOU_CD": "",
        "OTO_CD": "",
        "OTO_NM_OUTROUSO": "",
        "OTO_DS_OUTROUSO": "",
        "HTE_CD": "",
        "HTE_NU_QUANTIDADE": "",
        "TUC_TEC_CD": "",
        "TUC_CD": "",
        "FTR_AR_TOTALEMPREENDIMENTO": "",
        "ESC_CD": "",
        "ESC_NU_PRODUCAOPRETENDIDA": "",
        "ESC_TET_CD": "",
        "CTE_CD": "",
        "CTE_TSC_CD": "",
        "CTE_TCA_CD": "",
        "CTE_NU_CABECAS": "",
        "ITC_CD": "",
        "ITC_TUM_CD": "",
        "ITC_NU_PRODUCAOANUAL": "",
        "ITC_CNA_CD": "",
        "EFL_NU_DBOBRUTO": "",
        "EFL_NU_DBOTRATADO": "",
        "EFL_NU_FOSFOROBRUTO": "",
        "EFL_NU_FOSFOROTRATADO": "",
        "EFL_NU_NITROGENIOBRUTO": "",
        "EFL_NU_NITROGENIOTRATADO": "",
        "EFL_NU_TEMPERATURA": "",
        "EFL_TTE_CD": "",
        "ASB_DT_INSTALACAO": "",
        "ASB_TNP_CD": "",
        "ASB_NU_DIAMETROPERFURACAO": "",
        "ASB_NU_DIAMETROFILTRO": "",
        "ASB_TPA_CD": "",
        "ASB_NU_TOPO": "",
        "ASB_NU_BASE": "",
        "ASB_TCQ_CD": "",
        "ASB_NU_PROFUNDIDADEFINAL": "",
        "ASB_NU_ALTURABOCATUBO": "",
        "ASB_NU_COTATERRENO": "",
        "ASB_DS_AQUIFEROEXPLOTADO": "",
        "TST_TTB_CD": "",
        "TST_DS_TEMPODURACAO": "",
        "TST_NU_ND": "",
        "TST_NU_NE": "",
        "TST_VZ_ESTABILIZACAO": "",
        "TST_TMI_CD": "",
        "TST_NU_COEFICIENTEARMAZENAMENT": "",
        "TST_NU_TRANSMISSIVIDADE": "",
        "TST_NU_CONDUTIVIDADEHIDRAULICA": "",
        "TST_NU_PERMEABILIDADE": "",
        "AMA_DT_COLETA": "",
        "AMA_DT_ANALISE": "",
        "AMA_NU_CONDUTIVIDADEELETRICA": "",
        "AMA_QT_TEMPERATURA": "",
        "AMA_QT_STD": "",
        "AMA_QT_PH": "",
        "AMA_QT_COLIFORMESTOTAIS": "",
        "AMA_QT_COLIFORMESFECAIS": "",
        "AMA_QT_BICARBONATO": "",
        "AMA_QT_CALCIO": "",
        "AMA_QT_CARBONATO": "",
        "AMA_QT_CLORETO": "",
        "AMA_QT_DUREZATOTAL": "",
        "AMA_QT_FERROTOTAL": "",
        "AMA_QT_FLUORETOS": "",
        "AMA_QT_NITRATOS": "",
        "AMA_QT_NITRITOS": "",
        "AMA_QT_POTASSIO": "",
        "AMA_QT_SODIO": "",
        "AMA_QT_SULFATO": "",
        "AMA_QT_MAGNESIO": "",
        "": "\n                            <div class=\"div-btn flex flex-row justify-around w-24 min-w-24 max-w-24\">\n                                <!-- select button -->\n                                <button id=\"btn-snirh-selection\" class=\"hover:bg-sky-600 active:bg-sky-700 focus:outline-none focus:ring focus:ring-sky-300\">\n                                    <svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"w-6 h-6\">\n                                        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z\" />\n                                        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z\" />\n                                    </svg>\n                                </button>\n                                <!-- copy button -->\n                                <button class=\"hover:bg-sky-600 active:bg-sky-700 focus:outline-none focus:ring focus:ring-sky-300\">\n                                    <svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-6\">\n                                        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m4.5 12.75 6 6 9-13.5\" />\n                                    </svg>\n                                </button>\n                            </div>"
    }

    let id = snirhJson.INT_CD

    convertJSONToCSV(snirhJson, './backend/data/csv/test-1/edicao-snirh.csv')

    let adasa = {
        "INT_CD": "",
        "INT_CD_ORIGEM": "1511",
        "INT_DS_OPTIONAL": "",
        "INT_TIN_CD": "1",
        "INT_TSU_CD": "1",
        "INT_NU_SIAGAS": "",
        "INT_NU_LATITUDE": "-15,745614",
        "INT_NU_LONGITUDE": "-47,392625",
        "INT_NM_CORPOHIDRICOALTERADO": "",
        "EMP_NM_EMPREENDIMENTO": "NÚCLEO RURAL RIO PRETO, CHÁCARA 104/105",
        "EMP_NM_RESPONSAVEL": "LUCIANO STEPHAN NASCENTE",
        "EMP_NU_CPFCNPJ": "#59009365115",
        "EMP_DS_EMAILRESPONSAVEL": "naoinformado@gmail.com.br",
        "EMP_NU_CEPENDERECO": "",
        "EMP_DS_LOGRADOURO": "SIA TRECHO 03, LOTES 385/395",
        "EMP_DS_COMPLEMENTOENDERECO": "",
        "EMP_NU_LOGRADOURO": "",
        "EMP_NU_CAIXAPOSTAL": "",
        "EMP_DS_BAIRRO": "",
        "EMP_NU_DDD": "DF",
        "EMP_NU_TELEFONE": "6121063708",
        "EMP_CD_IBGEMUNCORRESPONDENCIA": "5300108",
        "OUT_TP_OUTORGA": "1",
        "OUT_TP_SITUACAOOUTORGA": "4",
        "OUT_DT_OUTORGAINICIAL": "28/09/2018",
        "OUT_DT_OUTORGAFINAL": "28/09/2028",
        "OUT_NU_PROCESSO": "197001289/2010",
        "OUT_TP_AT": "DESPACHO",
        "OUT_NU_ATO": "936/2018",
        "DAD_QT_VAZAODIAJAN": "4,2",
        "DAD_QT_VAZAODIAFEV": "4,2",
        "DAD_QT_VAZAODIAMAR": "4,2",
        "DAD_QT_VAZAODIAABR": "4,2",
        "DAD_QT_VAZAODIAMAI": "4,2",
        "DAD_QT_VAZAODIAJUN": "4,2",
        "DAD_QT_VAZAODIAJUL": "4,2",
        "DAD_QT_VAZAODIAAGO": "4,2",
        "DAD_QT_VAZAODIASET": "4,2",
        "DAD_QT_VAZAODIAOUT": "4,2",
        "DAD_QT_VAZAODIANOV": "4,2",
        "DAD_QT_VAZAODIADEZ": "4,2",
        "DAD_QT_HORASJAN": "3",
        "DAD_QT_HORASFEV": "3",
        "DAD_QT_HORASMAR": "3",
        "DAD_QT_HORASABR": "3",
        "DAD_QT_HORASMAI": "3",
        "DAD_QT_HORASJUN": "3",
        "DAD_QT_HORASJUL": "3",
        "DAD_QT_HORASAGO": "3",
        "DAD_QT_HORASSET": "3",
        "DAD_QT_HORASOUT": "3",
        "DAD_QT_HORASNOV": "3",
        "DAD_QT_HORASDEZ": "3",
        "DAD_QT_DIAJAN": "31",
        "DAD_QT_DIAFEV": "28",
        "DAD_QT_DIAMAR": "31",
        "DAD_QT_DIAABR": "30",
        "DAD_QT_DIAMAI": "31",
        "DAD_QT_DIAJUN": "30",
        "DAD_QT_DIAJUL": "31",
        "DAD_QT_DIAAGO": "31",
        "DAD_QT_DIASET": "30",
        "DAD_QT_DIAOUT": "31",
        "DAD_QT_DIANOV": "30",
        "DAD_QT_DIADEZ": "31",
        "FIN_CD": "0",
        "FIN_TFN_CD": "6",
        "FES_NU_PROFUNDIDADEMEDIATANQUE": "",
        "FES_NU_AREATOTALTANQUE": "",
        "TTC_CD": "",
        "TTC_TCU_CD": "",
        "FSE_TES_CD": "",
        "FIE_TPS_CD": "",
        "FAH_TAH_CD": "",
        "FAH_NU_POTENCIAINSTALADA": "",
        "FAH_IC_APROVEITAMENTOFIODAGUA": "",
        "FAH_NU_AREAINUNDADANA": "",
        "FAH_NU_VOLUMENA": "",
        "FPE_TPE_CD": "",
        "FPE_CNA_CD": "",
        "ETP_CD": "",
        "ETP_MPE_CD": "",
        "ETP_NU_QUANTIDADEMAXMENSAL": "",
        "IUS_NU_ALTURARES": "",
        "IUS_NU_AREARESMAX": "",
        "IUS_NU_VOLUMERES": "",
        "IUS_NM_ENTIDADECONCEDENTE": "",
        "IUS_NU_CONCESSAO": "",
        "IUS_DT_FINALCONCESSAO": "",
        "SIR_CD": "",
        "SIR_TSI_CD": "",
        "SIR_TCT_CD": "",
        "SIR_NU_AREAIRRIGADA": "",
        "FTE_NU_POTENCIAINSTALADA": "",
        "FTE_NU_PRODUCAOMENSALMEDIA": "",
        "FTE_TCO_CD": "",
        "FTE_TSR_CD": "",
        "FEA_NU_PRODUCAOMAXMENSALAREIA": "",
        "FEA_NU_PROPORCAOAGUAPOLPA": "",
        "FEA_PC_TEORUMIDADE": "",
        "FOH_TOH_CD": "",
        "FRE_NU_AREAINUNDADANA": "",
        "FRE_NU_VOLUMENA": "",
        "OTO_TOU_CD": "",
        "OTO_CD": "",
        "OTO_NM_OUTROUSO": "",
        "OTO_DS_OUTROUSO": "",
        "HTE_CD": "",
        "HTE_NU_QUANTIDADE": "",
        "TUC_TEC_CD": "",
        "TUC_CD": "",
        "FTR_AR_TOTALEMPREENDIMENTO": "",
        "ESC_CD": "",
        "ESC_NU_PRODUCAOPRETENDIDA": "",
        "ESC_TET_CD": "",
        "CTE_CD": "",
        "CTE_TSC_CD": "",
        "CTE_TCA_CD": "",
        "CTE_NU_CABECAS": "",
        "ITC_CD": "",
        "ITC_TUM_CD": "",
        "ITC_NU_PRODUCAOANUAL": "",
        "ITC_CNA_CD": "",
        "EFL_NU_DBOBRUTO": "",
        "EFL_NU_DBOTRATADO": "",
        "EFL_NU_FOSFOROBRUTO": "",
        "EFL_NU_FOSFOROTRATADO": "",
        "EFL_NU_NITROGENIOBRUTO": "",
        "EFL_NU_NITROGENIOTRATADO": "",
        "EFL_NU_TEMPERATURA": "",
        "EFL_TTE_CD": "",
        "ASB_DT_INSTALACAO": "",
        "ASB_TNP_CD": "",
        "ASB_NU_DIAMETROPERFURACAO": "",
        "ASB_NU_DIAMETROFILTRO": "",
        "ASB_TPA_CD": "",
        "ASB_NU_TOPO": "",
        "ASB_NU_BASE": "",
        "ASB_TCQ_CD": "",
        "ASB_NU_PROFUNDIDADEFINAL": "",
        "ASB_NU_ALTURABOCATUBO": "",
        "ASB_NU_COTATERRENO": "",
        "ASB_DS_AQUIFEROEXPLOTADO": "",
        "TST_TTB_CD": "",
        "TST_DS_TEMPODURACAO": "",
        "TST_NU_ND": "",
        "TST_NU_NE": "",
        "TST_VZ_ESTABILIZACAO": "",
        "TST_TMI_CD": "",
        "TST_NU_COEFICIENTEARMAZENAMENT": "",
        "TST_NU_TRANSMISSIVIDADE": "",
        "TST_NU_CONDUTIVIDADEHIDRAULICA": "",
        "TST_NU_PERMEABILIDADE": "",
        "AMA_DT_COLETA": "",
        "AMA_DT_ANALISE": "",
        "AMA_NU_CONDUTIVIDADEELETRICA": "",
        "AMA_QT_TEMPERATURA": "",
        "AMA_QT_STD": "",
        "AMA_QT_PH": "",
        "AMA_QT_COLIFORMESTOTAIS": "",
        "AMA_QT_COLIFORMESFECAIS": "",
        "AMA_QT_BICARBONATO": "",
        "AMA_QT_CALCIO": "",
        "AMA_QT_CARBONATO": "",
        "AMA_QT_CLORETO": "",
        "AMA_QT_DUREZATOTAL": "",
        "AMA_QT_FERROTOTAL": "",
        "AMA_QT_FLUORETOS": "",
        "AMA_QT_NITRATOS": "",
        "AMA_QT_NITRITOS": "",
        "AMA_QT_POTASSIO": "",
        "AMA_QT_SODIO": "",
        "AMA_QT_SULFATO": "",
        "AMA_QT_MAGNESIO": ""
    }

    convertJSONToCSV(adasa, './backend/data/csv/test-1/edicao-adasa.csv')

    // Cria array para formatar valores de acordo com o SNIRH.
    let adasaKeyValues = Object.entries(adasa);


    let objectToSend = adasa

    // VERIFICAR SE É NECESSÁRIO ESTES FILTROS E FORMATAÇÕES.
    // ESTÁ DANDO ERRO NAS LINHAS DE VAZÕES, O VALOR ESTÁ VINDO 0,00 E CONVERTENDO PARA 0. TEM QUE SER DECIMAL, => 0,00
    // Na primeira vez adiciona todos os atributos
    adasaKeyValues.forEach(([key, value]) => {

        // Converte float para string com vírgula, ex: -15.456 para -15,456
        if (isFloat(value)) {
            let str = convertFloatToCommaString(value);

            objectToSend[key] = str
            // Adiciona máscara no cnpj ou cpf, ex: #22255544489 para #222.555.444-89
        } else if (key === 'EMP_NU_CPFCNPJ') {
            let cpfCnpj = '#' + formatCpfCnpj(value);
            objectToSend[key] = cpfCnpj;

            // Verifica e converte a data 2020-05-27 para 27/05/2020
        } else if (isDate(value)) {
            let dataConverted = convertDateFormat(value)
            objectToSend[key] = dataConverted;

            // Este valor vem do SNIRH
           
        } 
        else {
            objectToSend[key] = value
        }


    });

    // Adiciona o id de edição.
    objectToSend.INT_CD = id;
    // Este valor vem do SNIRH
    objectToSend.FIN_CD = snirhJson.FIN_CD
    objectToSend.EMP_NM_RESPONSAVEL = "Teste 310724 " + objectToSend.EMP_NM_RESPONSAVEL

    convertJSONToCSV(objectToSend, './backend/data/csv/test-1/edicao-object-to-send.csv')

}


compareJson()