const Papa = require('papaparse');
const fs = require('fs');

function parseCSVToJson(filePath) {
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

describe('CSV Parsing with PapaParse', () => {
    test('should parse CSV file correctly and return JSON', async () => {

        //C:\workspace\njs-db-adasa-snirh\backend\data\csv\edicao.csv

        const data1 = await parseCSVToJson('./backend/data/csv/edicao.csv');
        const data2 = await parseCSVToJson('./backend/data/csv/export-csv-test.csv')

        // Juntar attibutos presentes nos dois arquivos 
        const result = [];

        // Copy array1 elements to result
        data1.forEach(obj1 => {
            const newObj = {};
            Object.keys(obj1).forEach(key => {
                newObj[key] = [obj1[key]]; // Push the attribute of array1
            });
            result.push(newObj);
        });

        // Merge array2 elements with result
        data2.forEach(obj2 => {
            Object.keys(obj2).forEach(key => {
                const existingObj = result.find(obj => obj.hasOwnProperty(key));
                if (existingObj) {
                    existingObj[key].push(obj2[key]);
                } else {
                    const newObj = {};
                    newObj[key] = [obj2[key]];
                    result.push(newObj);
                }
            });
        });

        console.log(result);


        //console.log(jsonData)
        // Assuming 'data.csv' contains CSV data
        // expect(jsonData).toHaveLength(1); // Assuming 3 rows in the CSV
        // Add more assertions based on your CSV content and JSON data
    });
});
