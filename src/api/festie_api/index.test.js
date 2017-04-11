import request from 'supertest-as-promised'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { FestieApi } from '.'

const app = () => express(routes)

let userSession, anotherSession, festieApi

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  festieApi = await FestieApi.create({ user })
})

test('POST /festie_apis 201 (user)', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ access_token: userSession, id: 'test', email: 'test', username: 'test', full_name: 'test', password: 'test', event_loc: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual('test')
  expect(body.email).toEqual('test')
  expect(body.username).toEqual('test')
  expect(body.full_name).toEqual('test')
  expect(body.password).toEqual('test')
  expect(body.event_loc).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /festie_apis 401', async () => {
  const { status } = await request(app())
    .post('/')
  expect(status).toBe(401)
})

test('GET /festie_apis 200', async () => {
  const { status, body } = await request(app())
    .get('/')
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /festie_apis/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`/${festieApi.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(festieApi.id)
})

test('GET /festie_apis/:id 404', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /festie_apis/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`/${festieApi.id}`)
    .send({ access_token: userSession, id: 'test', email: 'test', username: 'test', full_name: 'test', password: 'test', event_loc: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(festieApi.id)
  expect(body.id).toEqual('test')
  expect(body.email).toEqual('test')
  expect(body.username).toEqual('test')
  expect(body.full_name).toEqual('test')
  expect(body.password).toEqual('test')
  expect(body.event_loc).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /festie_apis/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`/${festieApi.id}`)
    .send({ access_token: anotherSession, id: 'test', email: 'test', username: 'test', full_name: 'test', password: 'test', event_loc: 'test' })
  expect(status).toBe(401)
})

test('PUT /festie_apis/:id 401', async () => {
  const { status } = await request(app())
    .put(`/${festieApi.id}`)
  expect(status).toBe(401)
})

test('PUT /festie_apis/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ access_token: anotherSession, id: 'test', email: 'test', username: 'test', full_name: 'test', password: 'test', event_loc: 'test' })
  expect(status).toBe(404)
})

test('DELETE /festie_apis/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`/${festieApi.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /festie_apis/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`/${festieApi.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /festie_apis/:id 401', async () => {
  const { status } = await request(app())
    .delete(`/${festieApi.id}`)
  expect(status).toBe(401)
})

test('DELETE /festie_apis/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
