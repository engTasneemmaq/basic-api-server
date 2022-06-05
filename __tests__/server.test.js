
'use strict';
const { app } = require('../src/server');

const supertest = require('supertest');
const mockRequest = supertest(app);
const { db } = require('../src/models/index');

beforeAll(async () => {
    await db.sync();
});


describe('Web server', () => {
    // Check if 404 is handled 

    it('Should respond with 404 status on an invalid route', async () => {
        const response = await mockRequest.get('/foo');
        expect(response.status).toBe(404);
    });

    it('Should respond with 404 status on an invalid route', async () => {
        const response = await mockRequest.get('/cloth');
        expect(response.status).toBe(404);
    });



    it('can add a food', async () => {
        const response = await mockRequest.post('/food').send({
            MealName: 'mansaf',
            Ingredients: 'jameed karaki'
        });
        expect(response.status).toBe(201);
    });

    it('bad method', async () => {
        const response = await mockRequest.post('/food/:id').send({
            MealName: 'mansaf',
            Ingredients: 'jameed karaki'
        });
        expect(response.status).toBe(404);
    });
    
    it('bad method', async () => {
        const response = await mockRequest.post('/clothes/:id').send({
            Clothes_type: 'dress',
            Clothes_Price: '40 JD'
        });
        expect(response.status).toBe(404);
    });
    it('can add a clothes', async () => {
        const response = await mockRequest.post('/clothes').send({
            Clothes_type: 'dress',
            Clothes_Price: '40 JD'
        });
        expect(response.status).toBe(201);
    });

    it('can get all food', async () => {
        const response = await mockRequest.get('/food');
        expect(response.status).toBe(200);

    });

    it('can get all clothes', async () => {
        const response = await mockRequest.get('/clothes');
        expect(response.status).toBe(200);

    });

    // test if can update a person
    it('can update a record', async () => {
        const response = await mockRequest.put('/food/1');
        expect(response.status).toBe(201);
    });

    it('can update a record', async () => {
        const response = await mockRequest.put('/clothes/1');
        expect(response.status).toBe(201);
    });

    // test if can delete a person
    it('can delete a record', async () => {
        const response = await mockRequest.delete('/food/1');
        expect(response.status).toBe(204);
    });

    it('can delete a record', async () => {
        const response = await mockRequest.delete('/clothes/1');
        expect(response.status).toBe(204);
    });
});


afterAll(async () => {
    await db.drop();
});