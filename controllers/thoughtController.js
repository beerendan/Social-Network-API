const {Thought, User}=require('../models');

const thoughtController={
   
    //for all thoughts
    getAllThoughts(req,res){
        Thought.find({}).then(thoughtData=>
        res.json(thoughtData))
        .catch(err=>{
            res.status(400).json(err)});
    },
  
    //for one thought
    getOneThought({params}, res){
        Thought.findOne({id:params._id}).select('-__v')
        .sort({_id:-1})
        .then(thoughtData=>res.json(thoughtData))
        .catch(err=>{
            res.status(400).json(err)});
    },
   
    //create a thought
    createThought({params,body}, res){
        Thought.create(body)
        .then(({_id})=>{
            return User.findOneAndUpdate({
                username:body.username
            },
            {
                $push:
                {
                    thoughts:_id
                }
            },
            {
                new:true
            });
        })
        .then(userData=>{
            if (!userData){
                res.status(404).json({
                    message:`No user with id:${body.username}`
                });
                return;
            }
            res.json(userData);
        })
        .catch(err=> res.json(err));
    },
   
    //update a thought
    updateThought({params,body},res){
        Thought.findOneAndUpdate({id:params._id},
            body,{
                new:true,
                runValidators:true
            })
            .then(updatedThought=>{
                if(!updatedThought){
                    return res.status(404).json({
                        message: `No thought found with id: ${params.id}`
                    })
                };
                res.json(updatedThought);
            })
            .catch(err=>res.json(err));
    },
   
    //delete a thought
    deleteThought({params,body}, res){
        Thought.findOneAndDelete({id:params._id})
        .then(deletedThought=>{
            if(!deletedThought){
                return res.status(404).json({
                    message:`No thought found matching id:${params.id}`
                })
            };
            res.json(deletedThought)
        })
        .catch(err=>res.json(err))
    },
    
    //create a reaction
    createReaction({params,body},res){
        Thought.findOneAndUpdate(
            {
                _id:params.thoughtId
            },
            {
                $push:
                {
                    reactions:body
                }
            },
            {
                new:true,
                runValidators:true
            })
            .then(thoughtData=>{
                if(!thoughtData){
                    res.status(404).json({
                        message:`No thought found with id:${params.thoughtId}`
                    });
                    return;
                }
                res.json(thoughtData)
            })
            .catch(err=>res.json(err));
    },

    //delete a reaction
    deleteReaction({params,body},res){
        Thought.findOneAndUpdate(
            {
                id:params.thoughtId
            },
            {
            $pull:
                {
                reactions:
                    {
                        reactionId: params.reactionId
                    }
                }
            },
            {
                new:true
            })
            .then(thoughtData=>res.json(thoughtData))
            .catch(err=>res.json(err));
    }
};

module.exports=thoughtController;