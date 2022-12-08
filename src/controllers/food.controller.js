const Food = require('./../models/food.model')
const Utilities = require('./../utils/utilities')
const Storage = require('./../utils/storage-constant')
const ObjectId = require('mongodb').ObjectId;
// var Jimp = require('jimp');
const axiosLib = require('axios')
const axios = axiosLib.create({baseURL: process.env.DJANGO_SERVER+"/api"});
const {Base64} = require('js-base64');

const createFood = async (req, res, next) => {
    try {
        const foods = await Food.find().sort({createdAt : -1});
        const foodCode = Storage.FOOD+'-'+(foods.length+1)
        const {name, description} = req.body
        const base64 = await Utilities.encodeBase64(req,res,next)
        const picture = await Utilities.uploadMultiple(req,res,next);
        const newFood = new Food({foodCode, name, picture, description,base64})
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

const convImage = async (req, res, next) => {
    try {
        // Jimp.read('https://img.jakpost.net/c/2019/03/02/2019_03_02_66706_1551461528._large.jpg')
        //     .then(lenna => {
        //         return lenna
        //         .resize(256, 256) // resize
        //         .quality(60) // set JPEG quality
        //         .greyscale() // set greyscale
        //         .write('lena-small-bw.jpg'); // save
        //     })
        //     .catch(err => {
        //         console.error(err);
        //     });
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const createQueryBase64 = async (req, res, next) => {
    try {
        const {base64} = req.body
        let labels = []
        let predicts = []
        const foods = await Food.find()
        
        await Promise.all(foods.map(async (food) => {
            let images = []
            labels.push(food._id)
            food.base64.forEach(base64 => {
                images.push(base64)
            });
            result = await axios.post('/multi-predict', {
                method: 'POST',
                query: base64,
                images
            });
            
            const preds = result.data
            sum = 0
            preds.forEach(predict => {
                sum += predict[0]
            });
            predicts.push(sum / food.base64.length)
        }));

        

        let datas = []
        for (let index = 0; index < foods.length; index++) {
            const data = {
                predict: predicts[index],
                label : labels[index]
            }
            console.log(data.label+" <> "+data.predict)
            datas.push(data)
        }

        datas.sort((a,b) => {
            return b.predict - a.predict
        })

        const data = datas[0]
        if(data.predict < 0.7)
        {
            throw "Predict not found!"
        }
        let food = await Food.findOne({_id: ObjectId(data.label)})
        food.base64 = data.predict.toString()
        console.log(datas)
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
    getByCode,
    convImage,
    createQueryBase64
}