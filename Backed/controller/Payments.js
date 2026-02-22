const { instance } = require("../config/razorpay");
const Course = require("../model/Course");
const User = require("../model/User");
const mailSendeer = require("../utils/mailSender");
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");
const mongoose = require("mongoose");
const crypto = require("crypto");

// ---------------------------------------------
// Capture Payment / Create Razorpay Order
// ---------------------------------------------
exports.capturePayment = async (req, res) => {
    const { courses } = req.body;
    const userId = req.user.id;

    if (!courses || courses.length === 0) {
        return res.status(400).json({
            success: false,
            message: "CourseId is required",
        });
    }

    let totalAmount = 0;

    for (const course_id of courses) {
        try {
            const course = await Course.findById(course_id);

            if (!course) {
                return res.status(404).json({
                    success: false,
                    message: "Could not find the course",
                });
            }

            const uid = new mongoose.Types.ObjectId(userId);
            if (course.studentsEnrolled.includes(uid)) {
                return res.status(400).json({
                    success: false,
                    message: "User already enrolled in the course",
                });
            }

            totalAmount += course.price;
        } catch (error) {
            console.error("Error fetching course:", error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong while fetching course details",
            });
        }
    }

    const options = {
        currency: "INR",
        amount: totalAmount * 100,
        receipt: `receipt_${Date.now()}`,
    };

    try {
        const paymentResponse = await instance.orders.create(options);
        console.log("Razorpay Order Created:", paymentResponse);
        return res.status(200).json({
            success: true,
            message: "Order created successfully",
            key: process.env.RAZORPAY_KEY_ID,
            data: paymentResponse,
        });
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while creating order",
        });
    }
};

// ---------------------------------------------
// Verify Payment
// ---------------------------------------------
exports.verifyPayment = async (req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    console.log("verifyPayment called with:", {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        courses,
        userId,
    });

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId) {
        return res.status(400).json({ success: false, message: "Missing payment fields" });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

    console.log("Signature match:", expectedSignature === razorpay_signature);

    if (expectedSignature !== razorpay_signature) {
        return res.status(400).json({ success: false, message: "Payment signature invalid" });
    }

    try {
        await enrollStudents(courses, userId);
        return res.status(200).json({ success: true, message: "Payment Verified" });
    } catch (error) {
        console.error("ENROLL ERROR:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// ---------------------------------------------
// Enroll Students (internal helper)
// ---------------------------------------------
const enrollStudents = async (courses, userId) => {
    if (!courses || !userId) {
        throw new Error("Please provide data for courses or UserId");
    }

    for (const courseId of courses) {
        // 1. Add student to course
        const enrolledCourse = await Course.findOneAndUpdate(
            { _id: courseId },
            { $push: { studentsEnrolled: userId } },
            { new: true }
        );

        if (!enrolledCourse) {
            throw new Error(`Course not found: ${courseId}`);
        }

        // 2. Add course to student's profile
        const enrolledStudent = await User.findByIdAndUpdate(
            userId,
            { $push: { courses: courseId } },
            { new: true }
        );

        if (!enrolledStudent) {
            throw new Error(`User not found: ${userId}`);
        }

        // 3. Send enrollment email — non-fatal, won't break enrollment if it fails
        try {
            const emailResponse = await mailSendeer(
                enrolledStudent.email,
                `Congratulations! You are enrolled in: ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(enrolledCourse.courseName, enrolledStudent.firstName)
            );
            console.log("Enrollment email sent:", emailResponse.response);
        } catch (emailError) {
            console.error("Enrollment email failed (non-fatal):", emailError);
        }
    }
};

// ---------------------------------------------
// Send Payment Success Email
// ---------------------------------------------
exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body;
    const userId = req.user.id;

    if (!orderId || !paymentId || !amount) {
        return res.status(400).json({ success: false, message: "Please provide all the fields" });
    }

    try {
        const enrolledStudent = await User.findById(userId);

        if (!enrolledStudent) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const emailBody = `
            Hi ${enrolledStudent.firstName},

            We have received your payment of Rs ${amount / 100}.
            Order ID: ${orderId}
            Payment ID: ${paymentId}
            Thank you for purchasing from StudyNotion.`;

        await mailSendeer(enrolledStudent.email, "Payment Received", emailBody);

        return res.status(200).json({
            success: true,
            message: "Payment success email sent successfully",
        });
    } catch (error) {
        console.error("Error in sending payment success email:", error);
        return res.status(500).json({
            success: false,
            message: "Error in sending payment success email",
        });
    }
};