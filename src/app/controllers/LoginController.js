import API from '../../lib/API'

import Instagram from '../../config/Instagram'

class LoginController {
    async validateCredentials(req, res, next) {
        /**
         * Credentials needs to be validated (no @, no e-mails, not invalid characters in username)
         */
        return next()
    }

    async login(req, res) {
        const { username, password } = req.body

        await API.get()
        const request = await API.post(Instagram._login, { username, password })
        res.status(request.status).send(request.data)
    }
}

export default new LoginController()