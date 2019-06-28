import { Router } from 'express'

//import authMiddlaware from './app/middlewares/auth'
import LoginController from './app/controllers/LoginController'

const routes = new Router()

routes.post('/login', LoginController.validateCredentials, LoginController.login)

//routes.use(authMiddlaware)

export default routes