const exampleJsonBody = require('../services/shared/example-json-body');
const { isFloat, convertFloatToCommaString } = require('./convert-float-to-string');
const { convertJSONToCSV } = require('./convert-json-to-csv');
const { formatCpfCnpj } = require('./format-cpf-cnpj');
const { isDate, convertDateFormat } = require('./verify-and-convert-dates');

const compareAndWriteListGrants = async (toUpdateGrants) => {

    return new Promise(async (resolve, reject) => {
        try {

         let toUpdateGrantsEdited =  toUpdateGrants.map(item=>{

            let {stateGrant, federalGrant} = item;

            let id = federalGrant.INT_CD;

             // Cria array para formatar valores de acordo com o SNIRH.
             let stateKeyValues = Object.entries(stateGrant);
             let objectToSend = stateGrant;

             stateKeyValues.forEach(([key, value]) => {
                // Remove espaços no início e no final da string, let i = "   Olá, mundo!   " => "Olá Mundo!"
                if (/^\s+$/.test(value)) {
                    value = "";
                }
                // Convert float para string
                if (isFloat(value)) {
                    let str = convertFloatToCommaString(value);
                    objectToSend[key] = str;
                // Adiciona caractere ao cpf: #
                } else if (key === 'EMP_NU_CPFCNPJ') {
                    let cpfCnpj = '#' + formatCpfCnpj(value);
                    objectToSend[key] = cpfCnpj;
                //Converte data para formato dos SNIRH, 2015-01-02 => 02/01/2015    
                } else if (isDate(value)) {
                    let dataConverted = convertDateFormat(value);
                    objectToSend[key] = dataConverted;
                // Modifica demais objetos utilizando os dados do Estado.
                } else {
                    objectToSend[key] = value;
                }
            });

            // O valor INT_CD vem do SNRIH.
            objectToSend.INT_CD = id;
            // O valor FIN_CD vem do SNRIH.
            objectToSend.FIN_CD = federalGrant.FIN_CD;

            return objectToSend;

         });

         // Converte Json para Csv
         await convertJSONToCSV(toUpdateGrantsEdited, `./backend/data/csv/toUpdateGrants.csv`);
         // Caminho que será salvo o arquivo csv.
         resolve(`./backend/data/csv/toUpdateGrants.csv`);

        } catch (error) {
            reject(error);
        }
    });
};

module.exports = { compareAndWriteListGrants }

compareAndWriteListGrants(exampleJsonBody)