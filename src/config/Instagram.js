export default {
    base      : "https://www.instagram.com",
    _login    : "/accounts/login/ajax/",
    _feed     : "/%s/?__a=1",
    _followers: "/graphql/query/?query_hash=c76146de99bb02f6415203be841dd25a&variables=%s",
    _following: "/graphql/query/?query_hash=d04b0a864b4b54837c0d870b0e77e076&variables=%s",
    _tag      : "/explore/tags/%s/?__a=1",
    _location : "/explore/locations/%s/?__a=1",
    _search   : "/web/search/topsearch/?context=blended&query=%s",
    _like     : "/web/likes/%s/like/",
    _unlike   : "/web/likes/%s/unlike/",
    _comment  : "/web/comments/%s/add/",
    _follow   : "/web/friendships/%s/follow/",
    _unfollow : "/web/friendships/%s/unfollow/",
    _logout   : "/accounts/logout/",
    _media    : "/p/%s/?__a=1",
    _likers   : "/graphql/query/?query_hash=d5d763b1e2acf209d62d22d184488e57&variables=%s",
}