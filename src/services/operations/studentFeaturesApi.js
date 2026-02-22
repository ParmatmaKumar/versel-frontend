import toast from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";

const {
    COURSE_PAYMENT_API,
    COURSE_VERIFY_API,
    SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;

// ---------------------------------------------
// Load Razorpay Script
// ---------------------------------------------
function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
}

// ---------------------------------------------
// Buy Course Function
// ---------------------------------------------
export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
    const toastId = toast.loading("Loading...");

    try {
        // 1️⃣ Load Razorpay SDK
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if (!res) {
            toast.dismiss(toastId);
            toast.error("Razorpay SDK failed to load");
            return;
        }

        // 2️⃣ Create Order from Backend
        const orderResponse = await apiConnector(
            "POST",
            COURSE_PAYMENT_API,
            { courses },
            { Authorization: `Bearer ${token}` }
        );

        if (!orderResponse?.data?.data) {
            throw new Error("Order creation failed");
        }

        const { amount, currency, id: order_id } = orderResponse.data.data;

        // 3️⃣ Razorpay Options
        const options = {
            key: orderResponse?.data?.key || import.meta.env.VITE_RAZORPAY_KEY,
            currency,
            amount,
            order_id,
            name: "StudyNotion",
            description: "Thank you for purchasing the course",
            prefill: {
                name: `${userDetails.firstName} ${userDetails.lastName || ""}`.trim(),
                email: userDetails.email,
                contact: userDetails.contactNumber || "",
            },
            image: "https://res.cloudinary.com/dnglpqgux/image/upload/v1715676757/StudyNotion/Logos/Logo-Full-Dark_s8v0h5.png",
            handler: function (response) {
                // ✅ Dismiss loading toast here — payment is done
                toast.dismiss(toastId);

                // Send success email (non-blocking)
                sendPaymentSuccessEmail(response, amount, token);

                // Verify payment with backend
                verifyPayment({ ...response, courses }, token, navigate, dispatch);
            },
            modal: {
                // ✅ User closed the modal without paying
                ondismiss: function () {
                    toast.dismiss(toastId);
                    toast("Payment cancelled", { icon: "ℹ️" });
                },
            },
        };

        // 4️⃣ Open Razorpay Checkout
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

        paymentObject.on("payment.failed", function (response) {
            toast.dismiss(toastId);
            toast.error("Payment Failed");
            console.error("Payment Failed:", response.error);
        });

    } catch (error) {
        console.error("PAYMENT API ERROR:", error);
        toast.dismiss(toastId);
        toast.error("Could not initiate payment");
    }
}

// ---------------------------------------------
// Send Payment Success Email
// ---------------------------------------------
async function sendPaymentSuccessEmail(response, amount, token) {
    try {
        await apiConnector(
            "POST",
            SEND_PAYMENT_SUCCESS_EMAIL_API,
            {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                amount,
            },
            { Authorization: `Bearer ${token}` }
        );
    } catch (error) {
        // Non-fatal — don't show error to user
        console.error("PAYMENT SUCCESS EMAIL ERROR:", error);
    }
}

// ---------------------------------------------
// Verify Payment
// ---------------------------------------------
async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying payment...");
    dispatch(setPaymentLoading(true));

    try {
        const response = await apiConnector(
            "POST",
            COURSE_VERIFY_API,
            bodyData,
            { Authorization: `Bearer ${token}` }
        );

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success("Payment Successful! You are enrolled.");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());

    } catch (error) {
        console.error("PAYMENT VERIFY ERROR:", error);
        toast.error("Could not verify payment");
    }

    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}