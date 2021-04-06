const { Users } = require('./user.js')
const { Sessions } = require('./session.js')

let users = require('./user.js')
let sessions = require('./session.js')


let models = {
     users = Users,
     sessions = Sessions
     
}

module.exports = models