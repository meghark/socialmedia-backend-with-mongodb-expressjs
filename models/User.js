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
        required: true,
        validate: {
            validator: function(e){
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e);
            },
            message: "Invalid email format"
        }
    },
    thoughts: [{
        //Telling model thoughts come from thoughts model
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
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


UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
}); 

const User = model('User', UserSchema);

module.exports = {User};