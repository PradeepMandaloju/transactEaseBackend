var mongo=require('mongoose');
var schema=mongo.Schema;
var userSchema=new schema({
    userId:String,
    password:String,
    username:String,
    email:String,
    phone:String,
    accBal:Number
});

var user=mongo.model('user',userSchema);
module.exports=user;