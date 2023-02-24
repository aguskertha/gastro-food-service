const Utilities = require('../../utils/utilities')
const axiosLib = require('axios')
const axios = axiosLib.create({baseURL: process.env.DJANGO_SERVER+"/api"});

const renderArchitecturePage = async (req, res, next) => {
    try {
        res.render('Architecture/architecture', {
            layout: 'layouts/main-layout',
            username: req.user.name,
            DJANGO_SERVER: process.env.DJANGO_SERVER
        })
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const uploadArchitecture = async (req, res, next) => {
    try {
        const base64 = await Utilities.encodeSingleBase64(req,res,next)

        const splitted = req.files.files.name.split('.')
        const ext = splitted[1]
        if(ext != "py"){
            throw "Invalid ext!"
        }
        
        result = await axios.post('/upload-architecture', {
            method: 'POST',
            base64: base64
        });

        if(result.status == 201){
            req.flash('success_msg', 'Uploaded successfully!');
            res.redirect('/admin/architecture')
        }

    } catch (error) {
        req.flash('error_msg', error.toString());
        res.redirect('/admin/architecture')
    }
}


module.exports = {
    renderArchitecturePage,
    uploadArchitecture
}