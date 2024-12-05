//const fs = require('node:fs');
const fs = require('fs');


const readSnirhFile = (callback) => {
  fs.readFile('./backend/data/merged-snirh.json', 'utf8', (err, data) => {
      if (err) {
          console.error(err);
          callback(err, null);
          return;
      }
      try {
        const dataArray = JSON.parse(data); // Parse the JSON string into an array
        // retirar último registro vazio
        //dataArray.pop()
        callback(null, dataArray);
    } catch (parseErr) {
        console.error('Error parsing JSON:', parseErr);
        callback(parseErr, null);
    }
  });
};

const writeSnirhFile = (data)=> {

  /**
   * Lê o arquivo que une os dados editados e o backup feito no sistema Cnarh (.csv convertido para .json)
   */
  fs.writeFile('./backend/data/snirh-files.json', JSON.stringify(data), (err) => {
    if (err) throw err;
  })
}

const writeCsvObject = (data, name)=> {

  fs.writeFile(`./backend/data/${name}.json`, JSON.stringify(data), (err) => {
    if (err) throw err;
  })
}


// Function to verify if new objects are unique based on a specific property
function verifyIsUnique(objects, newObj, property) {
  return !objects.some(obj => obj[property] === newObj[property]);
}

module.exports = {readSnirhFile, writeSnirhFile, verifyIsUnique}