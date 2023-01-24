const express = require('express')
require('dotenv').config()
var cors = require('cors')
const path = require('path')
var bodyParser = require('body-parser')
const db = require('./DB/dbConfig')
const AuthRoute = require('./routes/auth')
const BlogRoute = require('./routes/blogs')


const app = express()
app.use(cors())



// parse application/json
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
// app.use(express.static(__dirname));
// app.use('/public', express.static("public"))
app.use(express.static(path.join(__dirname, 'public')))
db()



app.listen(process.env.PORT || 3000, (err) => {
    if (err) {
        console.log('Localhost connection failed');
    } else {
        console.log('Localhost connection Stablished');

    }
})

app.use('/api', AuthRoute)
app.use('/api/blog', BlogRoute)