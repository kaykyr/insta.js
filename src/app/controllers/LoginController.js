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

        const api = new API()
        let session = await api.recoverSession(username)

        if (!session) {
            api.createDevice()

            let request = await api.get()
            api.setCookies(request.headers['set-cookie'])

            request = await api.post(Instagram._login, { username, password })
            const headersCookies = request.headers['set-cookie']
            api.setCookies(headersCookies)
        
            session = await api.saveSession(headersCookies, username, request.data.userId)

            await api.get()

            let response = request.data
            response.sessionid = session._id

            return res.status(request.status).json(response)
        } else {
            const request = await api.get()

            if (request.data.includes(username)) {
                return res.status(200).json({
                    authenticated: true,
                    status: "ok",
                    sessionid: session._id,
                    userid: session.userid,
                })
            } else {
                return res.status(401).json({
                    authenticated: false,
                    status: "fail",
                    sessionid: session._id,
                    userid: session.userid,
                })
            }
        }
    }
}

export default new LoginController()