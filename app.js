const express = require('express')
const cookieParser = require("cookie-parser")
const { v4: uuidv4 } = require('uuid')
// const fake_db = require('./models.js')
const matchCredentials = require('./utils.js')
const app = express()

// const { User } = require('./models.js')

const models = require('./db.js')

app.use(express.static(__dirname + '/public'));
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))


app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))


// show home with forms
app.get('/', function(req, res){
    res.render('pages/home')
})
app.get('/login', function(req, res){
    res.render('pages/login')
})

// create
app.post('/create', async function(req, res){
    let body = req.body

    const user = await User.create({
        username: body.username,
        password: body.password  
    });
    
    // models.User[user.username]= user
    console.log( user.toJSON() )
    res.redirect('/login')
})

// login
app.post('/login', function(req, res){
if (matchCredentials(req.body)) {
let user = modles.users[req.body.username]

let id = uuidv4()
// create session record

models.sessions[id] = {
    user: user,
    timeOfLogin: Date.now()
    }
// create cookie that holds the UUID (the Session ID)
res.cookie('SID', id, {
expires: new Date(Date.now() + 900000),
httpOnly: true
})
res.render('pages/home')
} else {
res.redirect('/error')
}
})
// this is the protected route
app.get('/supercoolmembersonlypage', function(req, res){
let id = req.cookies.SID
// attempt to retrieve the session.
// if session exists, get session
// otherwise, session === undefined.
let session = models.sessions[id]
// if session is undefined, then
// this will be false, and we get sent
// to error.ejs
if (session) {
res.render('pages/members')
} else {
res.render('pages/error')
}
})

//log out
app.get('/logout', function(req, res){
    let id = req.cookies.SID
    let session = models.sessions[id]
    if (session) {

        models.sessions[id]= {
            user: "",
            timeOfLogin: Date.now()
            }

        res.cookie('SID', '', {
            expires: new Date(Date.now()- 900000),
            httpOnly: true
            })
    

    res.render('pages/home')
    } else {
    res.render('pages/error')
    }
    })
// if something went wrong, you get sent here
app.get('/error', function(req, res){
res.render('pages/error')
})
// 404 handling
app.all('*', function(req, res){
res.render('pages/error')
})

//listening port
const PORT = process.env.PORT ||1612;
app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));

