/**
 * Atualiza a plinilha exportacao_cnarh40_DF.json
 * Como usuar: node backend/tests/snirh-fetch.test.js
 */

import fetch from "node-fetch";

const years = [
  "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018",
   "2019", "2020", "2021", "2022", "2023", "2024", "2025"
];
const pages = [1, 2, 3, 4, 5];


const exportCsv = async (params) => {
    let {
        uf, idFinalidade, dataInicio, dataFim,
        idDominialidade, idTipoOutorga, idSituacaoOutorga,
        pagina, tamanhoPagina
    } = params;

    let url = new URL("http://localhost:3000/services/snirh-export-csv");
    url.searchParams.append("uf", uf);
    url.searchParams.append("idFinalidade", idFinalidade);
    url.searchParams.append("dataInicio", dataInicio);
    url.searchParams.append("dataFim", dataFim);
    url.searchParams.append("idDominialidade", idDominialidade);
    url.searchParams.append("idTipoOutorga", idTipoOutorga);
    url.searchParams.append("idSituacaoOutorga", idSituacaoOutorga);
    url.searchParams.append("pagina", pagina);
    url.searchParams.append("tamanhoPagina", tamanhoPagina);

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: { Accept: "application/json" }
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Erro na requisição:", error);
        return null;
    }
};

const runTest = async () => {
    for (const year of years) {
        for (const page of pages) {
            let date = `${year}0101000000`;

            let params = {
                uf: "DF",
                dataInicio: date,
                dataFim: "",
                idDominialidade: "1",
                idTipoOutorga: "",
                idSituacaoOutorga: "",
                idFinalidade: "",
                pagina: page,
                tamanhoPagina: 500
            };

            console.log(`🔎 Buscando ano=${year}, página=${page}...`);

            let data = await exportCsv(params);


            if (data!==undefined && data?.data && Array.isArray(data?.data)) {
                data?.data.pop(); // remove último item vazio
                console.log(`✔️ Retornou ${data?.data.length} registros`);
            } else {
                console.log("⚠️ Nenhum dado retornado");
            }
        }
    }
};

// executa
runTest();
