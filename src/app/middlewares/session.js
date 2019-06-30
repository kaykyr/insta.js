import Session from '../schemas/Session'
import API from '../../lib/API';

export default async (req, res, next) => {
    const { sessionid } = req.headers

    if (!sessionid) {
        return res.status(401).json({ error: 'Session ID not provided' })
    }

    const session = await Session.findById(sessionid)

    if (!session) {
        return res.status(401).json({ error: 'Invalid session ID' })
    }
    
    const sessionRecovered = await new API(false).recoverSession(session.username)

    if (sessionRecovered) {
        req.username = session.username
        return next()
    }

    return res.status(401).json({ error: 'Session could not be recovered' })
}