const mongoose =require('mongoose');
mongoose.connect(process.env.MONGOURL).then(()=>{
    console.log("Connected to MongoDB");
    
});
module.exports= mongoose.connection;