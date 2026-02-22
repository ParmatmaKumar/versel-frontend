const cloudinary = require('cloudinary').v2
require("dotenv").config();


exports.cloudnairyconnect= ()=>{
    try {
        cloudinary.config({
            cloud_name : process.env.CLOUD_NAME,
            api_key : process.env.CLOUD_API_KEY,
            api_secret : process.env.CLOUD_API_SECRET
        })
        console.log("DB connected");

        
    } catch (error) {
        console.log("error connecting CD"+error)
    }
}