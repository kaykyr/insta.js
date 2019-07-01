import httpsProxyAgent from 'https-proxy-agent'
import axios from 'axios'
import qs from 'qs'

import Session from '../app/schemas/Session'

import Instagram from '../config/Instagram'
import UserAgent from '../config/UserAgent'

class API {
    constructor(init = true) {
        if (init) {
            axios.defaults.baseURL = Instagram.base
            if (global.proxy) axios.defaults.httpsAgent = new httpsProxyAgent(global.proxy);
            this.setHeaders()
        }
    }

    createDevice() {
        axios.defaults.headers['User-Agent'] = UserAgent()
    }

    setHeaders() {
        axios.defaults.headers['Accept']           = '*/*'
        axios.defaults.headers['Accept-Language']  = 'en-US,en;q=0.9,es;q=0.8,fr;q=0.7,pt;q=0.6,zh-CN;q=0.5,zh;q=0.4,gl;q=0.3'
        axios.defaults.headers['Accept-Encoding']  = 'gzip, deflate, br'
        axios.defaults.headers['Connection']       = 'keep-alive'
        axios.defaults.headers['Host']             = 'www.instagram.com'
        axios.defaults.headers['Origin']           = 'https://www.instagram.com'
        axios.defaults.headers['Referer']          = 'https://www.instagram.com/'
        axios.defaults.headers['X-Instagram-AJAX'] = '1'
        axios.defaults.headers['Content-Type']     = 'application/x-www-form-urlencoded'
        axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
    }

    setCookies(headers) {
        if (headers) {
            let csrftoken, cookies = ''

            headers.map((cookie) => {
                cookies += cookie.startsWith('csrftoken') ? this.filterCookie(cookie) : ''
                cookies += cookie.startsWith('rur') ? this.filterCookie(cookie) : ''
                cookies += cookie.startsWith('mid') ? this.filterCookie(cookie) : ''
                cookies += cookie.startsWith('ds_user_id') ? this.filterCookie(cookie) : ''
                cookies += cookie.startsWith('sessionid') ? this.filterCookie(cookie) : ''
                cookies += cookie.startsWith('shbid') ? this.filterCookie(cookie) : ''
                cookies += cookie.startsWith('shbts') ? this.filterCookie(cookie) : ''

                if (cookie.startsWith('csrftoken'))
                    csrftoken = this.filterCookie(cookie).split('=')[1]
            })


            const xcsrftoken = csrftoken.split(';')[0]
            axios.defaults.headers['X-CSRFToken'] = xcsrftoken
            axios.defaults.headers['Cookie'] = cookies
        } else {
            throw Error ('ERROR: Something went wrong.')
        }

        return this
    }

    filterCookie(cookie) {
        if (cookie) {
            return cookie.split('Domain')[0]
        }

        return ' '
    }

    async request(context) {
        const { url, method, headers, data } = context

        return await axios.request({ url, method, headers, data }).then((response) => {
            return response
        }).catch((response) => {
            throw Error ('ERROR: Something went wrong.')
        })
    }

    async get(path) {
        const context = {
            url: path,
            method: 'GET',
        }

        const request = await this.request(context)
        return request
    }

    async post(path, body) {
        const context = {
            url: path,
            method: 'POST',
            data: qs.stringify(body),
        }

        const request = await this.request(context)
        return request
    }

    async saveSession(cookies, username) {
        const session = await Session.create({
            username,
            session_data: cookies,
            device: axios.defaults.headers['User-Agent'],
        })

        return session
    }

    async recoverSession(username) {
        const session = await Session.findOne({ username })
        if (session) {
            this.setCookies(session.session_data)
            axios.defaults.headers['User-Agent'] = session.device
        }

        return session
    }
}

export default API