const http = require('http');
const app = require('./server');

const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/convert',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

describe('POST /convert', () => {
    it('should convert units correctly', (done) => {
        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                const result = JSON.parse(data);
                expect(res.statusCode).toEqual(200);
                expect(result).toHaveProperty('unit');
                expect(result).toHaveProperty('amount');
                expect(result.unit).toBe('tsp');
                expect(result.amount).toBe(3);
                done();
            });
        });

        req.write(JSON.stringify({
            curr_unit: 'tbsp',
            amount: 1,
            desired: 'tsp'
        }));
        req.end();
    });

    it('should return 400 for invalid units', (done) => {
        const req = http.request(options, (res) => {
            expect(res.statusCode).toEqual(400);
            done();
        });

        req.write(JSON.stringify({
            curr_unit: 'invalid_unit',
            amount: 1,
            desired: 'tsp'
        }));
        req.end();
    });
});