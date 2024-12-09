const fs = require('fs');
const { Parser } = require('json2csv');

/**
 * Lê o arquivo `merged-snirh.json`, parseia o conteúdo JSON e retorna um array de dados.
 * 
 * @param {function} callback - Função de callback para tratar os dados lidos ou erros.
 * @callback callback
 * @param {Error|null} err - Objeto de erro, se ocorrer, ou `null` em caso de sucesso.
 * @param {Array|Object|null} data - Dados do arquivo em formato JSON, ou `null` em caso de erro.
 */
const readSnirhFile = (callback) => {
  fs.readFile('./backend/data/merged-snirh.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo:', err);
      callback(err, null);
      return;
    }
    try {
      const dataArray = JSON.parse(data); // Parseia o conteúdo JSON em um array ou objeto
      // Remove o último registro se estiver vazio (comportamento opcional)
      // if (dataArray.length > 0 && Object.keys(dataArray[dataArray.length - 1]).length === 0) {
      //   dataArray.pop();
      // }
      callback(null, dataArray);
    } catch (parseErr) {
      console.error('Erro ao parsear JSON:', parseErr);
      callback(parseErr, null);
    }
  });
};

/**
 * Escreve um arquivo JSON com os dados fornecidos em formato UTF-8 com BOM.
 * 
 * @param {Array|Object} data - Dados a serem escritos no arquivo.
 */
const writeSnirhFile = (data) => {
  // Define o BOM UTF-8
  const utf8Bom = '\uFEFF';
  const jsonData = JSON.stringify(data);

  try {
    fs.writeFile('./backend/data/snirh-files.json', utf8Bom + jsonData, (err) => {
      if (err) {
        console.error('Erro ao escrever o arquivo:', err);
        throw err;
      }
      //console.log('Arquivo SNIRH salvo no formato UTF-8 com sucesso.');
    });
  } catch (err) {
    console.error('Erro inesperado:', err);
  }
};

/**
 * Verifica se um objeto é único em uma lista com base em uma propriedade específica.
 * 
 * @param {Array<Object>} objects - Lista de objetos onde será feita a verificação.
 * @param {Object} newObj - Novo objeto a ser verificado.
 * @param {string} property - Nome da propriedade usada para comparação.
 * @returns {boolean} `true` se o objeto for único, caso contrário, `false`.
 */
function verifyIsUnique(objects, newObj, property) {
  if (!newObj.hasOwnProperty(property)) {
    console.warn(`A propriedade "${property}" não existe no novo objeto.`);
    return false;
  }
  return !objects.some(obj => obj[property] === newObj[property]);
}

module.exports = { readSnirhFile, writeSnirhFile, verifyIsUnique };
