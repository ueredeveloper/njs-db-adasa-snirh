const Papa = require('papaparse');
const fs = require('fs');
const dictionary = require('../data/dictionary')
const colors = require('colors');

/**
 * Comparação de jsons. Use: npx jest tests/compare-csv-data.test.js
 * @param {*} filePath 
 * @returns 
 */
function convertCSVToJSON(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            Papa.parse(data, {
                header: true,
                delimiter: ";",
                complete: (results) => {
                    resolve(results.data);
                },
                error: (error) => {
                    reject(error);
                }
            });
        });
    });
}

function formatValueWithColor(value, colorCode) {
    return `\x1b[${colorCode}m${value}\x1b[0m`;
  }

describe('CSV Comparison', () => {
    test('compara dois arquivos csv e criar um json com dados do dicionário de regras', async () => {

        //C:\workspace\njs-db-adasa-snirh\backend\data\csv\edicao.csv

        // Este arquivo foi bem inserido e aceito, por isso é um exemplo para  comparação
        const data1 = await convertCSVToJSON('./backend/data/csv/to-insert-grants-OK-1248360-INSERIDO-1731421475297.csv');
       
       // C:\workspace\njs-db-adasa-snirh\backend\data\csv\to-insert-grants-1733499386164.csv

        const data2 = await convertCSVToJSON('./backend/data/csv/to-insert-grants-1733499386164.csv')

        // Juntar attibutos presentes nos dois arquivos 
        const result = [];

        // Copy array1 elements to result
        data1.forEach(obj1 => {
            const newObj = {};
            Object.keys(obj1).forEach(key => {
                newObj[key] = [obj1[key]]; // Push the attribute of array1
            });

            let newObjWithColor = {}
            // Adiciona cor amarela ao valor
            for (const [key, value] of Object.entries(newObj)) {

                // Se valor vazio, preencha com 3 hífens (---)
                if (value[0]==='') {
                    newObjWithColor[key] =  ['\x1b[33m  '+'---'+' \x1b[0m']
                } else {
                    // 33 -> amarelo
                    newObjWithColor[key] =  [formatValueWithColor(value, '33')]//['\x1b[33m  '+value+' \x1b[0m']
                }
                
            }

           result.push(newObjWithColor)

        });

        
        // Merge array2 elements with result
        data2.forEach(obj2 => {
            Object.keys(obj2).forEach(key => {
                const existingObj = result.find(obj => obj.hasOwnProperty(key));
                if (existingObj) {
                    existingObj[key].push(obj2[key]);
                    let dic = Object.values(dictionary).find(item => item.nomeColuna === key);

                    let tipoDado = dic ? dic.tipoDado : '';

                    existingObj[key].push(tipoDado);

                    // Se valor vazio, preencha com 3 hífens (---)
                    let existingObjWithColor = existingObj[key].map(arr => {
                        if (arr === '') {
                            return '---'
                        }
                        return arr
                    });

                    let exemplo = dic ? dic.exemplo : '';
                    // Cor verde
                    exemplo =  formatValueWithColor(exemplo, '32') //'\x1b[32m' + ', ' + exemplo + '\x1b[0m'
                    // Adiciona exemplo de dado em cor verde
                    existingObjWithColor = existingObjWithColor.join(',') + exemplo

                    let obs = dic ? dic.obs : '';
                    // Cor vermelho, se obrigatório ou não.
                    obs = formatValueWithColor(obs, '31') //'\x1b[31m' + obs + '\x1b[0m]'

                    //Adiciona observação colorida em vermelho
                    existingObj[key] = existingObjWithColor + ', -> ' + obs


                } else {
                    const newObj = {};
                    newObj[key] = [obj2[key]];

                    let dic = Object.values(dictionary).find(item => item.nomeColuna === key);

                    let tipoDado = dic ? dic.tipoDado : '';
                    newObj[key].push(tipoDado);

                    // Se valor vazio, preencha com 3 hífens (---)
                    let existingObjWithColor = newObj[key].map(arr => {
                        if (arr === '') {
                            return '---'
                        }
                        return arr
                    });

                    let exemplo = dic ? dic.exemplo : '';
                    // Cor verde, exemplo de dado.
                    exemplo = formatValueWithColor(exemplo, '32') //'\x1b[32m' + exemplo + '\x1b[0m'
                    existingObjWithColor = existingObjWithColor.join(',') + exemplo

                    let obs = dic ? dic.obs : '';
                    // Cor vermelho, se obrigatório ou não.
                    obs = formatValueWithColor(obs, '31') //'\x1b[31m' + obs + '\x1b[0m]'
                    //newObj[key].push(obs);


                    newObj[key] = existingObjWithColor + ', ---> ' + obs

                }
            });
        });

        // Variável para visualização
        let print = []
        for (const [key, value] of Object.entries(result[0])) {
            print.push(`${key}: ${value} \n`);
        }

        console.log(print.join(''))
       
    });
});
