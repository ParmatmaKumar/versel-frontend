const User = require("../model/User");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const OTP = require("../model/OTP");
const JWT = require("jsonwebtoken");
require("dotenv").config();
const mailSender = require("../utils/mailSender");
const Profile = require("../model/Profile");


// sendOtp
exports.sendotp = async (req, res) => {

    try {

        // Fetch email from request ki body se
        const { email } = req.body;

        // check if email already exist
        const checkUserPresent = await User.findOne({ email });

        // if email already exist,then return response
        if (checkUserPresent) {
            return res.status(401).json({ message: "User already registered" });
        }

        // Generate OTP
        let otp = otpGenerator.generate(6, {
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false
        });

        console.log("OTP generated", otp);

        // check unique otp or not 
        let result = await OTP.findOne({ otp: otp });

        while (result) {
            otp = otpGenerator.generate(6, {
                lowerCaseAlphabets: false,
                upperCaseAlphabets: false,
                specialChars: false
            });
            result = await OTP.findOne({ otp: otp });
        }

        const otpPayload = { email, otp }
        // create an entry for OTP
        const otpBody = await OTP.create(otpPayload);

        console.log(otpBody);

        // return response successful

        res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            otp
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Error in sending OTP"
        });
    }
}


// SignUp
exports.signup = async (req, res) => {
    try {

        // data fetch from request body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp } = req.body;

        // validate krlo
        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            });
        }

        // 2 password match krlo
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and confirm password does not match"
            });
        }

        // check user already exist or not
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({
                success: false,
                message: "User already exist"
            })
        }

        // find most recent otp stored for the user
        const recentOtp = await OTP.findOne({ email }).sort({ createdAt: -1 });
        console.log(recentOtp);

        // validate otp
        if (!recentOtp) {
            // OTP not found
            return res.status(400).json({
                success: false,
                message: "OTP not found"
            });
        }
        if (otp !== recentOtp.otp) {
            // Invalid OTP
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Entry create in DB
        const profileDetails = await Profile.create({
            gender: null,
            dob: null,
            about: null,
            contactNumber: null
        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
            contactNumber,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/6.x/avataaars/svg?seed=${firstName} ${lastName}`
        });


        // response
        res.status(200).json({
            success: true,
            message: "User created successfully",
            user
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Error in creating user"
        });

    }
}


// Login
exports.login = async (req, res) => {
    try {
        // get data from req body
        const { email, password } = req.body;

        // validate krlo
        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            });
        }
        // check user exist or not
        const user = await User.findOne({ email }).populate("additionalDetails");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User is not resistered, please sign up first"
            });
        }

        // generate JWT, after password matching 
        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType
            }
            const token = JWT.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: "24h" }
            );

            user.token = token;
            user.password = undefined;

            // create cookie and send response
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "Login successful"
            })
        } else {
            return res.status(401).json({

                success: false,
                message: "Password Is Incrorrect"
            });
        }
    }


    catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "login failed, Please try again"
        });
    }

}

// Change Password - requires auth middleware
exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body;
        if (!oldPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ success: false, message: "New password and confirm password do not match" });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (!(await bcrypt.compare(oldPassword, user.password))) {
            return res.status(401).json({ success: false, message: "Incorrect old password" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(req.user.id, { password: hashedPassword });

        return res.status(200).json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        console.log("Error in changePassword:", error);
        return res.status(500).json({ success: false, message: "Something went wrong while changing password" });
    }
};


