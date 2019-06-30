import API from '../../lib/API'

import Instagram from '../../config/Instagram'

class CommentController {
    async store(req, res) {
        const { mediaid = false, comment_text = false, replied_to_comment_id } = req.body

        if (!mediaid) return res.status(400).send({ error: 'You should provide media ID' })
        if (!comment_text) return res.status(400).send({ error: 'You should provide a comment' })

        const response = await new API().post(Instagram._comment.replace('%s', mediaid), { comment_text, replied_to_comment_id })

        return res.status(response.status)
            .send(response.data)
    }
}

export default new CommentController()