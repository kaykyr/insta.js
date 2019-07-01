const axios = require('axios')

axios.defaults.baseURL = "http://localhost:3333"
axios.defaults.headers['proxy'] = 'http://45.32.155.0:4002'

const credentials = {
    username: "",
    password: "",
}

const hashtags = ['f4f','l4l']
const usernames = ['apple','instagram']
const locations = ['vancovuer','toronto']

async function init() {
    console.log('Logging into Instagram...')
    await login(credentials)

    while (true) {
        console.log('Interacting by hastags...')
        await interactByTags(hashtags)
        await sleep(20000)
        //console.log('Interacting by usernames...')
        //await interactByUsernames(usernames)
        //await sleep(20000)
        //console.log('Interacting by locations...')
        //await interactByLocations()
        //await sleep(20000)
    }
}

async function login(credentials) {
    const response = await axios.post('/login', credentials)
    axios.defaults.headers['sessionid'] = response.data.sessionid
}

async function interactByTags(hashtags) {
    const tag = hashtags[Math.floor(Math.random() * hashtags.length)]
    console.log(`Retrieving medias from #${tag}...`)
    const response = await axios.post('/tag', { tag })
    const medias   = response.data.graphql.hashtag.edge_hashtag_to_top_posts.edges
    const media    = medias[Math.floor(Math.random() * medias.length)]
    const mediaid  = media.node.id
    const userid   = media.node.owner.id

    await shuffleInteraction({ mediaid, userid })
}

async function interactByUsernames(usernames) {
    /**
     * Will be implemented yet
     */
    return
}

async function interactByLocations(locations) {
    /**
     * Will be implemented yet
     */
    return
}

async function shuffleInteraction(context) {
    const { mediaid, userid } = context
    const interaction = Math.floor(Math.random() * 2)

    switch (interaction) {
        case 0:
            console.log("Liking picture...")
            await axios.post('/like', { mediaid })
            console.log("Liked!")
            break
        case 1:
            console.log("Following owner...")
            await axios.post('/follow', { userid })
            console.log("Followed!")
            break
        case 2:
            console.log("Following owner and liking media...")
            await axios.post('/like', { mediaid })
            await axios.post('/follow', { userid })
            console.log("Done!")
            break
    }
}

async function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

try {
    init()
} catch (err) {
    console.log(err)
}