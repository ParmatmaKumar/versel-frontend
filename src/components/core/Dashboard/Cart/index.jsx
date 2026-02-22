import { useSelector } from "react-redux"
import RenderTotalAmount from "./RenderTotalAmount"
import RenderCartCourses from "./RenderCartCourses"

export default function Cart() {
    const { total, totalItems } = useSelector((state) => state.cart)

    return (
        <div className="min-h-screen bg-gray-900 text-white px-4 sm:px-6 md:px-10 lg:px-20 py-10">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                    Your Cart
                </h1>
                <p className="text-gray-400 mt-2 text-sm sm:text-base">
                    {totalItems} {totalItems === 1 ? "Course" : "Courses"} in Cart
                </p>
            </div>

            {/* Cart Content */}
            {total > 0 ? (
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Courses Section */}
                    <div className="flex-1 bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg border border-gray-700">
                        <RenderCartCourses />
                    </div>

                    {/* Total Amount Section */}
                    <div className="w-full lg:w-[350px] bg-gray-800 p-4 sm:p-6 rounded-xl shadow-lg border border-gray-700 h-fit">
                        <RenderTotalAmount />
                    </div>

                </div>
            ) : (
                <div className="flex items-center justify-center h-40 bg-gray-800 rounded-xl border border-gray-700">
                    <p className="text-gray-400 text-lg">
                        Your Cart is Empty
                    </p>
                </div>
            )}
        </div>
    )
}
