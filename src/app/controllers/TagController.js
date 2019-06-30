import API from '../../lib/API'

import Instagram from '../../config/Instagram'

class TagController {
    async index(req, res) {
        const { tag = false } = req.body

        if (!tag) return res.status(400).json({ error: 'Tag not provided' })

        const response = await API.get(Instagram._tag.replace('%s', tag))

        return res.status(response.status)
            .send(response.data)
    }
}

export default new TagController()