import API from '../../lib/API'

import Instagram from '../../config/Instagram'

class LoginController {
    async validateCredentials(req, res, next) {
        const { username } = req.body

        if (username.includes('@')) {
            return res.status(400).json({ error: "Provide your instagram username without @/email" })
        }

        return next()
    }

    async login(req, res) {
        const { username, password } = req.body

        let session = await new API().recoverSession(username);

        if (!session) {
            await new API().get()

            const request        = await new API().post(Instagram._login, { username, password })
            const headersCookies = request.headers['set-cookie']
        
            let session = await new API().saveSession(headersCookies, username)

            await new API().get()

            let response = request.data
            response.sessionid = session._id

            res.status(request.status).json(response)
        } else {
            const request = await new API().get()

            if (request.data.includes(username)) {
                res.status(200).json({
                    authenticated: true,
                    status: "ok",
                    sessionid: session._id
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