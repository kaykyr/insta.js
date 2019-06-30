import API from '../../lib/API'

import Instagram from '../../config/Instagram'

class LocationController {
    async index(req, res) {
        const { location = false } = req.body

        if (!location) return res.status(400).json({ error: 'Location not provided' })

        const response = await new API().get(Instagram._location.replace('%s', location))

        return res.status(response.status)
            .send(response.data)
    }
}

export default new LocationController()