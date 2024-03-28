
const exportCsv = async (params) => {
    /* let {
         uf, idFinalidade, dataInicio, dataFim,
         idDominialidade, idTipoOutorga, idSituacaoOutorga,
         pagina, tamanhoPagina } = params;
 
     // Constructing the URL with parameters
     let url = new URL('http://localhost:3000/services/snirh-export-csv');
     url.searchParams.append('uf', uf);
     url.searchParams.append('idFinalidade', idFinalidade);
     url.searchParams.append('dataInicio', dataInicio);
     url.searchParams.append('dataFim', dataFim);
     url.searchParams.append('idDominialidade', idDominialidade);
     url.searchParams.append('idTipoOutorga', idTipoOutorga);
     url.searchParams.append('idSituacaoOutorga', idSituacaoOutorga);
     url.searchParams.append('pagina', pagina);
     url.searchParams.append('tamanhoPagina', tamanhoPagina);

     try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });

        const data = await response.json();

        return data;

    } catch (error) {
        console.error('Error:', error);
    }*/

    // modelos de objeto de teste

    let data = {
        "data": [
            {
                "INT_CD": "11XX989",
                "INT_TIN_DS": "Captação",
                "INT_TIN_CD": "1",
                "INT_TSU_DS": "Superficial",
                "INT_TSU_CD": "1",
                "INT_TCH_CD": "2",
                "INT_TCH_DS": "Espelho D'Água",
                "INT_TOD_DS": "ETL - Migração Outorgas Estaduais",
                "INT_TOD_CD": "1",
                "INT_TDM_DS": "Estadual",
                "INT_TDM_CD": "1",
                "INT_NU_CNARH": "700000101951",
                "INT_NU_SIAGAS": "",
                "INT_NU_LATITUDE": "-15.754055",
                "INT_NU_LONGITUDE": "-47.3529",
                "ING_NU_IBGEMUNICIPIO": "5300108",
                "ING_SG_UFMUNICIPIO": "DF",
                "ING_NM_MUNICIPIO": "BRASÍLIA",
                "INT_NM_CORPOHIDRICO": "BARRAGEM 01",
                "INT_DS_ORGAO": "ADASA",
                "INT_CD_ORGAO": "53",
                "INT_DT_REGISTRO": "2021-01-06",
                "EMP_NM_EMPREENDIMENTO": "VC 169 LOTES XXXX E XXX",
                "EMP_NM_USUARIO": "DARCI JOSÉ MARTARELO",
                "EMP_NU_CPFCNPJ": "10258809949",
                "EMP_DS_EMAILRESPONSAVEL": "JVIEIRA@XXXX.COM.BR",
                "OUT_TP_OUTORGA": "Direito de Uso",
                "OUT_TPO_CD": "1",
                "OUT_TP_SITUACAOOUTORGA": "Outorgado",
                "OUT_TSP_CD": "1",
                "OUT_DT_OUTORGAFINAL": "2022-05-12",
                "OUT_DT_OUTORGAINICIAL": "2020-05-12",
                "OUT_NU_PROCESSO": "19700XX922010",
                "OUT_TP_ATO": "OUTORGA",
                "OUT_NU_ATO": "02082020",
                "DAD_QT_VAZAODIAJAN": "0",
                "DAD_QT_VAZAODIAFEV": "252",
                "DAD_QT_VAZAODIAMAR": "252",
                "DAD_QT_VAZAODIAABR": "252",
                "DAD_QT_VAZAODIAMAI": "252",
                "DAD_QT_VAZAODIAJUN": "252",
                "DAD_QT_VAZAODIAJUL": "252",
                "DAD_QT_VAZAODIAAGO": "252",
                "DAD_QT_VAZAODIASET": "252",
                "DAD_QT_VAZAODIAOUT": "252",
                "DAD_QT_VAZAODIANOV": "0",
                "DAD_QT_VAZAODIADEZ": "0",
                "DAD_QT_HORASJAN": "0",
                "DAD_QT_HORASFEV": "16",
                "DAD_QT_HORASMAR": "16",
                "DAD_QT_HORASABR": "16",
                "DAD_QT_HORASMAI": "16",
                "DAD_QT_HORASJUN": "16",
                "DAD_QT_HORASJUL": "16",
                "DAD_QT_HORASAGO": "16",
                "DAD_QT_HORASSET": "16",
                "DAD_QT_HORASOUT": "16",
                "DAD_QT_HORASNOV": "0",
                "DAD_QT_HORASDEZ": "0",
                "DAD_QT_DIAJAN": "0",
                "DAD_QT_DIAFEV": "28",
                "DAD_QT_DIAMAR": "31",
                "DAD_QT_DIAABR": "30",
                "DAD_QT_DIAMAI": "31",
                "DAD_QT_DIAJUN": "30",
                "DAD_QT_DIAJUL": "31",
                "DAD_QT_DIAAGO": "31",
                "DAD_QT_DIASET": "30",
                "DAD_QT_DIAOUT": "31",
                "DAD_QT_DIANOV": "0",
                "DAD_QT_DIADEZ": "0",
                "INT_QT_VAZAOMAXIMA": "252",
                "INT_QT_VAZAOMEDIA": "189",
                "INT_QT_VOLUMEANUAL": "1100736",
                "FIN_TFN_DS": "Irrigação",
                "FIN_TFN_CD": "5",
                "SIR_TSI_DS": "Aspersão por sistema pivô central",
                "SIR_TSI_CD": "6",
                "SIR_TCT_DS": "Soja",
                "SIR_TCT_CD": "42",
                "DATA_EXTRACAO": "2022-09-27",
                "ING_CD_OTTOBACIA_TRECHO": "7684951",
                "ING_CD_COMITEFEDERAL": "7",
                "ING_NM_COMITEFEDERAL": "CBH do Rio São Francisco",
                "ING_CD_COMITEESTADUAL": "159",
                "ING_NM_COMITEESTADUAL": "CBH dos Afluentes do Rio Preto",
                "ING_CS_CONAMA": "1"
            },
            {
                "INT_CD": "11XX989",
                "INT_TIN_DS": "Captação",
                "INT_TIN_CD": "1",
                "INT_TSU_DS": "Superficial",
                "INT_TSU_CD": "1",
                "INT_TCH_CD": "2",
                "INT_TCH_DS": "Espelho D'Água",
                "INT_TSI_DS": "",
                "INT_TSI_CD": "",
                "INT_TOD_DS": "ETL - Migração Outorgas Estaduais",
                "INT_TOD_CD": "1",
                "INT_TDM_DS": "Estadual",
                "INT_TDM_CD": "1",
                "INT_NU_CNARH": "700000101951",
                "INT_NU_SIAGAS": "",
                "INT_NU_LATITUDE": "-15.754055",
                "INT_NU_LONGITUDE": "-47.3529",
                "ING_NU_IBGEMUNICIPIO": "5300108",
                "ING_SG_UFMUNICIPIO": "DF",
                "ING_NM_MUNICIPIO": "BRASÍLIA",
                "INT_NM_CORPOHIDRICO": "BARRAGEM 01",
                "INT_NM_CORPOHIDRICOALTERADO": "",
                "INT_DS_ORGAO": "ADASA",
                "INT_CD_ORGAO": "53",
                "INT_CD_INTERFERENCIAORIGINAL": "",
                "INT_DT_REGISTRO": "2021-01-06",
                "INT_CD_DECLARACAO": "",
                "INT_CD_ORIGEM": "",
                "INT_DS_OPCIONAL": "",
                "EMP_NM_EMPREENDIMENTO": "VC 169 LOTES XXXX E XXX",
                "EMP_NM_USUARIO": "DARCI JOSÉ MARTARELO",
                "EMP_NU_CPFCNPJ": "10258809949",
                "EMP_DS_EMAILRESPONSAVEL": "JVIEIRA@XXXX.COM.BR",
                "OUT_TP_OUTORGA": "Direito de Uso",
                "OUT_TPO_CD": "1",
                "OUT_TP_SITUACAOOUTORGA": "Outorgado",
                "OUT_TSP_CD": "1",
                "OUT_DT_OUTORGAFINAL": "2022-05-12",
                "OUT_DT_OUTORGAINICIAL": "2020-05-12",
                "OUT_NU_PROCESSO": "19700XX922010",
                "OUT_TP_ATO": "OUTORGA",
                "OUT_NU_ATO": "02082020",
                "DAD_QT_VAZAODIAJAN": "0",
                "DAD_QT_VAZAODIAFEV": "252",
                "DAD_QT_VAZAODIAMAR": "252",
                "DAD_QT_VAZAODIAABR": "252",
                "DAD_QT_VAZAODIAMAI": "252",
                "DAD_QT_VAZAODIAJUN": "252",
                "DAD_QT_VAZAODIAJUL": "252",
                "DAD_QT_VAZAODIAAGO": "252",
                "DAD_QT_VAZAODIASET": "252",
                "DAD_QT_VAZAODIAOUT": "252",
                "DAD_QT_VAZAODIANOV": "0",
                "DAD_QT_VAZAODIADEZ": "0",
                "DAD_QT_HORASJAN": "0",
                "DAD_QT_HORASFEV": "16",
                "DAD_QT_HORASMAR": "16",
                "DAD_QT_HORASABR": "16",
                "DAD_QT_HORASMAI": "16",
                "DAD_QT_HORASJUN": "16",
                "DAD_QT_HORASJUL": "16",
                "DAD_QT_HORASAGO": "16",
                "DAD_QT_HORASSET": "16",
                "DAD_QT_HORASOUT": "16",
                "DAD_QT_HORASNOV": "0",
                "DAD_QT_HORASDEZ": "0",
                "DAD_QT_DIAJAN": "0",
                "DAD_QT_DIAFEV": "28",
                "DAD_QT_DIAMAR": "31",
                "DAD_QT_DIAABR": "30",
                "DAD_QT_DIAMAI": "31",
                "DAD_QT_DIAJUN": "30",
                "DAD_QT_DIAJUL": "31",
                "DAD_QT_DIAAGO": "31",
                "DAD_QT_DIASET": "30",
                "DAD_QT_DIAOUT": "31",
                "DAD_QT_DIANOV": "0",
                "DAD_QT_DIADEZ": "0",
                "INT_QT_VAZAOMAXIMA": "252",
                "INT_QT_VAZAOMEDIA": "189",
                "INT_QT_VOLUMEANUAL": "1100736",
                "FIN_TFN_DS": "Irrigação",
                "FIN_TFN_CD": "5",
                "SIR_TSI_DS": "Aspersão por sistema pivô central",
                "SIR_TSI_CD": "6",
                "SIR_TCT_DS": "Soja",
                "SIR_TCT_CD": "42",
                "DATA_EXTRACAO": "2022-09-27",
                "ING_CD_OTTOBACIA_TRECHO": "7684951",
                "ING_CD_COMITEFEDERAL": "7",
                "ING_NM_COMITEFEDERAL": "CBH do Rio São Francisco",
                "ING_CD_COMITEESTADUAL": "159",
                "ING_NM_COMITEESTADUAL": "CBH dos Afluentes do Rio Preto",
                "ING_CS_CONAMA": "1"
            },
            {
                "INT_CD": "11XX989",
                "INT_TIN_DS": "Captação",
                "INT_TIN_CD": "1",
                "INT_TSU_DS": "Superficial",
                "INT_TSU_CD": "1",
                "INT_TCH_CD": "2",
                "INT_TCH_DS": "Espelho D'Água",
                "INT_TSI_DS": "",
                "INT_TSI_CD": "",
                "INT_TOD_DS": "ETL - Migração Outorgas Estaduais",
                "INT_TOD_CD": "1",
                "INT_TDM_DS": "Estadual",
                "INT_TDM_CD": "1",
                "INT_NU_CNARH": "700000101951",
                "INT_NU_SIAGAS": "",
                "INT_NU_LATITUDE": "-15.754055",
                "INT_NU_LONGITUDE": "-47.3529",
                "ING_NU_IBGEMUNICIPIO": "5300108",
                "ING_SG_UFMUNICIPIO": "DF",
                "ING_NM_MUNICIPIO": "BRASÍLIA",
                "INT_NM_CORPOHIDRICO": "BARRAGEM 01",
                "INT_DS_ORGAO": "ADASA",
                "INT_CD_ORGAO": "53",
                "INT_CD_INTERFERENCIAORIGINAL": "",
                "INT_DT_REGISTRO": "2021-01-06",
                "INT_CD_DECLARACAO": "",
                "INT_CD_ORIGEM": "",
                "INT_DS_OPCIONAL": "",
                "EMP_NM_EMPREENDIMENTO": "VC 169 LOTES XXXX E XXX",
                "EMP_NM_USUARIO": "DARCI JOSÉ MARTARELO",
                "EMP_NU_CPFCNPJ": "10258809949",
                "EMP_DS_EMAILRESPONSAVEL": "JVIEIRA@XXXX.COM.BR",
                "OUT_TP_OUTORGA": "Direito de Uso",
                "OUT_TPO_CD": "1",
                "OUT_TP_SITUACAOOUTORGA": "Outorgado",
                "OUT_TSP_CD": "1",
                "OUT_DT_OUTORGAFINAL": "2022-05-12",
                "OUT_DT_OUTORGAINICIAL": "2020-05-12",
                "OUT_NU_PROCESSO": "19700XX922010",
                "OUT_TP_ATO": "OUTORGA",
                "OUT_NU_ATO": "02082020",
                "DAD_QT_VAZAODIAJAN": "0",
                "DAD_QT_VAZAODIAFEV": "252",
                "DAD_QT_VAZAODIAMAR": "252",
                "DAD_QT_VAZAODIAABR": "252",
                "DAD_QT_VAZAODIAMAI": "252",
                "DAD_QT_VAZAODIAJUN": "252",
                "DAD_QT_VAZAODIAJUL": "252",
                "DAD_QT_VAZAODIAAGO": "252",
                "DAD_QT_VAZAODIASET": "252",
                "DAD_QT_VAZAODIAOUT": "252",
                "DAD_QT_VAZAODIANOV": "0",
                "DAD_QT_VAZAODIADEZ": "0",
                "DAD_QT_HORASJAN": "0",
                "DAD_QT_HORASFEV": "16",
                "DAD_QT_HORASMAR": "16",
                "DAD_QT_HORASABR": "16",
                "DAD_QT_HORASMAI": "16",
                "DAD_QT_HORASJUN": "16",
                "DAD_QT_HORASJUL": "16",
                "DAD_QT_HORASAGO": "16",
                "DAD_QT_HORASSET": "16",
                "DAD_QT_HORASOUT": "16",
                "DAD_QT_HORASNOV": "0",
                "DAD_QT_HORASDEZ": "0",
                "DAD_QT_DIAJAN": "0",
                "DAD_QT_DIAFEV": "28",
                "DAD_QT_DIAMAR": "31",
                "DAD_QT_DIAABR": "30",
                "DAD_QT_DIAMAI": "31",
                "DAD_QT_DIAJUN": "30",
                "DAD_QT_DIAJUL": "31",
                "DAD_QT_DIAAGO": "31",
                "DAD_QT_DIASET": "30",
                "DAD_QT_DIAOUT": "31",
                "DAD_QT_DIANOV": "0",
                "DAD_QT_DIADEZ": "0",
                "INT_QT_VAZAOMAXIMA": "252",
                "INT_QT_VAZAOMEDIA": "189",
                "INT_QT_VOLUMEANUAL": "1100736",
                "FIN_TFN_DS": "Irrigação",
                "FIN_TFN_CD": "5",
                "SIR_TSI_DS": "Aspersão por sistema pivô central",
                "SIR_TSI_CD": "6",
                "SIR_TCT_DS": "Soja",
                "SIR_TCT_CD": "42",
                "DATA_EXTRACAO": "2022-09-27",
                "ING_CD_OTTOBACIA_TRECHO": "7684951",
                "ING_CD_COMITEFEDERAL": "7",
                "ING_NM_COMITEFEDERAL": "CBH do Rio São Francisco",
                "ING_CD_COMITEESTADUAL": "159",
                "ING_NM_COMITEESTADUAL": "CBH dos Afluentes do Rio Preto",
                "ING_CS_CONAMA": "1"
            }
        ],
        "errors": [

        ],
        "meta": {}

    }

    return data


}

export default exportCsv;