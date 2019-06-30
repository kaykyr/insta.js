import API from '../../lib/API'

import Instagram from '../../config/Instagram'

class UnfollowController {
    async store(req, res) {
        const { userid = false } = req.body

        if (!userid) return res.status(400).send({ error: 'You should provide user ID' })

        const response = await API.post(Instagram._unfollow.replace('%s', userid))

        return res.status(response.status)
            .send(response.data)
    }
}

export default new UnfollowController()