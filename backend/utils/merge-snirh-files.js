const fs = require('fs');


/**
 * Une dos dois arquivos de outorgas dos sistema snirh. Tanto aqueles editados pelo sistema e o backup do arquivo
 * .csv obtido no sistema Cnarh.
 * Para utilização: node backend/utils/merge-snirh-files.js
 * @param {*} filePath 
 * @param {*} callback 
 */
const readFile = (filePath, callback) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file ${filePath}:`, err);
      callback(err, null);
      return;
    }
    try {
      const dataArray = JSON.parse(data.trim());
      callback(null, dataArray);
    } catch (parseErr) {
      console.error(`Error parsing JSON from file ${filePath}:`, parseErr);
      callback(parseErr, null);
    }
  });
};

const mergeAndRemoveDuplicates = (file1Path, file2Path, outputFilePath) => {
  readFile(file1Path, (err1, data1) => {
    if (err1) return;

    readFile(file2Path, (err2, data2) => {
      if (err2) return;

      const merged = [...data1, ...data2];
      const uniqueById = merged.reduce((acc, current) => {
        if (!acc.some(item => item.INT_CD === current.INT_CD)) {
          acc.push(current);
        }
        return acc;
      }, []);

      fs.writeFile(outputFilePath, JSON.stringify(uniqueById, null, 2), (err) => {
        if (err) {
          console.error(`Error writing to file ${outputFilePath}:`, err);
          return;
        }
        console.log(`Merged data written to ${outputFilePath} successfully.`);
      });
    });
  });
};

// Example usage:
mergeAndRemoveDuplicates(
  './backend/data/snirh-files.json',
  './backend/data/exportacao_cnarh40_app_DF-14112024.json',
  './backend/data/merged-snirh.json'
);

