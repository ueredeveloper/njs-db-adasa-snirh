const fs = require('fs');
const csv = require('csv-parser');

function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

describe('CSV Parsing', () => {
  test('should parse CSV file correctly', async () => {
    // C:\workspace\njs-db-adasa-snirh\backend\data\csv
    const data = await parseCSV('./backend/data/csv/export-csv-test.csv');
    console.log(data)
    // Assuming 'data.csv' contains CSV data
    //expect(data).toHaveLength(1); // Assuming 3 rows in the CSV
    // Add more assertions based on your CSV content
  });
});
