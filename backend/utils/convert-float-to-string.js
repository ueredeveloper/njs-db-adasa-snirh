function isFloat(value) {

    console.log(value)

    // Remover as aspas se existirem
    if (value.startsWith("'") && value.endsWith("'")) {
        value = value.slice(1, -1); // remover aspas no início e no fim
    } else if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1); // remover aspas no início e no fim
    }
    // Verificar se o valor é um número float
    const floatValue = parseFloat(value);
    const isFloat = !isNaN(floatValue) && floatValue.toString() === value;
    return isFloat;
}

function convertFloatToCommaString(floatNumber) {

    // Converter o número de ponto flutuante para uma string
    let numberString = floatNumber.toString();

    // Substituir o ponto por uma vírgula
    let numberWithComma = numberString.replace('.', ',');

    return numberWithComma;
}

module.exports = { isFloat, convertFloatToCommaString }
