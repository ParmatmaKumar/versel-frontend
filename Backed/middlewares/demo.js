//check if demo user
exports.isDemo = async (req, res, next) => {
    // console.log("=== isDemo MIDDLEWARE ===");
    // console.log("User email:", req.user.email);


    if (process.env.DEMO_EMAIL && req.user.email === process.env.DEMO_EMAIL) {
        console.log("❌ Demo user detected - blocking action");
        return res.status(401).json({
            success: false,
            message: "This is a Demo User",
        });
    }
    console.log("✅ Not a demo user - proceeding");
    next();
}