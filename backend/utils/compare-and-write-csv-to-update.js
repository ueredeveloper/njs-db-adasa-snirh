const { isFloat, convertFloatToCommaString } = require('./convert-float-to-string');
const { convertJSONToCSV } = require('./convert-json-to-csv');
const { formatCpfCnpj } = require('./format-cpf-cnpj');
const { isDate, convertDateFormat } = require('./verify-and-convert-dates');

const compareAndWriteCsvToUpdate = (federalJson, stateJson) => {

    let id = federalJson.INT_CD

    // Cria array para formatar valores de acordo com o SNIRH.
    let stateKeyValues = Object.entries(stateJson);


    let objectToSend = stateJson

    // VERIFICAR SE É NECESSÁRIO ESTES FILTROS E FORMATAÇÕES.
    // ESTÁ DANDO ERRO NAS LINHAS DE VAZÕES, O VALOR ESTÁ VINDO 0,00 E CONVERTENDO PARA 0. TEM QUE SER DECIMAL, => 0,00
    // Na primeira vez adiciona todos os atributos
    stateKeyValues.forEach(([key, value]) => {

        // Verifica se a string é composta apenas por espaços
        if (/^\s+$/.test(value)) {
            value = ""; // Esvazia a variável
        }

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
    objectToSend.FIN_CD = federalJson.FIN_CD
    
    convertJSONToCSV(objectToSend, `./backend/data/csv/${objectToSend.INT_CD_ORIGEM}.csv`)

}

module.exports = {compareAndWriteCsvToUpdate}