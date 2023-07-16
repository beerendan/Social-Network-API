const router=require('express').Router();
const thought=require('./thought');
const user=require('./user');

//api routes
router.use('/users',user);
router.use('/thoughts',thought);

module.exports=router;