/**
 * Recebe uma string de busca e retorna uma lista de interferências com nome, cpf/cnpj, processo, nº do ato, latitude e longitude.
 * @param {string} param - Palavra, número de processo ou número de ato.
 * @returns {string} - A consulta SQL para selecionar os pontos de acordo com o solicitado.
 */
const querySelectByParam = (param) => {
    // Sanitize input to prevent SQL injection
    const escapedParam = param.replace(/'/g, "''");


    // Build SQL query
    return `
        USE SRH;
        DECLARE @param NVARCHAR(100);
        SET @param = N'${escapedParam}';

        SELECT *
        FROM (
            SELECT 
                C.NOME,
                C.ENDERECO,
                A.ID_INTERFERENCIA,
                A.LATITUDE,
                A.LONGITUDE,
                A.NUM_PROCESSO,
                A.NUM_ATO,
                A.SHAPE.ToString() AS SHAPE,
                TI.ID_TIPO_INTERFERENCIA,
                A.DT_PUBLICACAO
            FROM [gisadmin].[INTERFERENCIA] A
            INNER JOIN gisadmin.EMPREENDIMENTO B ON A.ID_EMPREENDIMENTO = B.ID_EMPREENDIMENTO
            INNER JOIN gisadmin.USUARIO C ON B.ID_USUARIO = C.ID_USUARIO
            INNER JOIN gisadmin.TIPO_INTERFERENCIA TI ON A.ID_TIPO_INTERFERENCIA = TI.ID_TIPO_INTERFERENCIA
            WHERE 
                C.NOME COLLATE Latin1_General_CI_AI LIKE '%' + @param + '%'
                OR C.ENDERECO COLLATE Latin1_General_CI_AI LIKE '%' + @param + '%'
                OR A.NUM_PROCESSO COLLATE Latin1_General_CI_AI LIKE '%' + @param + '%'
                OR A.NUM_ATO COLLATE Latin1_General_CI_AI LIKE '%' + @param + '%'
                -- Busca pela data inicial da outorga
                OR (
					TRY_CONVERT(DATETIME, @param, 103) IS NOT NULL
                    -- para até 32 dias após a data especificada na variável @param
					--AND A.DT_PUBLICACAO BETWEEN TRY_CONVERT(DATETIME, @param, 103) 
                    
					--AND DATEADD(DAY, 32, TRY_CONVERT(DATETIME, @param, 103))
                    -- para as outorgas do ano especificado
                    AND YEAR(A.DT_PUBLICACAO) = YEAR(TRY_CONVERT(DATETIME, @param, 103))
				)
        ) AS SubQuery;
    `;
};


module.exports = querySelectByParam;
