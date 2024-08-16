const fs = require('fs');
const { Parser } = require('json2csv');

function  convertJSONToCSV(jsonData, filePath) {

    return new Promise((resolve, reject) => {
        try {
            const json2csvParser = new Parser({ delimiter: ';', quote: '' });
            let csv = json2csvParser.parse(jsonData);

            // Removendo todas as aspas duplas
            csv = csv.replace(/"/g, '');


            fs.writeFile(filePath, csv, 'utf8', (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve('CSV file has been saved.');
            });
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = { convertJSONToCSV }
