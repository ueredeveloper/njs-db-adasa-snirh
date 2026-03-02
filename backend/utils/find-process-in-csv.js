const fs = require('fs');
const path = require('path');

/**
 * Read errors.json and scan CSV files for matching process lines.
 * If the error message contains "CPF/CNPJ", the corresponding CSV
 * row is included in the output summary array.  The result is written
 * to backend/data/json/summaryErros.json.
 *
 * Usage: node ./backend/utils/find-process-in-csv.js
 */

async function generateErrorSummary() {
    const errorsPath = path.join(__dirname, '../data/json/errors.json');
    const csvDir = path.join(__dirname, '../data/csv');
    const outPath = path.join(__dirname, '../data/json/summaryErros.json');

    let summary = [];

    // load errors file
    let errors;
    try {
        const raw = fs.readFileSync(errorsPath, 'utf8');
        errors = JSON.parse(raw);
    } catch (e) {
        console.error('failed to read errors file', e);
        return;
    }

    // gather csv filenames (only top-level .csv files)
    let csvFiles;
    try {
        csvFiles = fs.readdirSync(csvDir)
            .filter(f => f.toLowerCase().endsWith('.csv'))
            .map(f => path.join(csvDir, f));
    } catch (e) {
        console.error('failed to list csv directory', e);
        return;
    }

    // iterate errors
    for (const err of errors) {
        const proc = err.Processo;
        const msg = err.error || '';

        if (/cpf\/cnpj/i.test(msg)) {
            // search across csv files
            for (const csvPath of csvFiles) {
                let content;
                try {
                    content = fs.readFileSync(csvPath, 'utf8');
                } catch (e) {
                    continue;
                }

                // O número do processo é apenas para buscar o csv em que o processo está.
                if (content.includes(proc)) {
                    const lines = content.split(/\r?\n/);
                    let foundLine = null;

                    // Quando encontrar o csv, busque a linha informada, menos 1.
                    const lineMatch = msg.match(/(?:linha|line)\s*(\d+)/i);
                    if (lineMatch) {
                        const lineNum = parseInt(lineMatch[1], 10);
                        const index = lineNum - 1;
                        if (index >= 0 && index < lines.length) {
                            foundLine = lines[index];
                        }
                    }

                    // Fallback se não houver linha informada
                    if (!foundLine) {
                        foundLine = lines.find(l => l.includes(proc));
                    }

                    if (foundLine) {
                        summary.push({
                            Processo: proc,
                            error: msg,
                            csvLine: foundLine,
                            csvFile: path.basename(csvPath)
                        });
                        // once found we break out of csv loop for this error
                        break;
                    }
                }
            }
        }
    }

    try {
        fs.writeFileSync(outPath, JSON.stringify(summary, null, 2), 'utf8');
        console.log('summary written to', outPath);
    } catch (e) {
        console.error('failed to write summary file', e);
    }
}

// run if invoked directly
if (require.main === module) {
    generateErrorSummary();
}

module.exports = { generateErrorSummary };
