import Session from '../schemas/Session'

class LogoutController {
    async delete(req, res) {
        const { sessionid } = req.headers

        const session = await Session.findByIdAndDelete(sessionid)

        if (session) return res.status(200).json({ status: "ok" })
        else return res.status(400).json({ error: "Session does not exists" })
    }
}

export default new LogoutController()