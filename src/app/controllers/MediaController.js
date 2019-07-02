import API from '../../lib/API'

import Instagram from '../../config/Instagram'

class MediaController {
    async index(req, res) {
        const { mediaid } = req.body

        if (!mediaid) return res.status(400).json({ error: 'You should provide a media ID' })
        const response = await new API().get(Instagram._media.replace('%s', mediaid))

        return res.status(response.status)
            .send(response.data)
    }

    async likers(req, res) {
        const { mediaid, first, after } = req.body

        if (!mediaid) return res.status(400).json({ error: 'You should provide a media ID' })
        if (!first) return res.status(400).json({ error: 'You should provide a limit' })

        const variables = JSON.stringify({
            shortcode: mediaid,
            include_reel: true,
            first,
            after,
        })

        const response = await new API().get(Instagram._likers.replace('%s', variables))
        return res.status(response.status)
            .send(response.data)
    }
}

export default new MediaController()