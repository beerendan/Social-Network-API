const {Thought, User}=require('../models');

const thoughtControl={
    //for all thoughts
    getAllThoughts(req,res){
        Thought.find({}).then(thoughtData=>
        res.json(thoughtData))
        .catch(err=>{
            res.status(400).json(err)});
    },
    //for one thought
    getOneThought({params}, res){
        Thought.findOne({_id:params._id}).select('-__v')
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
                $push:{thoughts:_id}
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
        Thought.findOneAndUpdate({_id:params.id},
            body,{
                new:true,
                runValidators:true
            })
            .then(updatedThought=>{
                if(!updatedThought){
                    return res.status(404).json({
                        message: `No thought found with id: ${params.id}`
                    })
                }
                res.json(updatedThought);
            })
            .catch(err=>res.json(err));
    },
    //delete a thought

    //create a reaction

    //delete a reaction
}