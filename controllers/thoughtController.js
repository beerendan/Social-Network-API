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

    //update a thought

    //delete a thought

    //create a reaction

    //delete a reaction
}