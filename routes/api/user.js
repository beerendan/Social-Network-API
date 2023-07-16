const router=require('express').Router();

const{
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
}=require('../../controllers/userController');

//base route for all users and creating new users
router.route('/').get(getAllUsers).post(createUser);

//route for individual users and updating/deleting users
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

//add/remove friend route
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports=router;