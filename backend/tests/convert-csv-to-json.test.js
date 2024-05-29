const fs = require('fs');
const csv = require('csv-parser');

/**
 * Converte um arquivo CSV para JSON.
 * @param {string} filePath - O caminho do arquivo CSV.
 * @returns {Promise<Array<Object>>} - Uma promessa que resolve para um array de objetos JSON.
 */
function convertCSVToJSON(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv({ separator: ';' })) // Ajuste o separador se necessário
      .on('headers', (headers) => {
        console.log('Headers:', headers); // Verifique os cabeçalhos do CSV
      })
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

describe('CSV to JSON Conversion', () => {
  let data;

  beforeAll(async () => {
    data = await convertCSVToJSON('./backend/data/csv/export-csv-test.csv');
  });

  test('deve converter um arquivo CSV para JSON e printar os dados', () => {
    console.log(data);
    // Adicione assertions baseadas no conteúdo do seu CSV
    expect(data).toBeInstanceOf(Array); // Verifica se é um array
    expect(data).not.toHaveLength(0); // Verifica se não está vazio

    // Adicione mais assertions específicas
    // Exemplo:
    // expect(data[0]).toHaveProperty('INT_CD');
    // expect(data[0]).toHaveProperty('INT_TIN_DS');
  });

  test('deve conter o número esperado de linhas', () => {
    // Suponha que você espere 3 linhas no CSV
    expect(data).toHaveLength(1);
  });
});
