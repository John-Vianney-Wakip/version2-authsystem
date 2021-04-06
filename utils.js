
const { Users } = require('./user.js')

// const user = require('./user.js')

 
async function matchCredentials(requestBody) {
    const users = await Users.findAll({
        attributes: ['username', 'password']
    });
    
     let username = users.forEach((user)=>{
      return user.username
     })

     let password = users.forEach((pass)=>{
         return pass.password
     })

    let user = requestBody.username;
    if (user === username
    && requestBody.password === password) {
    return true
    } else {
    return false
    }
    }
    module.exports = matchCredentials