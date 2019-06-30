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

        const hasSession = await API.recoverSession(username);

        if (!hasSession) {
            await API.get()

            const request = await API.post(Instagram._login, { username, password })
            const session = request.headers['set-cookie']
        
            await API.saveSession(session, username)

            await API.get()

            res.status(request.status).send(request.data)
        } else {
            const request = await API.get()

            if (request.data.includes(username)) {
                res.status(200).json({
                    authenticated: true,
                    status: "ok"
                })
            } else {
                res.status(401).json({
                    authenticated: false,
                    status: "fail"
                })
            }
        }
    }
}

export default new LoginController()