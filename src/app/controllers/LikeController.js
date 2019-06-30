import API from '../../lib/API'

import Instagram from '../../config/Instagram'

class LikeController {
    async store(req, res) {
        const { mediaid = false } = req.body

        if (!mediaid) return res.status(400).send({ error: 'You should provide media ID' })

        const response = await new API().post(Instagram._like.replace('%s', mediaid))

        return res.status(response.status)
            .send(response.data)
    }
}

export default new LikeController()