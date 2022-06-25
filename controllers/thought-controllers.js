const {Thought, User} = require('../models');

const thoughtController = {
    async getAllThoughts(req, res){
        try{
            let data = await Thought.find({});
            res.json(data);
        }
        catch(err){
           console.log(err);
           res.status(400).json(err);
        }
    },
    async getOneThoughtById({params}, res){
        try{
            let data = await Thought.findOne({ _id: params.thoughtId});
            if(!data)
            {
                res.status(404).json({message: "Thought not found"});
                return;
            }
            res.json(data);
        }
        catch(err){
           console.log(err);
           res.status(400).json(err);
        }
    },
    async addThought({body}, res){
        try{
            let response = await Thought.create(body);
            if(!response._id)
            {
                res.status(400).json({message: "Failed adding thought"});
                return;
            }
            let userdata = await User.findOneAndUpdate({_id : body.userId},
                                    {$push: {thoughts: response._id}},
                                    {new: true});

            if(!userdata)
            {
                res.status(400).json({message: "Failed adding thought to user"});
                return;
            }
            res.json(userdata);
        }
        catch(err){
           console.log(err);
           res.status(400).json(err);
        }
    }, 
    async updateThought({params, body}, res){
        try{
            let response = await Thought.findOneAndUpdate(
                {_id: params.thoughtId}, body, {new: true});
            res.json(response);
        }
        catch(err){
           console.log(err);
           res.status(400).json(err);
        }
    },
    async removeThought({params}, res){
        try{
            let response = await Thought.findOneAndDelete({_id: params.thoughtId});
            if(!response)
            {
                res.status(404).json({message : "Thought not found"});
                return;
            }
            res.json(response);
        }
        catch(err){
           console.log(err);
           res.status(400).json(err);
        }
    },
    async addReaction({params, body}, res){
        try{
            let dbData = await Thought
                                    .findOneAndUpdate({ _id: params.thoughtId},
                                        {$push: {reactions : body}},
                                        {new: true});
            if(!dbData)
            {
                res.status(404).json("Thought not found");
                return;
            }
            res.json(dbData);
        }
        catch(err){
            console.log(err);
            res.status(400).json(err);
         }

    },
    async removeReaction({params}){
        try{
            let dbData = await Thought
                                    .findOneAndUpdate({ _id: params.thoughtId},
                                        {$pull: {reactions : {reactionId : params.reactionId}}},
                                        {new: true});
            if(!dbData)
            {
                res.status(404).json("Thought not found");
                return;
            }
            res.json(dbData);
        }
        catch(err){
            console.log(err);
            res.status(400).json(err);
         }
    }

};

module.exports = thoughtController;