import React, { useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import IconBtn from "../../../common/IconBtn"
import { buyCourse } from "../../../../services/operations/studentFeaturesAPI"
import { ACCOUNT_TYPE } from "../../../../utils/constants"

const RenderTotalAmount = () => {
  const { total, cart } = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleBuyCourse = useCallback(() => {
    // Not logged in
    if (!token) {
      navigate("/login")
      return
    }

    // Instructors cannot buy
    if (user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      return
    }

    // Get all course IDs from cart
    const courseIds = cart.map((course) => course._id)

    if (courseIds.length === 0) return

    buyCourse(token, courseIds, user, navigate, dispatch)
  }, [token, user, cart, navigate, dispatch])

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 sm:p-6 shadow-md w-full">
      
      {/* Title */}
      <p className="text-gray-400 text-sm uppercase tracking-wide">
        Total Amount
      </p>

      {/* Price */}
      <p className="text-2xl sm:text-3xl font-bold text-white mt-2">
        ₹ {total}
      </p>

      {/* Divider */}
      <div className="h-px bg-gray-700 my-5"></div>

      {/* Button */}
      <IconBtn
        text="Buy Now"
        onClick={handleBuyCourse}
        customClasses="w-full justify-center bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-3 rounded-lg transition-all duration-300"
      />
    </div>
  )
}

export default RenderTotalAmount
