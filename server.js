//import dependencies
const express=require('express');
const mongo=require('mongoose');

//app setup
const app=express()
const PORT=process.env.PORT||3001;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(require('./routes'));

//mongoose setup
mongo.connect(
    process.env.MONGODB_URI ||'mongodb://localhost:27017', {
        useNewUrlParser: true,
        useUnifiedTopology:true,
    }
);
app.listen(PORT,()=>
console.log(`Listening on ${PORT}`));
