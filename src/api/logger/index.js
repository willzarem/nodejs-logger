import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Logger, { schema } from './model'

const router = new Router()
const { blob } = schema.tree

/**
 * @api {post} /log Create logger
 * @apiName CreateLogger
 * @apiGroup Logger
 * @apiParam blob Logger's blob.
 * @apiSuccess {Object} logger Logger's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Logger not found.
 */
router.post('/',
  body({ blob }),
  create)

/**
 * @api {get} /log Retrieve loggers
 * @apiName RetrieveLoggers
 * @apiGroup Logger
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of loggers.
 * @apiSuccess {Object[]} rows List of loggers.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /log/:id Retrieve logger
 * @apiName RetrieveLogger
 * @apiGroup Logger
 * @apiSuccess {Object} logger Logger's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Logger not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /log/:id Update logger
 * @apiName UpdateLogger
 * @apiGroup Logger
 * @apiParam blob Logger's blob.
 * @apiSuccess {Object} logger Logger's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Logger not found.
 */
router.put('/:id',
  body({ blob }),
  update)

/**
 * @api {delete} /log/:id Delete logger
 * @apiName DeleteLogger
 * @apiGroup Logger
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Logger not found.
 */
router.delete('/:id',
  destroy)

export default router
