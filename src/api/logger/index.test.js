import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Logger } from '.'

const app = () => express(apiRoot, routes)

let logger

beforeEach(async () => {
  logger = await Logger.create({})
})

test('POST /log 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ blob: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.blob).toEqual('test')
})

test('GET /log 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /log/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${logger.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(logger.id)
})

test('GET /log/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /log/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${logger.id}`)
    .send({ blob: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(logger.id)
  expect(body.blob).toEqual('test')
})

test('PUT /log/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ blob: 'test' })
  expect(status).toBe(404)
})

test('DELETE /log/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${logger.id}`)
  expect(status).toBe(204)
})

test('DELETE /log/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
