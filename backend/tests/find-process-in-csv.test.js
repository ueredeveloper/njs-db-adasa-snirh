const fs = require('fs');
const path = require('path');
const { generateErrorSummary } = require('../utils/find-process-in-csv');

// helper to write files
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

/**
 * Uso: npm test --silent -- --runTestsByPath backend/tests/find-process-in-csv.test.js
 * npx jest backend/tests/find-process-in-csv.test.js
 */

describe('generateErrorSummary', () => {
  const jsonDir = path.join(__dirname, '../data/json');
  const csvDir = path.join(__dirname, '../data/csv');
  const errorsPath = path.join(jsonDir, 'errors.json');
  const summaryPath = path.join(jsonDir, 'summaryErros.json');
  const testCsvPath = path.join(csvDir, 'test-summary.csv');

  beforeAll(() => {
    ensureDir(jsonDir);
    ensureDir(csvDir);

    // create a dummy errors file
    const errors = [
      {
        Processo: 'ABC123',
        'CPF/CNPJ': '#000',
        error: 'Erro de CPF/CNPJ inválido.'
      },
      {
        Processo: 'XYZ789',
        'CPF/CNPJ': '#111',
        error: 'Outro tipo de erro'
      }
    ];
    fs.writeFileSync(errorsPath, JSON.stringify(errors, null, 2), 'utf8');

    // create a csv file containing the first process
    const header = 'OUT_NU_PROCESSO;FIELD2';
    const line1 = 'ABC123;valor1';
    const line2 = 'OTHER;valor2';
    fs.writeFileSync(testCsvPath, [header, line1, line2].join('\n'), 'utf8');
  });

  afterAll(() => {
    // clean up test-specific files
    if (fs.existsSync(errorsPath)) fs.unlinkSync(errorsPath);
    if (fs.existsSync(summaryPath)) fs.unlinkSync(summaryPath);
    if (fs.existsSync(testCsvPath)) fs.unlinkSync(testCsvPath);
  });

  test('writes summary with matching CSV lines when CPF/CNPJ error present', async () => {
    await generateErrorSummary();
    const summaryRaw = fs.readFileSync(summaryPath, 'utf8');
    const summary = JSON.parse(summaryRaw);

    expect(Array.isArray(summary)).toBe(true);
    // only one entry should appear, for ABC123
    expect(summary).toHaveLength(1);
    expect(summary[0].Processo).toBe('ABC123');
    expect(summary[0].csvLine).toContain('ABC123');
    expect(summary[0].error).toMatch(/CPF\/CNPJ/);
  });
});
