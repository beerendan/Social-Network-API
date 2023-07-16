const moment=require('moment');
const {Schema, model, Types}=require('mongoose');

//schema setup for mongoose
const thoughtSchema=new Schema({
    thoughtText:{
        type:String,
        minlength:1,
        maxlength:240,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        get:(postDate)=>{
            moment(postDate).format('MMM DD, YYYY [at] hh:mm a');

        }
    },
    username:{
        type:String,
        required:true,
        ref:'User'
    },
    reactions:[reactionSchema],
},
{
    toJSON:{
        virtuals:true,
        getters:true
    },
    id:false
});

const reactionSchema=new Schema({
    reactionId:{
        type:Schema.Types.ObjectId,
        default:()=> new Types.ObjectId()
    },
    reactionBody:{
        type:String,
        minlength:1,
        maxlength:240,
        required:true,
        trim:true,
    },
    username:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        get: reactionDate=>{
            moment(reactionDate).format('MMM DD, YYYY [at] hh:mm a');
        }
    }

},{
    toJSON:{getters:true},
    id:false
});

//Object definition and reaction count
const Thought=model('thought',thoughtSchema);
thoughtSchema.virtual('reactionCount').get(()=>{
return this.reactions.length});

module.exports=Thought;