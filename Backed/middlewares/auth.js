const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../model/User");

//auth
exports.auth = async (req, res, next) => {
    try {
        //extract token
        console.log("=== AUTH MIDDLEWARE DEBUG ===");
        console.log("Cookies:", req.cookies);
        console.log("Body token:", req.body ? req.body.token : "No Body");
        console.log("Cookies present:", !!req.cookies);
        console.log("Body present:", !!req.body);
        console.log("Authorization header:", req.header("Authorization"));

        const token = (req.header("Authorization") ? req.header("Authorization").replace("Bearer ", "") : null)
            || (req.cookies && req.cookies.token)
            || (req.body && req.body.token);

        if (!token) {
            console.log("❌ Returning 401 - TOKEN_MISSING");
            return res.status(401).json({
                success: false,
                message: 'AUTH_TOKEN_MISSING_IN_REQUEST',
            });
        }

        //verify the token
        try {
            if (!process.env.JWT_SECRET) {
                console.log("❌ JWT_SECRET is missing from process.env!");
                throw new Error("SERVER_CONFIG_ERROR_JWT_SECRET_MISSING");
            }
            console.log("Verifying token with secret:", process.env.JWT_SECRET.substring(0, 1) + "***");
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Token decoded successfully:", decode.email);
            req.user = decode;
        }
        catch (error) {
            //verification - issue
            console.log("❌ JWT Verification failed:", error.message);
            return res.status(401).json({
                success: false,
                message: `TOKEN_VERIFICATION_FAILED: ${error.message}`,
            });
        }
        next();
    }
    catch (error) {
        console.log("❌ Unexpected error in auth middleware:", error);
        return res.status(401).json({
            success: false,
            message: `AUTH_MIDDLEWARE_UNEXPECTED_ERROR: ${error.message}`,
        });
    }
}

//isStudent
exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Student") {
            return res.status(401).json({
                success: false,
                message: 'This is a protected route for Students only',
            });
        }
        next();
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'User role cannot be verified, please try again'
        })
    }
}


//isInstructor
exports.isInstructor = async (req, res, next) => {
    try {
        console.log("=== isInstructor MIDDLEWARE ===");
        console.log("User object:", req.user);
        console.log("Account Type:", req.user?.accountType);

        if (req.user.accountType !== "Instructor") {
            console.log("❌ Role check failed. Required: Instructor, Found:", req.user?.accountType);
            return res.status(401).json({
                success: false,
                message: `ROLE_CHECK_FAILED: Expected Instructor, but found ${req.user?.accountType}`,
            });
        }
        console.log("✅ Instructor check passed");
        next();
    }
    catch (error) {
        console.log("❌ Error in isInstructor middleware:", error);
        return res.status(500).json({
            success: false,
            message: `ROLE_VERIFICATION_ERROR: ${error.message}`
        })
    }
}


//isAdmin
exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: 'This is a protected route for Admin only',
            });
        }
        next();
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'User role cannot be verified, please try again'
        })
    }
}