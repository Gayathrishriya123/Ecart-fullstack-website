const cloudinary = require('cloudinary').v2;
const multer=require('multer');
require('dotenv').config()
 
const fs=require("fs")
 
//creating uploads folder if not already present
//in "uploads" folder we will temporarily upload
//image before uploadingto clodinary
 
if(!fs.existsSync("./uploads")){
    fs.mkdirSync("./uploads");
}
 
//cloudinary config
cloudinary.config({
    cloud_name:'djp5owlfm',
    api_key:248188142742713,
    api_secret:'Ax8UvXEkSpNmgG1aPziWcTyak4A'
})
 
//multer config
const localstorage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./uploads");
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    },
});
 
const upload = multer({storage:localstorage});
module.exports={upload,cloudinary};