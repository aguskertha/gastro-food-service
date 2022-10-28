const Food = require('./../models/food.model')
const Utilities = require('./../utils/utilities')
const Storage = require('./../utils/storage-constant')
const ObjectId = require('mongodb').ObjectId;

const createFood = async (req, res, next) => {
    try {
        const foods = await Food.find().sort({createdAt : -1});
        const foodCode = Storage.FOOD+'-'+(foods.length+1)
        const {name, description} = req.body
        const picture = await Utilities.upload(req,res,next);
        const newFood = new Food({foodCode, name, picture, description})
        await newFood.save()

        res.json(newFood)
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const getFoods = async (req, res, next) => {
    try {
        const foods = await Food.find().sort({createdAt : -1});
        res.json(foods)
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const deleteFoods = async (req, res, next) => {
    try {
        await Food.deleteMany()
        res.json({message: 'Foods Successfully deleted!'})
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const deleteById = async (req, res, next) => {
    try {
        const foodId = req.params.foodId;
        const food = await Food.findOne({_id: ObjectId(foodId)})
        if(!food) throw 'Food not found!'
        await Food.deleteOne({_id: ObjectId(foodId)})
        res.json({message: 'Food Successfully deleted!'})
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const deleteByCode = async (req, res, next) => {
    try {
        const foodCode = req.params.foodCode;
        const food = await Food.findOne({foodCode: foodCode})
        if(!food) throw 'Food not found!'
        await Food.deleteOne({foodCode})
        res.json({message: 'Food Successfully deleted!'})
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const getById = async (req, res, next) => {
    try {
        const foodId = req.params.foodId;
        const food = await Food.findOne({_id: ObjectId(foodId)})
        if(!food) throw 'Food not found!'
        res.json(food)
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const getByCode = async (req, res, next) => {
    try {
        const foodCode = req.params.foodCode;
        const food = await Food.findOne({foodCode})
        if(!food) throw 'Food not found!'
        res.json(food)
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}




module.exports = {
    createFood,
    getFoods,
    deleteFoods,
    deleteByCode,
    deleteById,
    getById,
    getByCode
}