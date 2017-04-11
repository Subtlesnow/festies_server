import _ from 'lodash'
import { success, notFound, authorOrAdmin } from '../../services/response/'
import { FestieApi } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  FestieApi.create({ ...body, user })
    .then((festieApi) => festieApi.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  FestieApi.find(query, select, cursor)
    .populate('user')
    .then((festieApis) => festieApis.map((festieApi) => festieApi.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  FestieApi.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((festieApi) => festieApi ? festieApi.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  FestieApi.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((festieApi) => festieApi ? _.merge(festieApi, body).save() : null)
    .then((festieApi) => festieApi ? festieApi.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  FestieApi.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((festieApi) => festieApi ? festieApi.remove() : null)
    .then(success(res, 204))
    .catch(next)
