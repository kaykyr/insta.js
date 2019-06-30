import qs from 'qs'

import API from '../../lib/API'

import Instagram from '../../config/Instagram'

class UserController {
    async feed(req, res) {
        const { username = req.username } = req.body

        const response = await API.get(Instagram._feed.replace('%s', username))

        return res.status(response.status)
            .send(response.data)
    }

    async followers(req, res) {
        const { userid, first, after } = req.body

        const variables = JSON.stringify({
            id: userid,
            include_reel: true,
            fetch_mutual: true,
            first,
            after
        })

        const response = await API.get(Instagram._followers.replace('%s', variables))

        return res.status(response.status)
            .send(response.data)
    }

    async following(req, res) {
        const { userid, first, after } = req.body

        const variables = JSON.stringify({
            id: userid,
            include_reel: true,
            fetch_mutual: true,
            first,
            after
        })

        const response = await API.get(Instagram._following.replace('%s', variables))

        return res.status(response.status)
            .send(response.data)
    }
}

export default new UserController()