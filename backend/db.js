const mongoose =require('mongoose');
const { string } = require('zod');
mongoose.connect('mongodb://localhost:27017/paytm');

const userSchema=mongoose.Schema({
    username:String,
    password:{
        type:String,
        required:true,
        minLength:6
    },
    firstName:String,
    lastName:String
});

const User= mongoose.model('User',userSchema)

const accountSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
});

const Account=mongoose.model('Account',accountSchema);

module.exports={
    User,
    Account
};