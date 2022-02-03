const request = require('supertest')
const server = require('../server')
const db = require('../data/db-config')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
})
afterAll(async () => {
  await db.destroy()
})

it('sanity check', () => {
  expect(true).not.toBe(false)
})

describe('server.js', () => {
  it('is the correct testing environment', async () => {
    expect(process.env.NODE_ENV).toBe('testing')
  })
})

describe('[POST] Auth Endpoints', () => {
test('[1] Successfully registered new user', async () => {
  const res = await request(server)
    .post('/api/auth/register')
    .send({ username: 'John', password: '1234' })
  expect(res.status).toBe(201)
  expect(res.body.message).toMatch(/Successfully registered John!/i);

})

test('[2] Returns correct error message when username already exists', async () => {
  const res = await request(server)
  .post('/api/auth/register')
  .send({ username: 'sam', password: '1234' })

  expect(res.status).toBe(401)
  expect(res.body.message).toMatch(/Username taken, please choose another one./i);

})

  test('[3] User can login successfully', async() => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ username: 'frodo', password: '5678' })
 
    expect(res.status).toBe(200)
    expect(res.body.message).toMatch(/welcome, frodo/i);
  });
  

  test('[4] Returns correct error message when credentials are invalid', async ()=> {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ username: 'John',password: '1234' })
    expect(res.status).toBe(401)
    expect(res.body.message).toMatch(/Invalid credentials/i);
  })

})