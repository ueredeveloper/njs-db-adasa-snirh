const request = require('supertest');
const express = require('express');
const router = require('../routes/select-by-param'); // Ajuste o caminho conforme necessário

const app = express();
app.use('/api', router);

describe('CSV Comparison', () => {
    test('should return results for given parameter', async () => {
        const param = 'Cãmara';
        const response = await request(app).get(`/api/select-by-param?param=${param}`);

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
    });
});
