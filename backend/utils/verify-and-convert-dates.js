/**
 * Verifica se o valor é uma data válida no formato yyyy-mm-dd.
 * @param {string} value O valor a ser verificado.
 * @returns {boolean} True se o valor é uma data válida, caso contrário false.
 */
function isDate(value) {
    // Verifica se o valor é uma string e corresponde ao formato de data (yyyy-mm-dd)
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
        // Validação adicional para verificar se é uma data válida
        const date = new Date(value);
        return !isNaN(date.getTime());  // Retorna true se for uma data válida, false caso contrário
    }
    return false;
}

function convertDateFormat(originalDate) {
    // Split the original date string by '-' to get parts [year, month, day]
    const parts = originalDate.split('-');
    
    // Reorder the parts to [day, month, year]
    const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
    
    return formattedDate;
}



module.exports = {isDate, convertDateFormat}