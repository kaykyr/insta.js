export default async (req, res, next) => {
    const { proxy = false } = req.headers
    global.proxy = proxy
    next()
}