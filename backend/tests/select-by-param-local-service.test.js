const request = require('supertest');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { selectByParam } = require('../services');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/services', selectByParam);

/**
 * Suite de testes para a funcionalidade de seleção por parâmetro.
 * 
 * @namespace TesteSelecaoPorParametroServicoLocal
 */
describe('Teste de Seleção por Parâmetro', () => {
    /**
     * Teste para verificar se a API retorna resultados para um parâmetro válido.
     * 
     * @function
     * @memberof TesteSelecaoPorParametroServicoLocal
     * @async
     */

    test('deve retornar resultados para o parâmetro fornecido', async () => {

        const param = 'SEBASTIÃO ALVES PEREIRA';
        const response = await request(app).get(`/services/select-by-param?param=${param}`);

        console.log('Response status:', response.status);
        console.log('Response body:', response.body);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);

        const firstResult = response.body[0];
        expect(firstResult).toHaveProperty('NOME');
        expect(firstResult).toHaveProperty('ENDERECO');
        expect(firstResult).toHaveProperty('ID_INTERFERENCIA');
        expect(firstResult).toHaveProperty('LATITUDE');
        expect(firstResult).toHaveProperty('LONGITUDE');
        expect(firstResult).toHaveProperty('NUM_PROCESSO');
        expect(firstResult).toHaveProperty('NUM_ATO');
        expect(firstResult).toHaveProperty('SHAPE');
        expect(firstResult).toHaveProperty('ID_TIPO_INTERFERENCIA');
        
    });

    test('deve lidar corretamente com a ausência de resultados para o parâmetro fornecido', async () => {
        const param = 'NonExistentParam';
        const response = await request(app).get(`/services/select-by-param?param=${param}`);

        console.log('Response status:', response.status);
        console.log('Response body (parâmetro não existente):', response.body);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBe(0);
    });
});
