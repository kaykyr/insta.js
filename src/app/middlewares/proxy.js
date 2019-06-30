export default async (req, res, next) => {
    const { proxy = false } = req.headers

    if (proxy) {
        global.proxy = proxy
    }

    next()
}