/**
	Seleciona os pontos mais próximos de uma coordenada e de acordo com o tipo de outorga solicitado

	Testes: 
		 - -15.895556 -47.845 5 - Barragem
	*/


USE SRH;
DECLARE @point GEOMETRY;
SET @point = GEOMETRY::STGeomFromText('POINT(-47.78455 -15.631346)', 4674);

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
                END, 4674)) AS DISTANCE, --em metros (EPSG 4674, que é baseado no WGS 84)
		A.SHAPE.ToString() SHAPE

    FROM [gisadmin].[INTERFERENCIA] A
	INNER JOIN gisadmin.EMPREENDIMENTO B ON A.ID_EMPREENDIMENTO = B.ID_EMPREENDIMENTO
    INNER JOIN gisadmin.USUARIO C ON B.ID_USUARIO = C.ID_USUARIO
    INNER JOIN gisadmin.TIPO_INTERFERENCIA TI ON A.ID_TIPO_INTERFERENCIA = TI.ID_TIPO_INTERFERENCIA
    WHERE TI.ID_TIPO_INTERFERENCIA = 2
) AS SubQuery
ORDER BY DISTANCE;
