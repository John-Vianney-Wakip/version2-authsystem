
// const { User } = require('./models.js')
const models = require('./db.js')
function matchCredentials(requestBody) {
    let user = models.users[requestBody.username]
    if (user !== undefined
    && requestBody.password === user.password) {
    return true
    } else {
    return false
    }
    }
    module.exports = matchCredentials