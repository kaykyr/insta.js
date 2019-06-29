const got = require('got')
import InstagramAPI from '../config/InstagramAPI'

class HTTP {
    async get(url) {
        try {
            const response = await got(url)
            return response
        } catch (err) {
            console.log(err.response.body)
        }
    }

    async post(url, body) {
        try {
            const response = await got.post(url, body)
            return response
        } catch (err) {
            console.log(err.response.body)
        }
    }
}

export default new HTTP()