const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// Define user schema
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
        required: true,
        validate: {
            validator: function(e){
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e);
            },
            message: "Invalid email format"
        }
    },
    thoughts: [{
        // Telling model thoughts come from thoughts model.
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        // Telling model friends come from friends model.
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

// Virtual calculates the number of friends a user has.
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
}); 

// Create user model
const User = model('User', UserSchema);

module.exports = {User};