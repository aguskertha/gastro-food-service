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
        let food = JSON.parse(req.body.food)
        food.foodCode = foodCode
        const base64 = await Utilities.encodeBase64(req,res,next)
        const picture = await Utilities.uploadMultiple(req,res,next);
        food.picture = picture
        food.base64 = base64
        const newFood = new Food(food)
        await newFood.save()

        res.json(newFood)
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}
const updateFood = async (req, res, next) => {
    try {
        const foodId = req.params.foodId
        const food = await Food.findOne({_id: ObjectId(foodId)})
        if(!food) throw 'Food not found!'
        
        let newFood = JSON.parse(req.body.food)
        newFood.foodCode = food.foodCode

        if(req.files)
        {
            const base64 = await Utilities.encodeBase64(req,res,next)
            const picture = await Utilities.uploadMultiple(req,res,next);
    
            newFood.picture = picture
            newFood.base64 = base64

        }


        await Food.updateOne(
            { _id: foodId},
            {
                $set: newFood
            }
        );

        res.json(newFood)

    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const getFoods = async (req, res, next) => {
    try {
        const foods = await Food.find({}, {base64:0}).sort({createdAt : -1});
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
        let food = await Food.findOne({_id: ObjectId(foodId)}, {base64:0})
        if(!food) throw 'Food not found!'
        
        if(req.query != null)
        {
            var data = req.query.detail;
            if( data == 1)
            {
                food = await Food.findOne({_id: ObjectId(foodId)}, {
                    picture:1,
                    name: 1,
                    description: 1,
                    history: 1,
                    culture: 1,
                })
            }
            else if(data == 2)
            {
                food = await Food.findOne({_id: ObjectId(foodId)}, {
                    ingredients: 1,
                    howToMakes: 1,
                    link: 1
                })
            }
            else if(data == 3)
            {
                food = await Food.findOne({_id: ObjectId(foodId)}, {
                    nutritions:1,
                })
            }
        }
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
        let images = []
        let labels = []
        const foods = await Food.find()
        await Promise.all(foods.map(async (food) => {
            food.base64.forEach(base64 => {
                images.push(base64)
                labels.push(food.foodCode)
            });
        }));
        result = await axios.post(
            '/multi-predict', 
            {
                method: 'POST',
                query: base64,
                images,
                maxContentLength: Infinity,
                maxBodyLength: Infinity
            },
        );
        let predicts = result.data
        let datas = getNewObject(predicts, labels, images.length)

        // const groupedDatas = datas.reduce(groupAndCollectByCode, {});

        // let newObjs = []
        // for (let index = 1; index <= foods.length; index++) {
        //     const key = Storage.FOOD+"-"+index
        //     const predictAvg = getAverage(groupedDatas[key])
        //     const data = {
        //         predict: predictAvg,
        //         label : key
        //     }
        //     newObjs.push(data)
        // }
        
        datas.sort((a,b) => {
            return b.predict - a.predict
        })
        
        const data = datas[0]
        if(data.predict < 0.85)
        {
            throw "Food not found!"
        }
        let food = await Food.findOne({foodCode: data.label})
        let newfood = {
            _id: food._id,
            name: food.name,
            description: food.description,
            foodCode: food.foodCode,
            picture: food.picture
        }
        res.json(newfood)
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const getNewObject = (predicts, labels, len) => {
    let datas = []
    for (let index = 0; index < len; index++) {
        const data = {
            predict: predicts[index],
            label : labels[index]
        }
        datas.push(data)
    }
    return datas
}

const getAverage = (datas) => {
    let sum = 0
    let i = 0
    datas.forEach(data => {
        sum+=data.predict[0]
        i++
    });
    return sum / i
}

const groupAndCollectByCode = (index, item) =>{
    const { label } = item;
    const groupKey = [label].join('_');
  
    (index[groupKey] ??= []).push(item);
  
    return index;
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
    createQueryBase64,
    updateFood
}