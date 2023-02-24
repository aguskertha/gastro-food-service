const Utilities = require('../../utils/utilities')
const axiosLib = require('axios')
const axios = axiosLib.create({baseURL: process.env.DJANGO_SERVER+"/api"});

const renderModelSiamesePage = async (req, res, next) => {
    try {
        res.render('ModelSiamese/model-siamese', {
            layout: 'layouts/main-layout',
            username: req.user.name,
            DJANGO_SERVER: process.env.DJANGO_SERVER
        })
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const uploadModelSiamese = async (req, res, next) => {
    try {
        const base64 = await Utilities.encodeSingleBase64(req,res,next)
        const splitted = req.files.files.name.split('.')
        const ext = splitted[1]
        if(ext != "h5"){
            throw "Invalid ext!"
        }
        result = await axios.post('/upload-model', {
            method: 'POST',
            base64: base64
        });

        if(result.status == 201){
            req.flash('success_msg', 'Uploaded successfully!');
            res.redirect('/admin/model-siamese')
        }

    } catch (error) {
        req.flash('error_msg', error.toString());
        res.redirect('/admin/model-siamese')
    }
}


module.exports = {
    renderModelSiamesePage,
    uploadModelSiamese
}