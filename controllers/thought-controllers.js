const {Thought} = require('../models');

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
            let data = await Thought.findOne({ _id: params.id});
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
    async addThought({params, body}, res){
        try{
            let response = await Thought.create(body);
        
            let userdata = await Thought.findOneAndUpdate({_id : params.id},
                                    {$push: {thoughts: response._id}},
                                    {new: true});

            if(!userdata)
            {
                res.status(400).json({message: ""});
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
                {_id: params.id}, body, {new: true});
            res.json(response);
        }
        catch(err){
           console.log(err);
           res.status(400).json(err);
        }
    },
    async removeThought({params}, res){
        try{
            let response = await Thought.findOneAndDelete({_id: params.id});
            if(!res)
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
    }

};

module.exports = thoughtController;