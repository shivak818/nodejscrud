const mongoose = require('mongoose');


//  Your code goes here
const marioschema = new mongoose.Schema({
    name : {type:String , required :true},
    weight : {type:Number ,required:true}
});

const MarioChar = mongoose.model('mariochar',marioschema)

module.exports = MarioChar;