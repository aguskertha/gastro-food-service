// const helpers = require('../../../public/js/helpers')

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
            if(ingredient.name)
            {
                let items = []
                for (let j = 1; j <= Number(req.body['itemNumber'+i]); j++) {
                    let item = req.body['item'+i+j]
                    if(item)
                    {
                        items.push(item)
                    }
                }
                ingredient.items = items
                ingredients.push(ingredient)
            }
        }
        food.ingredients = ingredients;

        let howToMakes = []
        for (let i = 1; i <= Number(req.body['howToMakeNumber']); i++) {
            let howToMake = req.body['howToMake'+i]
            if(howToMake)
            {
                howToMakes.push(howToMake)
            }
        }
        food.howToMakes = howToMakes

        let nutritions = []
        for (let i = 1; i <= Number(req.body['nutritionNumber']); i++) {
            let nutrition = req.body['nutrition'+i]
            if(nutrition)
            {
                nutritions.push(nutrition)
            }
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

        if(result.status == 200){
            if(result.status == 200){
                res.redirect('/admin/foods')
            }
        }
    } catch (error) {
        res.render('Food/create', {
            layout: 'layouts/main-layout',
            username: req.user.name,
        })
    }
}
const updateFoodPage = async (req, res, next) => {
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
            if(ingredient.name)
            {
                let items = []
                for (let j = 1; j <= Number(req.body['itemNumber'+i]); j++) {
                    let item = req.body['item'+i+j]
                    if(item)
                    {
                        items.push(item)
                    }
                }
                ingredient.items = items
                ingredients.push(ingredient)
            }
        }
        food.ingredients = ingredients;

        let howToMakes = []
        for (let i = 1; i <= Number(req.body['howToMakeNumber']); i++) {
            let howToMake = req.body['howToMake'+i]
            if(howToMake)
            {
                howToMakes.push(howToMake)
            }
        }
        food.howToMakes = howToMakes

        let nutritions = []
        for (let i = 1; i <= Number(req.body['nutritionNumber']); i++) {
            let nutrition = req.body['nutrition'+i]
            if(nutrition)
            {
                nutritions.push(nutrition)
            }
        }
        food.nutritions = nutritions

        let formData = new FormData();
        if(req.files)
        {
            req.files.files.forEach(file => {
                console.log(file.data)
                formData.append("files", Buffer.from(file.data))
            })
        }
        else
        {
            // await Promise.all(req.body.picture.map(async (path) => {
            //     const response = await axios(path, { responseType: 'arraybuffer' })
            //     const buffer = Buffer.from(response.data, 'binary').toString('base64')
            //     formData.append("files", Buffer.from(buffer, 'base64'))
            // }));

        }

        const headers = {
            "Content-Type": "multipart/form-data"
        }

        formData.append('food', JSON.stringify(food))
        const result = await axios.post(
                `/food/${req.params.foodId}/update`,
                formData, 
                headers
            );

        if(result.status == 200){
            res.redirect('/admin/foods')
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
const renderEditFoodPage = async (req, res, next) => {
    try {
        const foodId = req.params.foodId
        const food = await axios.get('/food/'+foodId)
        res.render('Food/create', {
            layout: 'layouts/main-layout',
            username: req.user.name,
            food: food.data,
            APP_HOST: process.env.APP_HOST
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
    renderCreateFoodPage,
    renderEditFoodPage,
    updateFoodPage
}