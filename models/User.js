const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema({
    username:{
        type: String,
        unique: true,
        required: true ,
        trim: true
    },
    createdBy:{
        type: String
    },
    createdAt:{
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    thoughts: [{
        //Telling model comments comes from comment model
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        //Telling model comments comes from comment model
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
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

const User = model('User', UserSchema);

module.exports = User;