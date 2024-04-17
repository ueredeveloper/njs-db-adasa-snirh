const express = require('express');

const fs = require('fs');
const csv = require('csv-parser');
const papa = require('papaparse');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const axios = require('axios');
const { readFile, readSnirhFile, writeSnirhFile } = require('../../utils/read-write-and-verify-file');

const router = express.Router();

require('dotenv').config();

router.get('/snirh-export-csv', async (req, res) => {

  let { uf, idFinalidade, dataInicio, dataFim, idDominialidade, idTipoOutorga, idSituacaoOutorga, pagina, tamanhoPagina } = req.query;

  // Constructing the URL with parameters
  let url = new URL('https://www.snirh.gov.br/cnarh40_treinamento/rest/api/exportacao/csv');
  url.searchParams.append('uf', uf);
  url.searchParams.append('idFinalidade', idFinalidade);
  url.searchParams.append('dataInicio', dataInicio);
  url.searchParams.append('dataFim', dataFim);
  url.searchParams.append('idDominialidade', idDominialidade);
  url.searchParams.append('idTipoOutorga', idTipoOutorga);
  url.searchParams.append('idSituacaoOutorga', idSituacaoOutorga);
  url.searchParams.append('pagina', pagina);
  url.searchParams.append('tamanhoPagina', tamanhoPagina);

  const { SNIRH_TOKEN } = process.env;

  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': SNIRH_TOKEN,
    }
  })
    .then(response => {
      let text = response.text()
      return text;
    })
    .then(text => {
      //retorna conversão de csv para json.
      return papa.parse(text, {
        header: true,
        delimiter: ";"
      })
    })
    .catch(err => console.log(err));

  /*
  console.log('save snirh-files.json')
  fs.writeFile('./backend/data/snirh-files.json', JSON.stringify(response), (err) => {
    if (err) throw err;
  })*/

  readSnirhFile((err, existingData) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    let { data } = response;

    // retirar último resultado vazio, por causa da conversão csv para json.
    //data.pop();

    // Unir arrays
    /*let newExistingData = existingData.map(item=> item);
    let mergedArray = newExistingData.concat(data);

    // Remove duplicates based on INT_CD
    let uniqueArray = Object.values(mergedArray.reduce((acc, obj) => {
      acc[obj.INT_CD] = obj;
      return acc;
    }, {}));*/

    /*
    * Remove items buscados para depois inserir novamente. Assim os ítems buscados sempre serão atualizados ao salvar neste banco local
    */
    function removeValue(value, index, arr) {
      // Revome novos valores buscados
      return data.map(item => {
  
        if (value.INT_CD === item.INT_CD) {
          // remoção se existente no json
          arr.splice(index, 1);
          return true;
        }
        return false;
      })
    }

    // Filtrar retirando os valores buscados.
    let newData = existingData.filter(removeValue)
    // Atualização com os novos valores buscados.
    newData.push(data.map(d=>d));

    // Escrita do banco de dados com valores antigos não solicitados e os novos solicitados.
    writeSnirhFile(newData)

  });


  res.send(response);

});
module.exports = router;


