const {Schema, model}=require('mongoose');

//Setup user in mongodb
const userSchema= new Schema({
    username:{
        type: String,
        required:true,
        unique:true,
        trim:true
    },
    email:{
        type: String,
        required:true,
        unique:true,
        trim: true,
        //regex to validate email
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email address']
    },
    friends:[{
        type:Schema.Types.ObjectId,
        ref:'user'
    }],
    thoughts:[{
        type:Schema.Types.ObjectId,
        ref:'thought'
    }]
},{
    toJSON:{
        virtuals:true,
        getters:true
    },
    id:false
});

//define User object and friend counter
const User=model('user', userSchema);
userSchema.virtual('totalFriends').get(()=>{
    return this.friends.length
});

module.exports=User;