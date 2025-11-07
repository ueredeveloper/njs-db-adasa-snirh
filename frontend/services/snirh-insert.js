import desktopDbSearchDuplicatedIds from "./desktop-db-search-duplicateds-ids";
import desktopDBSearchPointById from "./desktop-db-search-point-by-id";
import localDBSelectPointByTypeAndId from "./local-db-select-point-by-type-and-id";
import snirhError from "./snirh-error";
import snirhUpdate from "./snirh-update";

/**
 * Gera um objeto contendo informações detalhadas sobre um erro ocorrido
 * durante a sincronização entre os bancos da Adasa e do SNIRH.
 *
 * @param {string} message - Mensagem descritiva do erro ocorrido.
 * @param {Object} federalGrant - Objeto contendo os dados da outorga federal (SNIRH).
 * @param {Object} stateGrant - Objeto contendo os dados da outorga estadual (Adasa).
 * @returns {Object} Objeto contendo informações relevantes para diagnóstico.
 */
function generateErrorMessage(message, federalGrant, stateGrant) {
    return {
        message, // Mensagem do erro
        SNIRH: federalGrant.INT_CD, // Código da outorga no SNIRH (identificador federal)
        ADASA: stateGrant.INT_CD_ORIGEM, // Código da outorga na Adasa (identificador estadual)
        Nome: stateGrant.EMP_NM_EMPREENDIMENTO || "Não informado", // Nome do empreendimento
        Endereço: stateGrant.EMP_DS_LOGRADOURO || "Não informado", // Endereço, se disponível
        "CPF/CNPJ": stateGrant.EMP_NU_CPFCNPJ, // Identificação do responsável
        Processo: stateGrant.OUT_NU_PROCESSO, // Número do processo administrativo
    };
}

/**
 * Estrutura para armazenar mensagens de erro relacionadas a CPF/CNPJ.
 * Utiliza Set para evitar duplicação direta de mensagens.
 * (Os objetos são armazenados como JSON strings para comparação simples)
 * @type {Set<string>}
 */
let cpfcnpjResultsError = new Set();

/**
 * Realiza a inserção ou atualização de registros de outorga no SNIRH.
 *
 * Caso a outorga ainda não exista no banco federal, a função envia uma
 * requisição POST para inseri-la. Caso já exista, prepara o objeto no formato
 * de atualização e envia via `snirhUpdate()`.
 *
 * @async
 * @function snirhInsert
 * @param {string} uf - Unidade Federativa (ex: 'DF').
 * @param {Array<Object>} body - Estrutura de dados contendo a outorga a ser inserida.
 * @returns {Promise<Object>} Retorna objeto com o resultado da operação (sucesso ou erro).
 */
const snirhInsert = async (uf, body) => {
    // 🔹 Monta a URL do serviço de inserção, adicionando o parâmetro 'uf'
    let url = new URL("http://localhost:3000/services/inserir");
    url.searchParams.append("uf", uf);

    // Extrai os principais identificadores do corpo recebido
    // INT_TSU_CD = tipo de uso (1 superficial / 2 subterrânea)
    // INT_CD_ORIGEM = código original da outorga na Adasa
    let { INT_TSU_CD, INT_CD_ORIGEM } = body[0].stateGrant;

    // 🔹 Verifica se o ponto (INT_CD_ORIGEM) já existe no banco federal (Desktop CNARH)
    let federalGrantsForEdit = await desktopDBSearchPointById(INT_CD_ORIGEM);

    // ================================================
    // 🔹 CASO 1: Registro ainda não existe no SNIRH
    // ================================================
    if (federalGrantsForEdit.length === 0) {
        try {
            // Faz requisição POST para inserir o novo registro
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            // Converte resposta em JSON
            const data = await response.json();

            // Retorna resposta direta do serviço SNIRH
            return data;
        } catch (error) {
            // Em caso de erro de rede ou servidor, retorna mensagem padronizada
            console.error("Erro ao inserir:", error);
            return { erro: error.message };
        }
    }

    // ================================================
    // 🔹 CASO 2: Registro já existe → Atualizar
    // ================================================

    // Busca dados da outorga estadual (Adasa) no formato adequado para edição
    const stateGrantForEdit = await localDBSelectPointByTypeAndId(INT_TSU_CD, INT_CD_ORIGEM);
    const stateGrant = stateGrantForEdit[0]; // Extrai o primeiro registro
    const federalGrant = federalGrantsForEdit[0]; // Extrai o primeiro registro federal correspondente

    // 🔹 Converte todos os campos em string (requisito do serviço SNIRH)
    for (let key in stateGrant) {
        stateGrant[key] = stateGrant[key] != null ? String(stateGrant[key]) : "";
    }
    for (let key in federalGrant) {
        federalGrant[key] = federalGrant[key] != null ? String(federalGrant[key]) : "";
    }

    // Monta estrutura de atualização a ser enviada ao SNIRH
    const toUpdate = [{ stateGrant, federalGrant }];

    console.log("Objeto para edição:", toUpdate);

    // Envia solicitação de atualização para o SNIRH
    const response = await snirhUpdate("DF", toUpdate);

    // Caso sucesso, retorna mensagem informando o resultado
    if (response && response.sucesso) {
        console.log(response.mensagem);
        return { sucesso: true, mensagem: response.mensagem };
    }

    // Caso falha, busca informações detalhadas de erro via serviço `snirhError`
    const params = { uf: "DF", idArquivoErro: response?.idArquivoErro };
    const errorResponse = await snirhError(params);

    // Garante que a mensagem seja texto
    const msg = typeof errorResponse === "string"
        ? errorResponse
        : JSON.stringify(errorResponse);

    // Adiciona a mensagem de erro ao Set global (convertida em JSON string)
    cpfcnpjResultsError.add(
        JSON.stringify(generateErrorMessage(`Erro: ${msg}`, federalGrant, stateGrant))
    );

    console.log("Erros acumulados:", cpfcnpjResultsError);

    // Retorna a lista de erros acumulados convertida de volta em array de objetos
    return { sucesso: false, erros: Array.from(cpfcnpjResultsError).map(JSON.parse) };
};

// Exporta a função principal para uso em outros módulos
export default snirhInsert;
