USE SRH;
DECLARE @param NVARCHAR(100);
SET @param = '144/2015';

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
        A.SHAPE.ToString() SHAPE,
		TI.ID_TIPO_INTERFERENCIA

    FROM [gisadmin].[INTERFERENCIA] A
    INNER JOIN gisadmin.EMPREENDIMENTO B ON A.ID_EMPREENDIMENTO = B.ID_EMPREENDIMENTO
    INNER JOIN gisadmin.USUARIO C ON B.ID_USUARIO = C.ID_USUARIO
    INNER JOIN gisadmin.TIPO_INTERFERENCIA TI ON A.ID_TIPO_INTERFERENCIA = TI.ID_TIPO_INTERFERENCIA
	-- colate para aceitar palavra com ou sem acentuação --
    WHERE C.NOME COLLATE Latin1_General_CI_AI LIKE '%' + @param + '%' 
       OR C.ENDERECO COLLATE Latin1_General_CI_AI LIKE '%' + @param + '%' 
       OR A.NUM_PROCESSO COLLATE Latin1_General_CI_AI LIKE '%' + @param + '%'
	   OR A.NUM_ATO COLLATE Latin1_General_CI_AI LIKE '%' + @param + '%'
) AS SubQuery;
