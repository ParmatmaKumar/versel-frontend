const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
    gender:{
        type:String,
    },
    contactNumber:{
        type:String,
    },
    dob:{
        type:String,
    },
    about:{
        type:String,
    },
    // address:{
    //     type:String,
    // },
    // city:{
    //     type:String,
    // },
    // state:{
    //     type:String,
    // },
    // country:{
    //     type:String,
    // },
    // pincode:{
    //     type:String,
    // }
})




module.exports = mongoose.model("Profile",profileSchema);
    