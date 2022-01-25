const request = require('supertest');
const app = require('../server');
const { isArray, isObject } = require("./testHelpers");

describe('API', () => {
    let testAnime = {
        "title": "Attack on Titan",
        "summary": "Humanity lives inside cities surrounded by enormous walls due to the Titans, gigantic humanoid beings who devour humans seemingly without reason.",
        "genres": [
            "Action",
            "Drama",
            "Fantasy",
            "Mystery"
        ],
        "episodes": 87,
        "seasons": 4,
        "year": 2013
    };

    let patchAnime = {
        "genres": [
            "Drama",
            "Sci-Fi",
            "Suspense",
            "Comedy"
        ]
    };

    it('GET / responds with status code 200', (done) => {
        request(app)
        .get('/')
        .expect(200, done);
    });

    it('undefined routes respond with status code 404', (done) => {
        request(app)
        .get('/aaaaa')
        .expect(404, done);
    });

    it('POST / responds with status code 405', (done) => {
        request(app)
        .post('/')
        .expect(405, done);
    });

    describe('GET /animes', () => {
        it('responds with status code 200', (done) => {
            request(app)
            .get('/animes')
            .expect(200, done);
        });

        it('responds with json', (done) => {
            request(app)
            .get('/animes')
            .expect('Content-Type', /json/, done);
        });

        it('responds with array', (done) => {
            request(app)
            .get('/animes')
            .end((err, res) => {
                if (err) { return done(err); }

                expect(isArray(res.body)).toBe(true);
                done();
            });
        });
    });

    describe('GET /animes/{id}', () => {
        it('responds with status code 200', (done) => {
            request(app)
            .get('/animes/0')
            .expect(200, done);
        });

        it('responds with status code 404 for unknown id', (done) => {
            request(app)
            .get('/animes/5000')
            .expect(404, done);
        });

        it('responds with json', (done) => {
            request(app)
            .get('/animes/0')
            .expect('Content-Type', /json/, done);
        });

        it('responds with object', (done) => {
            request(app)
            .get('/animes/0')
            .end((err, res) => {
                if (err) { return done(err); }

                expect(isObject(res.body)).toBe(true);
                done();
            });
        });

        it('responds with correct anime data', (done) => {
            request(app)
            .get('/animes/0')
            .expect({
                "id": 0,
                "title": "Attack on Titan",
                "summary": "Humanity lives inside cities surrounded by enormous walls due to the Titans, gigantic humanoid beings who devour humans seemingly without reason.",
                "genres": [
                    "Action",
                    "Drama",
                    "Fantasy",
                    "Mystery"
                ],
                "episodes": 87,
                "seasons": 4,
                "year": 2013
            }, done);
        });
    });

    describe('POST /animes', () => {
        it('responds with status code 201', (done) => {
            request(app)
            .post('/animes')
            .send(testAnime)
            .expect(201, done);
        });

        it('responds with json', (done) => {
            request(app)
            .post('/animes')
            .send(testAnime)
            .expect('Content-Type', /json/, done);
        });

        it('responds with object', (done) => {
            request(app)
            .post('/animes')
            .send(testAnime)
            .end((err, res) => {
                if (err) { return done(err); }

                expect(isObject(res.body)).toBe(true);
                done();
            });
        });

        it('responds with the correct data', (done) => {
            request(app)
            .post('/animes')
            .send(testAnime)
            .expect({ id: 14, ...testAnime }, done);
        });
    });

    describe('PATCH /animes/{id}', () => {
        it('responds with status code 200', (done) => {
            request(app)
            .patch('/animes/3')
            .send(patchAnime)
            .expect(200, done);
        });

        it('responds with json', (done) => {
            request(app)
            .patch('/animes/3')
            .send(patchAnime)
            .expect('Content-Type', /json/, done);
        });

        it('responds with object', (done) => {
            request(app)
            .patch('/animes/3')
            .send(patchAnime)
            .end((err, res) => {
                if (err) { return done(err); }

                expect(isObject(res.body)).toBe(true);
                done();
            });
        });

        it('responds with the correct data', (done) => {
            request(app)
            .patch('/animes/3')
            .send(patchAnime)
            .expect({
                "id": 3,
                "title": "Steins;Gate",
                "summary": "A self-proclaimed mad scientist invents a microwave that can send text messages into the past.",
                "genres": [
                    "Drama",
                    "Sci-Fi",
                    "Suspense",
                    "Comedy"
                ],
                "episodes": 47,
                "seasons": 2,
                "year": 2011
            }, done);
        });
    });

    describe('DELETE /animes/{id}', () => {
        it('responds with status code 204', (done) => {
            request(app)
            .delete('/animes/1')
            .expect(204, done);
        });
    });

    describe('DELETE /animes', () => {
        it('responds with status code 204', (done) => {
            request(app)
            .delete('/animes')
            .expect(204, done);
        });
    });
});
