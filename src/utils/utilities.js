const fs = require('fs');
const sharp = require('sharp');
const moment = require('moment');
const Storage = require('./storage-constant')
const {Base64} = require('js-base64');

const upload = async (req, res, next) => {
    try {
        if(req.files){
            fs.access("./public/picture/", (error) => {
                if (error) {
                    fs.mkdirSync("./public/picture/");
                }
            });
            const buffer = req.files.picture.data
            const originalname = req.files.picture.name
            const fileName = originalname.replace(/\s/g, '');
            const filterFileName = fileName.replace(/\.[^/.]+$/, "");
            const date = moment().format('YYYY-MM-DD-hh-mm-ss');
            const ref = date+'-'+filterFileName.toLowerCase()+'-'+Storage.PREFIX_FOOD+'.jpg';
            await sharp(buffer)
                .toFile("./public/"+Storage.PREFIX_PICTURE+"/" + ref);
            url = `/public/${Storage.PREFIX_PICTURE}/${ref}`;
            return url;
        }
        else{
            res.status(404).json({message: "File not found!"})
        }
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const encodeBase64 = async (req, res, next) => {
    try {
        if(req.files.picture){
            const buffer = req.files.picture.data
            return Base64.encode(buffer)
        }
        else
        {
            throw "Picture not found!"
        }
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}


module.exports = {
    upload,
    encodeBase64
}