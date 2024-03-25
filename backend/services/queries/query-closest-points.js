const queryClorestPoints = (latitude, longitude) => {
    
    return `
    USE SRH;
    DECLARE @point GEOMETRY;
    SET @point = GEOMETRY::STGeomFromText('POINT(${longitude} ${latitude})', 4674);
    
    SELECT TOP 10 *
    FROM (
        SELECT 
            C.NOME,
            C.ENDERECO,
            A.ID_INTERFERENCIA,
            A.LATITUDE,
            A.LONGITUDE,
            @point.STDistance(geometry::STGeomFromText(A.SHAPE.ToString(), 4674)) AS DISTANCE,
            A.SHAPE
    
        FROM [gisadmin].[INTERFERENCIA] A
        INNER JOIN gisadmin.EMPREENDIMENTO B ON A.ID_EMPREENDIMENTO = B.ID_EMPREENDIMENTO
        INNER JOIN gisadmin.USUARIO C ON B.ID_USUARIO = C.ID_USUARIO
    
        
    ) AS SubQuery`
}
module.exports = queryClorestPoints;