const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema({
    thoughtText:{
        type: String,
        required: true ,
        trim: true
    },
    createdAt:{
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username:{
        type: String,
        required: true
    }
    /*
    friends: [{
        //Telling model comments comes from comment model
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]*/
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

/*
PizzaSchema.virtual('commentCount').get(function() {
    return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
}); */

const Thought = model('Thought', ThoughtSchema);

module.exports = {Thought};