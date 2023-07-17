//import dependencies
const express=require('express');
const db=require('./config/connection');

//app setup
const app=express();
const PORT=process.env.PORT||3001;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(require('./routes'));

//server setup
db.once('open',()=>{
    app.listen(PORT,()=>{
      console.log(`Server active on port ${PORT}`);
    });
});