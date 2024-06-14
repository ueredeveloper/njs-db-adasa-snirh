const request = require('supertest');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { selectByParam, selectClosestPoints } = require('../services');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/services', selectByParam);
app.use('/services', selectClosestPoints);

describe('Teste de Seleção por Parâmetro e Pontos Próximos', () => {
    /**
     * Teste para verificar se a API retorna resultados para um parâmetro válido.
     * 
     * @function
     * @memberof TesteSelecaoPorParametroEPontosProximosServicoLocal
     * @async
     */
    test('deve retornar resultados para o parâmetro fornecido', async () => {
        const param = 'SEBASTIÃO ALVES PEREIRA';
        const response = await request(app).get(`/services/select-by-param?param=${param}`);

        console.log('Response status:', response.status);
        console.log('Response body:', response.body);

        // Verifica se o status da resposta é 200 (OK)
        expect(response.status).toBe(200);
        // Verifica se o corpo da resposta é um array com pelo menos um resultado
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);

        // Suponha que você obtenha o ID do resultado único aqui
        const firstResult = response.body[0];
        /*
        {
            NOME: 'SEBASTIÃO XXXX PEREIRA',
            ENDERECO: 'SQN 203, XXXX 508',
            ID_INTERFERENCIA: 6841,
            LATITUDE: -15.631346,
            LONGITUDE: -47.78455,
            NUM_PROCESSO: '197000XXX5X6/2016',
            NUM_ATO: '86XX1/2017',
            SHAPE: 'POINT (-47.784549999999967 -15.631346127999961)',
            ID_TIPO_INTERFERENCIA: 1
        }
        */

        // Agora vamos buscar os pontos mais próximos
        const closestPointsResponse = await request(app).get(`/services/select-closest-points?latitude=${firstResult.LATITUDE}&longitude=${firstResult.LONGITUDE}&ti=${firstResult.ID_TIPO_INTERFERENCIA}`);

        /*
         "recordset": [
        {
            "INT_CD": "",
            "INT_CD_ORIGEM": 145,
            "INT_DS_OPTIONAL": "",
            "INT_TIN_CD": 1,
            "INT_TSU_CD": 1,
            "INT_NU_SIAGAS": "",
            "INT_NU_LATITUDE": "-15,748224",
            "INT_NU_LONGITUDE": "-47,359161",
            "INT_NM_CORPOHIDRICOALTERADO": "",
            "EMP_NM_EMPREENDIMENTO": [
                "FAZENDA XXXX, LOTES N° 27/28",
                "FAZENDA XXXX, LOTES N° 27/28"
            ],
            "EMP_NM_RESPONSAVEL": "FLÁVIO LUIZ AGNES",

        ou 
           {
            INT_TIN_CD: 1,
            INT_TSU_CD: 2,
            INT_TSI_CD: '',
            INT_CR_LATITUDE: '-15,624160',
            INT_CR_LONGITUDE: '-47,786749',
            ING_NU_IBGEMUNICIPIO: 5300108,
            EMP_NM_EMPREENDIMENTO: 'MUNGI XXXX CHÁCARA XXX, PÓLO DE CINEMA',
            EMP_NU_CPFCNPJ: '#7743XXX0104',
            EMP_NM_USUARIO: 'ERANILDE XXXX CIMENTO',
            EMP_DS_EMAILRESPONSAVEL: 'izalvXXXX@gmail.com',
            EMP_NU_CEPENDERECO: '730XXX000',
            EMP_DS_LOGRADOURO: 'SH CONTAGEM, CXXXX, LOTE XXX, APARTAMENTO 301',
        }
            */
        console.log('Response status dos pontos mais próximos:', closestPointsResponse.status);
        //console.log('Response body dos pontos mais próximos:', closestPointsResponse.body.recordset);

        console.log(closestPointsResponse.body.recordset.length)

        let joinResults = '';
        // Apesar da query sql trazer por distância (o mais  próximo primeiro) aqui refazermos para não perder a ordem.
        let closestPointsByDistance = closestPointsResponse.body.recordset.sort((a, b) => a.DISTANCE - b.DISTANCE);

        closestPointsByDistance.forEach(r =>
            joinResults = joinResults + '\n  ' + r.EMP_NM_USUARIO + ', ' + r.EMP_NM_EMPREENDIMENTO + ' LATITUDE: ' + r.INT_CR_LATITUDE + ' LONGITUDE: ' + r.INT_CR_LONGITUDE
        )

        console.log(joinResults);

        // Verifica se o status da resposta dos pontos mais próximos é 200 (OK)
        expect(closestPointsResponse.status).toBe(200);
        // Verifica se o corpo da resposta dos pontos mais próximos é um array com pelo menos um resultado
        // Verifica se há resultados no objeto retornado
        expect(closestPointsResponse.body.recordset.length).toBeGreaterThan(0);

        // Obtém o primeiro resultado
        //const firstPoint = closestPointsResponse.body.recordset[0];
        //console.log('Primeiro resultado:', firstPoint);

    });
});

