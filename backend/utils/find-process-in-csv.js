const fs = require('fs');
const path = require('path');
const { convertCSVToJSON } = require('./convert-csv-to-json');
const csvDir = path.join(__dirname, '../data/csv');
const jsonDir = path.join(__dirname, '../data/json');
const processToFind = [
  {
    Processo: '197000771/2008',
    'CPF/CNPJ': '#15262308104',
    error: 'Na linha 7, coluna 24 possui valor não presente na respectiva tabela de tipo.\n' +
      '\r'
  },
  {
    Processo: '197000688/2008',
    'CPF/CNPJ': '#00332224104',
    error: 'Na linha 11, coluna 24 possui valor não presente na respectiva tabela de tipo.\n' +
      '\r'
  },
  {
    Processo: '197000723/2009',
    'CPF/CNPJ': '#144428172',
    error: 'Na linha 11 CPF/CNPJ inválido.\n\r'
  },
  {
    Processo: '197001321/2010',
    'CPF/CNPJ': '#75896583168',
    error: 'Na linha 3 CPF/CNPJ inválido.\n\r'
  },

];

/**
 * Lê arquivos CSV, busca por processos específicos e extrai as linhas que contêm erros,
 * com base em uma lista de processos e mensagens de erro. Os resultados são salvos em um único arquivo JSON.
 */
const findErrorsInCsv = async () => {
    const errorResults = [];

    try {
        if (!fs.existsSync(csvDir)) {
            console.error(`Diretório não encontrado: ${csvDir}`);
            return;
        }

        const files = fs.readdirSync(csvDir);

        for (const file of files) {
            if (file.endsWith('.csv')) {
                const filePath = path.join(csvDir, file);

                try {
                    const jsonData = await convertCSVToJSON(filePath);

                    // Itera sobre os processos que estamos procurando
                    for (const processInfo of processToFind) {
                        // Verifica se algum registro neste CSV corresponde ao número do processo
                        const recordExists = jsonData.some(item => item.OUT_NU_PROCESSO === processInfo.Processo);

                        if (recordExists) {
                            console.log(`Processo ${processInfo.Processo} encontrado no arquivo: ${file}`);

                            // Extrai o número da linha da mensagem de erro
                            const match = processInfo.error.match(/Na linha (\d+)/);
                            if (match && match[1]) {
                                const lineNumber = parseInt(match[1], 10);

                                // Os números de linha são baseados em 1 e incluem o cabeçalho.
                                // A primeira linha de dados (linha 2 no arquivo) corresponde ao índice 0.
                                // Portanto, os dados da linha 'lineNumber' estão no índice 'lineNumber - 2'.
                                const errorLineIndex = lineNumber - 2;

                                if (errorLineIndex >= 0 && errorLineIndex < jsonData.length) {
                                    const errorLineData = jsonData[errorLineIndex];
                                    console.log(`  - Extraindo dados da linha de erro ${lineNumber}.`);
                                    const errorRecord = {
                                        INT_CD: errorLineData.INT_CD,
                                        INT_CD_ORIGEM: errorLineData.INT_CD_ORIGEM,
                                        EMP_NU_CPFCNPJ: errorLineData.EMP_NU_CPFCNPJ,
                                        EMP_NM_RESPONSAVEL: errorLineData.EMP_NM_RESPONSAVEL,
                                        OUT_NU_PROCESSO: errorLineData.OUT_NU_PROCESSO,
                                        error: processInfo.error.trim()
                                    };
                                    errorResults.push(errorRecord);
                                } else {
                                    console.warn(`  - A linha de erro ${lineNumber} está fora dos limites para o arquivo ${file}.`);
                                }
                            } else {
                                console.warn(`  - Não foi possível extrair o número da linha da mensagem de erro para o processo ${processInfo.Processo}`);
                            }
                        }
                    }
                } catch (err) {
                    console.error(`Erro ao processar o arquivo ${file}:`, err);
                }
            }
        }

        // Salva os resultados combinados em um único arquivo JSON
        if (errorResults.length > 0) {
            if (!fs.existsSync(jsonDir)) {
                fs.mkdirSync(jsonDir, { recursive: true });
            }
            const outputFilePath = path.join(jsonDir, 'errorResults.json');
            fs.writeFileSync(outputFilePath, JSON.stringify(errorResults, null, 2), 'utf8');
            console.log(`\nResultados dos erros salvos em: ${outputFilePath}`);
        } else {
            console.log('\nNenhum dos processos procurados foi encontrado nos arquivos CSV.');
        }

    } catch (err) {
        console.error('Erro geral na execução:', err);
    }
};

findErrorsInCsv();
