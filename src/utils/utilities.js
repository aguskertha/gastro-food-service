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
const uploadMultiple = async (req, res, next) => {
    try {
        if(req.files){
            fs.access("./public/picture/", (error) => {
                if (error) {
                    fs.mkdirSync("./public/picture/");
                }
            });
            images = req.files.files
            datas = []
            await Promise.all(images.map(async (image) => {
                const buffer = image.data
                const originalname = image.name
                const fileName = originalname.replace(/\s/g, '');
                const filterFileName = fileName.replace(/\.[^/.]+$/, "");
                const date = moment().format('YYYY-MM-DD-hh-mm-ss');
                const ref = date+'-'+filterFileName.toLowerCase()+'-'+Storage.PREFIX_FOOD+'.jpg';
                await sharp(buffer)
                    .toFile("./public/"+Storage.PREFIX_PICTURE+"/" + ref);
                url = `/public/${Storage.PREFIX_PICTURE}/${ref}`;
                datas.push(url)
            }));
            return datas
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
        if(req.files.files){
            datas = []
            images = req.files.files
            await Promise.all(images.map(async (image) => {
                const buffer = image.data
                datas.push(Base64.encode(buffer))
            }));
            return datas
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
    encodeBase64,
    uploadMultiple
}