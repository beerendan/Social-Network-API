const {User}=require('../models');

const userController={
    
    //for all users
    getAllUsers(req,res){
        User.find({})
            .select('-__v')
            .then(userData=>res.json(userData))
            .catch(err=>{res.status(500).json(err)});
    },
    
    //for one user
    getUserById({params},res){
        User.findOne({_id:params.id})
            .populate(
                {
                    path:'thoughts',
                    select:'-__v'
                }
            )
            .populate(
                {
                    path:'friends',
                    select:'-__v'
                }
            )
            .select('-__v')
            .then(userData=>res.json(userData))
            .catch(err=>{res.status(500).json(err)});
    },
    
    //create user
    createUser({body},res){
        User.create(body)
            .then(userData=>res.json(userData))
            .catch(err=>res.status(400).json(err));
    },

    //update user
    updateUser({params,body},res){
        User.findOneAndUpdate(
            {
                _id:params.id
            },
            body,
            {
                new:true,
                runValidators:true
            }
        )
        .then(userData=>{
            if(!userData){
                res.status(404).json(
                    {
                        message:`No user found matching id:${params.id}`
                    }
                );
                return;
            }
            res.json(userData);
        })
        .catch(err=>res.json(err));
    },

    //delete a user
    deleteUser({params},res){
        User.findOneAndDelete(
            {
                _id:params.id
            }
        )
        .then(userData=>{
            if(!userData){
                res.status(404).json(
                    {
                        message:`No user found matching id:${params.id}`
                    }
                );
                return;
            }
            res.json(userData);
        })
        .catch(err=>res.status(400).json(err));
    },

    //add friend
    
    //delete friend
}