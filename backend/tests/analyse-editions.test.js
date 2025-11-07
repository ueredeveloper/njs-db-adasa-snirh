const fs = require("fs");
const path = require("path");
const { convertCSVToJSON } = require("../utils/convert-csv-to-json");
const { on } = require("events");

/**
 * Analisa as edições feitas comparando os arquivos em formato .csv com os dados do snirh.
 * Use: npx jest ./backend/tests/analyse-editions.test.js
 */

describe("Leitura de arquivos CSV", () => {
    const folderPath = path.join(__dirname, "../data/csv/"); // pasta com os CSVs

    it("deve ler todos os arquivos .csv da pasta", async () => {
        const files = fs.readdirSync(folderPath).filter(f => f.endsWith(".csv"));
        expect(files.length).toBeGreaterThan(0);

        let grants = [];
        for (const file of files) {
            const filePath = path.join(folderPath, file);
            let grant = await convertCSVToJSON(filePath);

            grants.push(grant[0]);
        }

        expect(grants.length).toBeGreaterThan(0);

        // ✅ agora readSnirhFile retorna Promise
        const dataDesktoDB = await readSnirhFile();

        const set1 = new Set(grants.map(item => item.INT_CD_ORIGEM));
        const set2 = new Set(dataDesktoDB.map(item => item.INT_CD_ORIGEM));

        const onlyInArr1 = [...set1].filter(x => !set2.has(x));

        console.log("Total de itens editados:", grants.length);
        console.log("Total de itens (ID_INT_ORIGEM) não encontrados no SNIRH:", onlyInArr1.length);
        onlyInArr1.forEach(oia=> console.log(`INT_CD_ORIGEM (ID ADASA): ${oia}`))

        let dontEditedArray = [];

        onlyInArr1.forEach(item => {
            let notFound = grants.find(g => g.INT_CD_ORIGEM === item);

            if (notFound) {

                dontEditedArray.push(notFound);
                /*console.log("Item não encontrado no SNIRH:",
                    "\n INT_CD: ", grantEdited?.INT_CD,
                    "\n INT_CD_ORIGEM: ", grantEdited?.INT_CD_ORIGEM,
                    "\n EMP_NM_EMPREENDIMENTO: ", grantEdited?.EMP_NM_EMPREENDIMENTO,
                    "\n EMP_NM_RESPONSAVEL: ", grantEdited?.EMP_NM_RESPONSAVEL
                );*/

            }
        });

        try {
            const currentTimestamp = new Date().getTime();
            fs.writeFile(`./backend/data/json/unedited-items/unedited-${currentTimestamp}.json`, JSON.stringify(dontEditedArray), { encoding: 'utf-8' }, (err) => {
                if (err) {
                    console.error('Erro ao escrever o arquivo:', err);
                    throw err;
                }
                //console.log('Arquivo SNIRH salvo no formato UTF-8 com sucesso.');
            });
        } catch (err) {
            console.error('Erro inesperado:', err);
        }

        // exemplo de verificação
        expect(Array.isArray(onlyInArr1)).toBe(true);
    });
});


function readSnirhFile() {
    let pathFile = './backend/data/json/exportacao_cnarh40_DF.json';

    return new Promise((resolve, reject) => {
        fs.readFile(pathFile, "utf8", (err, data) => {
            if (err) return reject(err);
            try {
                const parsed = JSON.parse(data);
                resolve(parsed);
            } catch (e) {
                reject(e);
            }
        });
    });
}

module.exports = { readSnirhFile };
