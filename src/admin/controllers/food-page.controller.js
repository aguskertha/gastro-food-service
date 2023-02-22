// const Food = require('./../models/food.model')
// const Doctor = require('./../models/doctor.model')
const axiosLib = require('axios')
const axios = axiosLib.create({baseURL: process.env.APP_HOST});
var FormData = require('form-data');

const registerFoodPage = async (req, res, next) => {
    try {
        let food = {
            name : req.body.name,
            link : req.body.link,
            description: req.body.description,
            history : req.body.history,
            culture : req.body.culture,
            lifeStyle : req.body.lifeStyle
        }
        let ingredients = []
        for (let i = 1; i <= Number(req.body.ingredientTypeNumber); i++) {
            let ingredient = {
                name : req.body['ingredient'+i]
            }
            let items = []
            for (let j = 1; j <= Number(req.body['itemNumber'+i]); j++) {
                let item = req.body['item'+i+j]
                items.push(item)
            }
            ingredient.items = items
            ingredients.push(ingredient)
        }
        food.ingredients = ingredients;

        let howToMakes = []
        for (let i = 1; i <= Number(req.body['howToMakeNumber']); i++) {
            let howToMake = req.body['howToMake'+i]
            howToMakes.push(howToMake)
        }
        food.howToMakes = howToMakes

        let nutritions = []
        for (let i = 1; i <= Number(req.body['nutritionNumber']); i++) {
            let nutrition = req.body['nutrition'+i]
            nutritions.push(nutrition)
        }
        food.nutritions = nutritions

        let formData = new FormData();
        req.files.files.forEach(file => {
            formData.append("files", Buffer.from(file.data))
        })

        const headers = {
            "Content-Type": "multipart/form-data"
        }

        formData.append('food', JSON.stringify(food))
        const result = await axios.post(
                '/food',
                formData, 
                headers
            );

        const foods = await axios.get('/food')
        if(result.status == 200){
            res.render('Food/food-page', {
                layout: 'layouts/main-layout',
                username: req.user.name,
                foods: foods.data
            })
        }
    } catch (error) {
        res.render('Food/create', {
            layout: 'layouts/main-layout',
            username: req.user.name,
        })
    }
}

const renderCreateFoodPage = async (req, res, next) => {
    try {
        // const foods = await axios.get('/food')
        res.render('Food/create', {
            layout: 'layouts/main-layout',
            username: req.user.name,
            // foods: foods.data
        })
    } catch (error) {
        
    }
}

const renderFoodPage = async (req, res, next) => {
    try {
        const foods = await axios.get('/food')
        res.render('Food/food-page', {
            layout: 'layouts/main-layout',
            username: req.user.name,
            foods: foods.data
        })
    } catch (error) {
        
    }
}

module.exports = {
    renderFoodPage,
    registerFoodPage,
    renderCreateFoodPage
}