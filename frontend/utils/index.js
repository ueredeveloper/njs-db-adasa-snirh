const maxLengthOfStrings = (array) => {
    let maxLengths = array.map(record => {
        let max_lengths = [];

        // Find the maximum length between key and value when converted to string
        for (const [key, value] of Object.entries(record)) {
            // Verifica se valor null e depois insere tamanho da string na array (max_lengths)
            max_lengths.push(Math.max(key.length, value === null ? 0 : value.toString().length));
        }
        return max_lengths;
    });
    return maxLengths;
}

const createTheadsValues = async (list) => {

    // Captura o primeiro objeto com os valores (key, value)
    let keyValues = Object.entries(await list[0]);
    // Separa os valores `key` para criar os cabeçalhos (thead)

    let theads = keyValues.map(th => th[0]);
    // Adiciona coluna a mais para  os botões
    theads.push(``);

    return theads;

};


const createLatLngPosition = (latitude, longitude) => {

    // Converte o valor para float e muda vígula para  ponto.
    let position = { lat: parseFloat(latitude.replace(/,/g, '.')), lng: parseFloat(longitude.replace(/,/g, '.')) }
    return position;

};

const sortTbodyLikeThead = (tbodys, theads) => {

    return tbodys.map(tbody => {
        let sortedTbody = [];
        theads.forEach(key => {
          let foundItem = tbody.find(item => item[0] === key);
          if (foundItem) {
            sortedTbody.push(foundItem);
          }
        });
        return sortedTbody;
      });
  }



export { maxLengthOfStrings, createTheadsValues, createLatLngPosition, sortTbodyLikeThead }