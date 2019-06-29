import FormData from 'form-data'
import HTTP from '../../lib/HTTP'

import InstagramAPI from '../../config/InstagramAPI'

class LoginController {
    async validateCredentials(req, res, next) {
        return next()
    }

    async login(req, res) {
        await HTTP.get(InstagramAPI.url)

        const form = new FormData()
        form.append('username', req.body.username)
        form.append('password', req.body.password)

        const request = await HTTP.post('instagram.com/accounts/login/ajax/', { body: form })

        return res.status(200).send(request)
    }
}

export default new LoginController()