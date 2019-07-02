import { Router } from 'express'

import session from './app/middlewares/session'

import LoginController from './app/controllers/LoginController'
import UserController from './app/controllers/UserController'
import TagController from './app/controllers/TagController'
import LocationController from './app/controllers/LocationController'
import SearchController from './app/controllers/SearchController'
import LikeController from './app/controllers/LikeController'
import UnlikeController from './app/controllers/UnlikeController'
import CommentController from './app/controllers/CommentController'
import FollowController from './app/controllers/FollowController'
import UnfollowController from './app/controllers/UnfollowController'
import LogoutController from './app/controllers/LogoutController'

const routes = new Router()

routes.post('/login', LoginController.validateCredentials, async (req, res) => { LoginController.login(req, res) })

routes.use(session)

routes.post('/feed', UserController.feed)
routes.post('/followers', UserController.followers)
routes.post('/following', UserController.following)

routes.post('/search', SearchController.index)

routes.post('/tag', TagController.index)
routes.post('/location', LocationController.index)

routes.post('/like', LikeController.store)
routes.post('/unlike', UnlikeController.store)
routes.post('/comment', CommentController.store)
routes.post('/follow', FollowController.store)
routes.post('/unfollow', UnfollowController.store)

routes.get('/logout', LogoutController.delete)

export default routes