const fs = require('fs');
const { Parser } = require('json2csv');

function convertJSONToCSV(jsonData, filePath) {
    return new Promise((resolve, reject) => {
        try {
            const json2csvParser = new Parser({ delimiter: ';' });
            const csv = json2csvParser.parse(jsonData);
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
/*
// Example usage:
const jsonData = [
    { "name": "John", "age": 30, "city": "New York" },
    { "name": "Jane", "age": 25, "city": "Paris" }
];

convertJSONToCSV(jsonData, 'output.csv')
    .then(message => console.log(message))
    .catch(error => console.error(error));*/

module.exports = { convertJSONToCSV }
