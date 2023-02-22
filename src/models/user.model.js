const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    }
});

userSchema.pre('save', function(next){
    this.createdAt = moment().format();
    this.updatedAt = moment().format();
    next();
});

userSchema.pre('updateOne', function(next){
    this.update({},{ $set: { updatedAt: moment().format() } });
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;