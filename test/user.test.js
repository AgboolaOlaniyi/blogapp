const supertest = require('supertest');
const app = require('../app');
const { connect } = require('../config/mongoose')
const UserModel = require('../models/user')

// Test suite
describe('users Route Tests', () => {
    let connection;
    let token;
    // before hook
    beforeAll(async () => {
        connection = await connect()
    })

    beforeEach(async () => {
        // create a user
        const user = await UserModel.create({
            first_name: "olaniyi",
            last_name: "agboola",
            email: "neyo4top@gmail.com",
            gender: "male",
            password: "neyo4top6920",
            country: "nigeria"

        });

        // login that user
        const response = await supertest(app)
            .post('/users/login')
            .set('content-type', 'text/html')
            .send({
                email: "neyo4top@gmail.com",
                password: "neyo4top6920"
            })

        // store the token in a global object
        token = response.body.token

    })

afterEach(async () => {
    await connection.cleanup()
})

// after hook
afterAll(async () => {
    await connection.disconnect()
})

// test case
it('should return a user', async () => {
    const response = await supertest(app).get('/users?gender=male')
    .set('authorization', `Bearer ${token}`)
    .set('content-type', 'text/html')

    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject({
        data: expect.any(Array),
        error: null
    });
})
})