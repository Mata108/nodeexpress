const mongoose = require('mongoose')

// define schema
const courseschema = new mongoose.Schema({
    name: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true

    },
    phone:{
        type: String,
        required: true

    },
     tenth:{
    type: String,
    required: true

},
   twelth:{
    type: String,
    required: true
    

},
course: {
    type: String,
    required: true

},
status: {
    type: String,
    default: 'pending',

},
comment: {
    type: String,
    

},
user_id: {
    type: String,
    required: true

},
},{ timestamps: true })

const courseModal = mongoose.model('course', courseschema)

module.exports = courseModal