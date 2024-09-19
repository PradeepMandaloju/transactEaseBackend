var express = require('express');
var router = express.Router();
var user=require('../userSchema/user');
var tran=require('../TranSchema/Tran');

                  //GET USERS

router.get('/users',(req,res)=>{
  user.find({})
  .then((data)=>res.json(data))
  .catch((err)=>console.log(err))
}); 

                  //Get Login User Details

router.post('/userdetails',(req,res)=>{
  var {userId}=req.body;
  user.findOne({userId:userId})
  .then((data)=>res.json(data))
  .catch((err)=>console.log(err))
});

                  //Update balance in both accounts

                  
router.put('/update/:id',(req,res)=>{
  let Id=req.params.id;
  let updateddata=req.body;
  user.updateOne({_id:Id},updateddata)
  .then((result)=>{
    if(result.modifiedCount>0)
      res.send("Account balance Updated")
    else
      res.send("Data not found!")
  })
  .catch((err)=>console.log(err))
  })


              
                  //GET TRANSACTIONS

router.post('/trans',(req,res)=>{
  var {userId}=req.body;
  tran.find({userId:userId})
  .then((data)=>res.json(data))
  .catch((err)=>console.log(err))
});

                  //ADD Transaction

router.post('/addTran',(req,res)=>{
  var newTran= new tran(req.body);
  newTran.save()
  .then(()=>res.send("New Tran Added!"))
  .catch((err)=>console.log(err))
})

                  //REGISTRATION

router.post('/reg',(req,res)=>{
var userId=req.body.userId;
user.findOne({userId:userId}).select("userId")
.then((data)=>{if(data==null){
  var newuser=new user(req.body);
  newuser.save()
.then(()=>res.send("Registered Successfully!"))
.catch((err)=>console.log(err))
}
else{
  res.send("UserId already exists")
}
})
.catch((err)=>console.log(err));
});


                    //LOGIN
                    



router.post('/login',(req,res)=>{
  var {userId,password}=req.body;
  user.findOne({userId:userId}).select("password")
  .then((data)=>{if(data==null){
    res.send('User Not Found');
  }
  else{
    if(data.password==password){
      res.send("Login Success!");
    }
    else{
      res.send("Wrong Password!");
    }
  }
})
.catch((err)=>console.log(err));
});


                  //DELETE

router.delete('/del/:id',(req,res)=>{
  let Id=req.params.id;
  user.deleteOne({_id:Id})
  .then((result)=>{
    if(result.deletedCount>0)
      res.send("Account deleted")
    else
      res.send("Data not found!")
  })
  .catch((err)=>console.log(err))
});


                  //UPDATE

router.put('/up',(req,res)=>{
  let Id=req.params.id;
  let updateddata=req.body;
  user.updateOne({_id:Id},updateddata)
  .then((result)=>{
    if(result.modifiedCount>0)
      res.send("Account details Updated")
    else
      res.send("Data not found!")
  })
  .catch((err)=>console.log(err))
  })


module.exports = router;
