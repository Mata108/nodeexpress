const express = require('express')
const app = express()
const port = 3000

// route load
const h=require('./routes/web')

const connectdb= require('./db/connectdb.js')

//  file upload
const fileUpload = require("express-fileupload"); 

//Temp file uploader
app.use(fileUpload({useTempFiles: true}));
// to encode

app.use(express.urlencoded({extended:true}));
const cookieparser=require('cookie-parser')
app.use(cookieparser())
// connect db
connectdb()
//connect flash and sessions
const session = require('express-session')
const flash = require('connect-flash');

//messages
app.use(session({
    secret: 'secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  }));
  
//Flash messages
app.use(flash());
// const UserModal=require('./modals/User.js')
// ejs sset
app.set('view engine','ejs')

// static files
app.use(express.static('public'))

// flash
// const flash= require('connect-flash')
// const session=require('express-session')
// app.use(session({
//   secret:'secret',
//   cookie:{maxAge:6000},
//   resave:false,
//   saveUninitialzed:false,

// }))

// app.use(flash())
// route load
app.use('/',h)
// console.log('jai')
// server start 
app.listen(port, () => {
  console.log(`server start on  on port localhost: ${port}`)
// template string format to write string
})
