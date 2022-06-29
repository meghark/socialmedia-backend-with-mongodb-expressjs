const {User, Thought} = require('../models');

// Controller methods with be called by the api routes.
// The controller will access the models to process the requests.
// Each method receives a set of input in the form of params or body and a response object.
const userController = {
    //Return all users. Show any thoughts or friends a user has.
    async getAllUsers(req, res){
        try{
            let data = await User.find({})
                                .populate({
                                    path: 'thoughts',
                                    select: '-__v'
                                })
                                .populate({
                                    path: 'friends',
                                    select: '-__v'
                                })
                                .select('-__v')
                                .sort({ _id: -1});
            res.json(data);
        }
        catch(err){
           console.log(err);
           res.status(400).json(err);
        }
    },
    //Return a single user
    async getOneUserById({params}, res){
        try{
            let data = await User.findOne({ _id: params.id});
            if(!data)
            {
                res.status(404).json({message: "User not found"});
                return;
            }
            res.json(data);
        }
        catch(err){
           console.log(err);
           res.status(400).json(err);
        }
    },
    //Add a user
    async addUser({body}, res){
        console.log("here");
        console.log(body);
        try{
            let response = await User.create(body);
            res.json(response);
        }
        catch(err){
           console.log(err);
           res.status(400).json(err);
        }
    }, 
    //Update a user
    async updateUser({params, body}, res){
        try{
            let response = await User.findOneAndUpdate(
                {_id: params.id}, body, {new: true});
            if(!response)
            {
                res.status(404).json({message: "User not found"});
                return;
            }
            res.json(response);
        }
        catch(err){
           console.log(err);
           res.status(400).json(err);
        }
    },
    // Remove a user. This will also remove any thoughts the user has created.
    async removeUser({params}, res){
        try{
            let response = await User.findOneAndDelete({_id: params.id});
            if(!response)
            {
                res.status(404).json({message : "User not found"});
                return;
            }
            let remove = await Thought.deleteMany({userId: params.id});
            res.json(response);
        }
        catch(err){
           console.log(err);
           res.status(400).json(err);
        }
    },
    // Add friends
    async addFriends({params}, res){
        try{
            var checkFriendExist ={
                _id: params.userId,
                'friends': { $ne: params.friendId}
            } ;

            let response = await User.findOneAndUpdate(
                checkFriendExist,
                //{_id: params.userId},
                {$push: {friends: params.friendId} }, 
                {new: true});

            if(!response)
            {
                res.status(404).json({message: "Friend add failed"});
                return;
            }
            res.json(response);
        }
        catch(err){
           console.log(err);
           res.status(400).json(err);
        }
    },
    // Remove friend
    async RemoveFriends({params}, res){
        try{
            let response = await User.findOneAndUpdate(
                {_id: params.userId},
                {$pull: {friends: params.friendId} }, 
                {new: true});

            if(!response)
            {
                res.status(404).json({message: "User not found"});
                return;
            }
            res.json(response);
        }
        catch(err){
           console.log(err);
           res.status(400).json(err);
        }
    }
};

module.exports = userController;