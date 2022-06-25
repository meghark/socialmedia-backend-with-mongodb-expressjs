const {User} = require('../models');

const userController = {

    async getAllUsers(req, res){
        try{
            let data = await User.find({});
            res.json(data);
        }
        catch(err){
           console.log(err);
           res.status(400).json(err);
        }
    },

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
    
    async updateUser({params, body}, res){
        try{
            let response = await User.findOneAndUpdate(
                {_id: params.id}, body, {new: true});
            res.json(response);
        }
        catch(err){
           console.log(err);
           res.status(400).json(err);
        }
    },

    async removeUser({params}, res){
        try{
            let response = await User.findOneAndDelete({_id: params.id});
            if(!res)
            {
                res.status(404).json({message : "User not found"});
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