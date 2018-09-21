import { success, notFound } from '../../services/response/'
import { Logger } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Logger.create(body)
    .then((logger) => logger.view(true))
    .then((view) => console.log(view))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Logger.count(query)
    .then(count => Logger.find(query, select, cursor)
      .then((loggers) => ({
        count,
        rows: loggers.map((logger) => logger.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Logger.findById(params.id)
    .then(notFound(res))
    .then((logger) => logger ? logger.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Logger.findById(params.id)
    .then(notFound(res))
    .then((logger) => logger ? Object.assign(logger, body).save() : null)
    .then((logger) => logger ? logger.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Logger.findById(params.id)
    .then(notFound(res))
    .then((logger) => logger ? logger.remove() : null)
    .then(success(res, 204))
    .catch(next)
