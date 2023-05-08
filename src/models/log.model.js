const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const logSchema = new Schema({
    foodId: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    }
});

logSchema.pre('save', function(next){
    this.createdAt = moment().format();
    this.updatedAt = moment().format();
    next();
});

logSchema.pre('updateOne', function(next){
    this.update({},{ $set: { updatedAt: moment().format() } });
    next();
});

const log = mongoose.model('log', logSchema);

module.exports = log;