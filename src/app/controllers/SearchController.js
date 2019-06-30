import API from '../../lib/API'

import Instagram from '../../config/Instagram'

class SearchController {
    async index(req, res){
        const { keyword } = req.body
        const response = await API.get(Instagram._search.replace('%s', keyword))
        return res.status(response.status).send(response.data)
    }
}

export default new SearchController()