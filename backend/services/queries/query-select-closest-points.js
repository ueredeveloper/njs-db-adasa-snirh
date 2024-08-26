/**
 * Recebe latitude, longitude e o tipo de interferência e retorna os pontos mais próximos do ponto solicitado.
 * @param {number} latitude - A latitude do ponto solicitado.
 * @param {number} longitude - A longitude do ponto solicitado.
 * @param {number} ti - O tipo de interferência.
 * @returns {string} - A consulta SQL para selecionar os pontos mais próximos.
 */
const querySelectClosestPoints = (latitude, longitude, ti) => {

    return `
    USE SRH;
    DECLARE @point GEOMETRY;
    SET @point = GEOMETRY::STGeomFromText('POINT(${longitude} ${latitude})', 4674);

    SELECT TOP 10 *
    FROM (
        SELECT 
            C.NOME,
            -- Endereço do empreendimento
		    B.ENDERECO,
            A.ID_INTERFERENCIA,
            TI.DESCRICAO,
            A.LATITUDE,
            A.LONGITUDE,
            @point.STDistance(geometry::STGeomFromText(
                -- Converter pontos cadastrados errados, onde a latitude está cadastrada antes da longitude
                CASE 
                WHEN A.[SHAPE].ToString() LIKE '%POINT (-15%' OR A.[SHAPE].ToString() LIKE '%POINT (-16%' THEN 
                    'POINT (' + CONVERT(NVARCHAR(20), [LONGITUDE]) + ' ' + CONVERT(NVARCHAR(20), [LATITUDE]) + ')'
                ELSE 
                    
                    A.[SHAPE].ToString() 
                    END, 4674)) AS DISTANCE,
            A.SHAPE.ToString() SHAPE

        FROM [gisadmin].[INTERFERENCIA] A
        INNER JOIN gisadmin.EMPREENDIMENTO B ON A.ID_EMPREENDIMENTO = B.ID_EMPREENDIMENTO
        INNER JOIN gisadmin.USUARIO C ON B.ID_USUARIO = C.ID_USUARIO
        INNER JOIN gisadmin.TIPO_INTERFERENCIA TI ON A.ID_TIPO_INTERFERENCIA = TI.ID_TIPO_INTERFERENCIA
        WHERE TI.ID_TIPO_INTERFERENCIA = ${ti}
    ) AS SubQuery
    ORDER BY DISTANCE;`
}

module.exports = querySelectClosestPoints;
