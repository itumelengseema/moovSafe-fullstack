import request from 'supertest';
import express from 'express';
import { createMockApp, HTTP_STATUS } from './helpers';

describe('API Server', () => {
    let app: express.Application;

    beforeEach(() => {
        app = createMockApp();

        // Add basic routes for testing
        app.get('/', (req, res) => {
            res.send('Hello World!');
        });

        // Add CORS middleware
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

            if (req.method === 'OPTIONS') {
                res.sendStatus(200);
            } else {
                next();
            }
        });
    });

    describe('GET /', () => {
        it('should return Hello World', async () => {
            const response = await request(app)
                .get('/')
                .expect(HTTP_STATUS.OK);

            expect(response.text).toBe('Hello World!');
        });
    });

    describe('CORS Headers', () => {
        it('should include CORS headers in response', async () => {
            const response = await request(app)
                .get('/')
                .expect(HTTP_STATUS.OK);

            expect(response.headers['access-control-allow-origin']).toBe('*');
            expect(response.headers['access-control-allow-methods']).toContain('GET');
            expect(response.headers['access-control-allow-methods']).toContain('POST');
        });

        it('should handle OPTIONS preflight requests', async () => {
            await request(app)
                .options('/')
                .expect(HTTP_STATUS.OK);
        });
    });

    describe('404 Handler', () => {
        it('should return 404 for unknown routes', async () => {
            await request(app)
                .get('/unknown-route')
                .expect(404);
        });
    });
});
