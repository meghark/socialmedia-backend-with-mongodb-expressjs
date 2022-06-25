const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
        maxLength: 280
    },
    reactionBody: {
        type: String,
        required: true ,
        trim: true
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    }  
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

const ThoughtSchema = new Schema({
    thoughtText:{
        type: String,
        required: true ,
        trim: true,
        maxLength: 280,
        minLength: 1
    },
    createdAt:{
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    username:{
        type: String,
        required: true
    },
    reactions: [ReactionSchema],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});


ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
}); 

const Thought = model('Thought', ThoughtSchema);

module.exports = {Thought};