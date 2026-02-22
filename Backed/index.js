const express = require('express');
const app = express();

const userRouter = require('./router/User');
const profileRouter = require('./router/Profile');
const paymentsRouter = require('./router/Payments');
const courseRouter = require('./router/Course');

const { connectDB } = require("./config/database");
const cookieParser = require('cookie-parser');
require("dotenv").config()
const {cloudnairyconnect} = require('./config/cloudinary');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const PORT= process.env.PORT || 4000;

// Database connection
connectDB();


// Middleware to parse JSON requests
app.use(express.json());
app.use(cookieParser());

// Allow specific front-end origins (Vite dev server + CRA)
const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// Cloudinary configuration
cloudnairyconnect();

app.use('/api/v1/auth', userRouter);
app.use('/api/v1/profile', profileRouter);
app.use('/api/v1/payments', paymentsRouter);
app.use('/api/v1/course', courseRouter);

// defult route
app.get('/', (req, res) => {
    res.send('Welcome to the Mega Project Backend API');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});