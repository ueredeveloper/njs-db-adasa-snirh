const fs = require('fs');
const Papa = require('papaparse');
const iconv = require("iconv-lite");

/**
 * Converte o arquivo com outorgas baixado no CNARH .csv em formato .json para que seja possível pesquisar as 
 * outorgas já cadastradas no sistema da Ana (SNIRH).
 * Para utilizar é só atualizar os  links de entrada e saída e no prompt digitar: node backend/utils/convert-csv-to-json-and-write.js
 * 
 * @param {*} filePath 
 * @param {*} outputFilePath 
 * @returns 
 */
function convertCSVToJSON(filePath, outputFilePath) {

    console.log('convert json to csv and write')
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, buffer) => {
            if (err) {
                reject(err);
                return;
            }
            // Força a conversão do arquivo do cnarh para UTF-8
            const data = iconv.decode(buffer, "utf8");

            Papa.parse(data, {
                header: true,
                delimiter: ";",
                complete: (results) => {
                    const jsonData = results.data;

                    let array = Object.keys(dataExample)

                    let toWrite = jsonData.map((toUpdateAttributes, i) => {

                        let grant = {
                            INT_CD: toUpdateAttributes["INT_CD_CNARH40"]
                        }

                        array.forEach((attr, index) => {
                            //console.log(attr["INT_CD"])
                            // Pula o atributo INT_ID, já adicionado na ciração do objeto
                            //if (index > 0) {
                                
                                if (attr === "EMP_NM_RESPONSAVEL") {
                                    grant[attr] = toUpdateAttributes["EMP_NM_USUARIO"]
                                } else {
                                    grant[attr] = toUpdateAttributes[attr]
                                }

                            //}

                        });

                        // colocar nas últimas posições do objeto
                        grant["INT_CD_CNARH40"] = toUpdateAttributes["INT_CD_CNARH40"]
                        grant["EMP_NM_USUARIO"] = toUpdateAttributes["EMP_NM_USUARIO"]

                        return grant;

                    })

                    /** @type {Array<Object>} */
                    let toWriteDuplicateds = toWrite.filter(
                        // Busca valores duplicados pelo id da interferência na Adasa (INT_CD_ORIGEM)
                        (objeto, indice, arr) => {
                            if (objeto.INT_CD_ORIGEM !== "") {
                                return arr.findIndex(obj => obj.INT_CD_ORIGEM === objeto.INT_CD_ORIGEM) !== indice
                            }

                        }
                    );

                    // Write the JSON data to a file
                    fs.writeFile("./backend/data/json/duplicatedIds.json", JSON.stringify(toWriteDuplicateds), 'utf8', (writeErr) => {
                        if (writeErr) {
                            reject(writeErr);
                            return;
                        }
                        resolve(jsonData);  // Resolve with JSON data if successful
                    });



                    // Write the JSON data to a file
                    fs.writeFile(outputFilePath, JSON.stringify(toWrite), 'utf8', (writeErr) => {
                        if (writeErr) {
                            reject(writeErr);
                            return;
                        }
                        resolve(jsonData);  // Resolve with JSON data if successful
                    });
                },
                error: (parseError) => {
                    reject(parseError);
                }
            });
        });
    });
}

let dataExample = {
    "INT_CD": "",
    "INT_CD_ORIGEM": "",
    "INT_DS_OPCIONAL": "",
    "INT_TIN_CD": "1", "INT_TSU_CD": "2", "INT_NU_SIAGAS": "", "INT_NU_LATITUDE": "#-15.898411", "INT_NU_LONGITUDE": "#-47.561376",
    "INT_NM_CORPOHIDRICOALTERADO": "", "EMP_NM_EMPREENDIMENTO": "NÃCLEO RURAL CAFÃ SEM TROCO, FAZENDA SANTO ANTÃNIO DOS GUIMARÃES",
    "EMP_NM_RESPONSAVEL": "GIVANILDO GRECCO", "EMP_NU_CPFCNPJ": "018.943.951-31", "EMP_DS_EMAILRESPONSAVEL": "lau.calliandra@gmail.com",
    "EMP_NU_CEPENDERECO": "73.330-971", "EMP_DS_LOGRADOURO": "AVENIDA SÃO PAULO 33, LOTE 19, LOJA 1, CAIXA POSTAL 10737", "EMP_DS_COMPLEMENTOENDERECO": "",
    "EMP_NU_LOGRADOURO": "", "EMP_NU_CAIXAPOSTAL": "10737", "EMP_DS_BAIRRO": "Setor Tradicional (Planaltina)", "EMP_NU_DDD": "61",
    "EMP_NU_TELEFONE": "996633180", "EMP_CD_IBGEMUNCORRESPONDENCIA": "5300108", "OUT_TP_OUTORGA": "1", "OUT_TP_SITUACAOOUTORGA": "1",
    "OUT_DT_OUTORGAINICIAL": "04/07/2025", "OUT_DT_OUTORGAFINAL": "03/07/2035", "OUT_NU_PROCESSO": "00197-00002288/2025-54", "OUT_TP_ATO": "OUTORGA",
    "OUT_NU_ATO": "0297/2025", "DAD_QT_VAZAODIAJAN": "18,90", "DAD_QT_VAZAODIAFEV": "18,90", "DAD_QT_VAZAODIAMAR": "18,90", "DAD_QT_VAZAODIAABR": "18,90",
    "DAD_QT_VAZAODIAMAI": "18,90", "DAD_QT_VAZAODIAJUN": "18,90", "DAD_QT_VAZAODIAJUL": "18,90", "DAD_QT_VAZAODIAAGO": "18,90",
    "DAD_QT_VAZAODIASET": "18,90", "DAD_QT_VAZAODIAOUT": "18,90", "DAD_QT_VAZAODIANOV": "18,90", "DAD_QT_VAZAODIADEZ": "18,90", "DAD_QT_HORASJAN": "20",
    "DAD_QT_HORASFEV": "20", "DAD_QT_HORASMAR": "20", "DAD_QT_HORASABR": "20", "DAD_QT_HORASMAI": "20", "DAD_QT_HORASJUN": "20", "DAD_QT_HORASJUL": "20",
    "DAD_QT_HORASAGO": "20", "DAD_QT_HORASSET": "20", "DAD_QT_HORASOUT": "20", "DAD_QT_HORASNOV": "20", "DAD_QT_HORASDEZ": "20", "DAD_QT_DIAJAN": "31",
    "DAD_QT_DIAFEV": "28", "DAD_QT_DIAMAR": "31", "DAD_QT_DIAABR": "30", "DAD_QT_DIAMAI": "31", "DAD_QT_DIAJUN": "30", "DAD_QT_DIAJUL": "31",
    "DAD_QT_DIAAGO": "31", "DAD_QT_DIASET": "30", "DAD_QT_DIAOUT": "31", "DAD_QT_DIANOV": "30", "DAD_QT_DIADEZ": "31", "FIN_CD": "1489127",
    "FIN_TFN_CD": "5", "FES_NU_PROFUNDIDADEMEDIATANQUE": "", "FES_NU_AREATOTALTANQUE": "", "TTC_CD": "", "TTC_TCU_CD": "", "FSE_TES_CD": "",
    "FIE_TPS_CD": "", "FAH_TAH_CD": "", "FAH_NU_POTENCIAINSTALADA": "", "FAH_IC_APROVEITAMENTOFIODAGUA": "", "FAH_NU_AREAINUNDADANA": "",
    "FAH_NU_VOLUMENA": "", "FPE_TPE_CD": "", "FPE_CNA_CD": "", "ETP_CD": "", "ETP_MPE_CD": "", "ETP_NU_QUANTIDADEMAXMENSAL": "", "IUS_NU_ALTURARES": "",
    "IUS_NU_AREARESMAX": "", "IUS_NU_VOLUMERES": "", "IUS_NM_ENTIDADECONCEDENTE": "", "IUS_NU_CONCESSAO": "", "IUS_DT_FINALCONCESSAO": "",
    "SIR_CD": "929089", "SIR_TSI_CD": "5", "SIR_TCT_CD": "1120", "SIR_NU_AREAIRRIGADA": "120,00", "FTE_NU_POTENCIAINSTALADA": "",
    "FTE_NU_PRODUCAOMENSALMEDIA": "", "FTE_TCO_CD": "", "FTE_TSR_CD": "", "FEA_NU_PRODUCAOMAXMENSALAREIA": "", "FEA_NU_PROPORCAOAGUAPOLPA": "",
    "FEA_PC_TEORUMIDADE": "", "FOH_TOH_CD": "", "FRE_NU_AREAINUNDADANA": "", "FRE_NU_VOLUMENA": "", "OTO_TOU_CD": "", "OTO_CD": "",
    "OTO_NM_OUTROUSO": "", "OTO_DS_OUTROUSO": "", "HTE_CD": "", "HTE_NU_QUANTIDADE": "", "TUC_TEC_CD": "", "TUC_CD": "", "FTR_AR_TOTALEMPREENDIMENTO": "",
    "ESC_CD": "", "ESC_NU_PRODUCAOPRETENDIDA": "", "ESC_TET_CD": "", "CTE_CD": "", "CTE_TSC_CD": "", "CTE_TCA_CD": "", "CTE_NU_CABECAS": "", "ITC_CD": "",
    "ITC_TUM_CD": "", "ITC_NU_PRODUCAOANUAL": "", "ITC_CNA_CD": "", "EFL_NU_DBOBRUTO": "", "EFL_NU_DBOTRATADO": "", "EFL_NU_FOSFOROBRUTO": "",
    "EFL_NU_FOSFOROTRATADO": "", "EFL_NU_NITROGENIOBRUTO": "", "EFL_NU_NITROGENIOTRATADO": "", "EFL_NU_TEMPERATURA": "", "EFL_TTE_CD": "",
    "ASB_DT_INSTALACAO": "", "ASB_TNP_CD": "10", "ASB_NU_DIAMETROPERFURACAO": "", "ASB_NU_DIAMETROFILTRO": "", "ASB_TPA_CD": "", "ASB_NU_TOPO": "",
    "ASB_NU_BASE": "", "ASB_TCQ_CD": "", "ASB_NU_PROFUNDIDADEFINAL": "", "ASB_NU_ALTURABOCATUBO": "", "ASB_NU_COTATERRENO": "",
    "ASB_DS_AQUIFEROEXPLOTADO": "", "TST_TTB_CD": "6", "TST_DS_TEMPODURACAO": "", "TST_NU_ND": "", "TST_NU_NE": "", "TST_VZ_ESTABILIZACAO": "",
    "TST_TMI_CD": "", "TST_NU_COEFICIENTEARMAZENAMENT": "", "TST_NU_TRANSMISSIVIDADE": "", "TST_NU_CONDUTIVIDADEHIDRAULICA": "", "TST_NU_PERMEABILIDADE": "",
    "AMA_DT_COLETA": "", "AMA_DT_ANALISE": "", "AMA_NU_CONDUTIVIDADEELETRICA": "", "AMA_QT_TEMPERATURA": "", "AMA_QT_STD": "", "AMA_QT_PH": "",
    "AMA_QT_COLIFORMESTOTAIS": "", "AMA_QT_COLIFORMESFECAIS": "", "AMA_QT_BICARBONATO": "", "AMA_QT_CALCIO": "", "AMA_QT_CARBONATO": "",
    "AMA_QT_CLORETO": "", "AMA_QT_DUREZATOTAL": "", "AMA_QT_FERROTOTAL": "", "AMA_QT_FLUORETOS": "", "AMA_QT_NITRATOS": "", "AMA_QT_NITRITOS": "",
    "AMA_QT_POTASSIO": "", "AMA_QT_SODIO": "", "AMA_QT_SULFATO": "", "AMA_QT_MAGNESIO": ""
}

// Usage example:
convertCSVToJSON('./backend/data/csv/cnarh/exportacao_cnarh40_DF-011225.csv', './backend/data/json/exportacao_cnarh40_DF.json')
    .then((jsonData) => {
        console.log("CSV successfully converted to JSON and written to file.");
    })
    .catch((error) => {
        console.error("Error:", error);
    });
