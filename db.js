const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/billingdb',(err)=>{
    if(!err)
    console.log("MongoDb connection success");
    else
    console.log("Erro is Db connection :" + JSON.stringify(err,undefined,2));
    
});
module.exports=mongoose;