
// const { Sessions } = require('./session.js')

let users = require('./user.js')
let sessions = require('./session.js')


let models = {
     users: users,
     sessions: sessions
     
}

module.exports = models