import Session from '../schemas/Session'
import API from '../../lib/API';

export default async (req, res, next) => {
    const __id = req.headers.sessionid

    if (!__id) {
        return res.status(401).json({ error: 'Session ID not provided' })
    }

    const session = await Session.findById(__id)

    if (!session) {
        return res.status(401).json({ error: 'Invalid session ID' })
    }
    
    const sessionRecovered = await API.recoverSession(session.username)

    if (sessionRecovered) {
        req.username = session.username
        return next()
    }

    return res.status(401).json({ error: 'Session could not be recovered' })
}