var mongo=require('mongoose');
var schema=mongo.Schema;
var TranSchema=new schema({
    userId:String,
    amount:Number,
    time:String,
    person:String,
    type:Boolean
});

var Tran=mongo.model('Tran',TranSchema);
module.exports=Tran;