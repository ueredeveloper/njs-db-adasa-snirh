const { isFloat, convertFloatToCommaString } = require('./convert-float-to-string');
const { convertJSONToCSV } = require('./convert-json-to-csv');
const { formatCpfCnpj } = require('./format-cpf-cnpj');
const { isDate, convertDateFormat } = require('./verify-and-convert-dates');

const compareAndWriteCsvToUpdate = async (federalJson, stateJson) => {
    return new Promise(async (resolve, reject) => {
        try {
            let id = federalJson.INT_CD;

            // Cria array para formatar valores de acordo com o SNIRH.
            let stateKeyValues = Object.entries(stateJson);
            let objectToSend = stateJson;

            stateKeyValues.forEach(([key, value]) => {
                if (/^\s+$/.test(value)) {
                    value = ""; 
                }

                if (isFloat(value)) {
                    let str = convertFloatToCommaString(value);
                    objectToSend[key] = str;
                } else if (key === 'EMP_NU_CPFCNPJ') {
                    let cpfCnpj = '#' + formatCpfCnpj(value);
                    objectToSend[key] = cpfCnpj;
                } else if (isDate(value)) {
                    let dataConverted = convertDateFormat(value);
                    objectToSend[key] = dataConverted;
                } else {
                    objectToSend[key] = value;
                }
            });

            objectToSend.INT_CD = id;
            objectToSend.FIN_CD = federalJson.FIN_CD;

            await convertJSONToCSV(objectToSend, `./backend/data/csv/${objectToSend.INT_CD_ORIGEM}.csv`);

            resolve(`./backend/data/csv/${objectToSend.INT_CD_ORIGEM}.csv`);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {compareAndWriteCsvToUpdate}