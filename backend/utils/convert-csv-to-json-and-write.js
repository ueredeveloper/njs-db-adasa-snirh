const fs = require('fs');
const Papa = require('papaparse');

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
                    const jsonData = results.data;
                    
                    // Write the JSON data to a file
                    fs.writeFile(outputFilePath, JSON.stringify(jsonData, null, 2), 'utf8', (writeErr) => {
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

// Usage example:
convertCSVToJSON('./backend/data/csv/exportacao_cnarh40_app_DF-14112024.csv', './backend/data/exportacao_cnarh40_app_DF-14112024.json')
    .then((jsonData) => {
        console.log("CSV successfully converted to JSON and written to file.");
    })
    .catch((error) => {
        console.error("Error:", error);
    });
