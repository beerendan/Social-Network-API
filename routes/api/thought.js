const router=require('express').Router();

const{
    getAllThoughts,
    getOneThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
}=require('../../controllers/thoughtController');

//all thoughts and new thought route
router.route('/').get(getAllThoughts).post(createThought);

//individual thought route for updating and deleting routes
router.route('/:id').get(getOneThought).put(updateThought).delete(deleteThought);

//route for adding reaction
router.route('/:thoughtId/reactions').post(createReaction);

//delete reaction route
router.route('/thoughtId/reactionId').delete(deleteReaction);

module.exports=router;