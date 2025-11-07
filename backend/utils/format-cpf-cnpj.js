function formatCpfCnpj(number) {

    // Remover quaisquer caracteres não numéricos
    const cleanNumber = number.replace(/\D/g, '');

    // Verificar o comprimento do número e formatar de acordo
    if (cleanNumber.length === 11) {
        // Formatar número de 11 dígitos: XXX.XXX.XXX-XX
        return cleanNumber.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (cleanNumber.length === 14) {
        // Formatar número de 14 dígitos: XX.XXX.XXX/0001-XX
        return cleanNumber.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    } else {
        // Se o número não tiver 11 ou 14 dígitos, retornar o número original
        return number;
    }
}

// Testes da função
/*
const numberOriginal11 = "03651175871";
const numberOriginal14 = "12345678000195";

console.log(formatCpfCnpj(numberOriginal11));  // Saída: 036.511.758-71
console.log(formatCpfCnpj(numberOriginal14));  // Saída: 12.345.678/0001-95*/

module.exports = { formatCpfCnpj }