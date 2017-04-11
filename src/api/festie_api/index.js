import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export FestieApi, { schema } from './model'

const router = new Router()
const { id, email, username, full_name, password, event_loc } = schema.tree

/**
 * @api {post} /festie_apis Create festie api
 * @apiName CreateFestieApi
 * @apiGroup FestieApi
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam id Festie api's id.
 * @apiParam email Festie api's email.
 * @apiParam username Festie api's username.
 * @apiParam full_name Festie api's full_name.
 * @apiParam password Festie api's password.
 * @apiParam event_loc Festie api's event_loc.
 * @apiSuccess {Object} festieApi Festie api's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Festie api not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ id, email, username, full_name, password, event_loc }),
  create)

/**
 * @api {get} /festie_apis Retrieve festie apis
 * @apiName RetrieveFestieApis
 * @apiGroup FestieApi
 * @apiUse listParams
 * @apiSuccess {Object[]} festieApis List of festie apis.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /festie_apis/:id Retrieve festie api
 * @apiName RetrieveFestieApi
 * @apiGroup FestieApi
 * @apiSuccess {Object} festieApi Festie api's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Festie api not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /festie_apis/:id Update festie api
 * @apiName UpdateFestieApi
 * @apiGroup FestieApi
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam id Festie api's id.
 * @apiParam email Festie api's email.
 * @apiParam username Festie api's username.
 * @apiParam full_name Festie api's full_name.
 * @apiParam password Festie api's password.
 * @apiParam event_loc Festie api's event_loc.
 * @apiSuccess {Object} festieApi Festie api's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Festie api not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ id, email, username, full_name, password, event_loc }),
  update)

/**
 * @api {delete} /festie_apis/:id Delete festie api
 * @apiName DeleteFestieApi
 * @apiGroup FestieApi
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Festie api not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
