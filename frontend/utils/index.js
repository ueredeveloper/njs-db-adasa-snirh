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

module.exports = { maxLengthOfStrings }