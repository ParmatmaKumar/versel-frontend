import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import CountryCode from "../../data/countrycode.json"
import { apiConnector } from "../../services/apiconnector"
import { contactusEndpoint } from "../../services/apis"

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm()

  const submitContactForm = async (data) => {
    // console.log("Form Data - ", data)
    try {
      setLoading(true)
      const res = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data
      )
      // console.log("Email Res - ", res)
      setLoading(false)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      })
    }
  }, [reset, isSubmitSuccessful])

  return (
    <form
      className="flex flex-col gap-7 text-gray-100 w-full mt-4"
      onSubmit={handleSubmit(submitContactForm)}
    >
      <div className="flex flex-col gap-5 lg:flex-row ">
        {/* firstName */}
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="firstname">
            <p className="mb-1 text-[0.875rem] leading-5.5 text-gray-100">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Enter first name"
              style={{ boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)" }}
              className="w-full rounded-lg bg-gray-800 p-3 text-gray-100"
              {...register("firstname", { required: true })}
            />
          </label>
          {errors.firstname && (
            <span className="mt-1 text-xs text-pink-200">
              Please enter your name.
            </span>
          )}
        </div>
        {/* lastName */}
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="lastname">
            <p className="mb-1 text-[0.875rem] leading-5.5 text-gray-100">
              Last Name
            </p>
            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Enter last name"
              style={{ boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)" }}
              className="w-full rounded-lg bg-gray-800 p-3 text-gray-100"
              {...register("lastname")}
            />
          </label>
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email">
          <p className="mb-1 text-[0.875rem] leading-5.5 text-gray-100">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email address"
            style={{ boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)" }}
            className="w-full rounded-lg bg-gray-800 p-3 text-gray-100"
            {...register("email", { required: true })}
          />
        </label>
        {errors.email && (
          <span className="mt-1 text-xs text-pink-200">
            Please enter your Email address.
          </span>
        )}
      </div>

      {/* Phone Number */}
      <div className="flex flex-col gap-2">
        <label htmlFor="phonenumber">
          <p className="mb-1 text-[0.875rem] leading-5.5 text-gray-100">
            Phone Number
          </p>
          <div className="flex gap-5">
            {/* Dropdown */}
            <div className="flex w-[85px] flex-col gap-2 ">
              <select
                name="countrycode"
                id="countrycode"
                className="w-full rounded-lg bg-gray-800 p-3  text-gray-100"
                style={{ boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)" }}
                {...register("countrycode", { required: true })}
              >
                {CountryCode.map((ele, i) => {
                  return (
                    <option key={i} value={ele.code}>
                      {ele.code} -{ele.country}
                    </option>
                  )
                })}
              </select>
            </div>
            {/* Phone Number Input field */}
            <div className="flex w-[calc(100%-90px)] flex-col gap-2">
              <input
                type="number"
                name="phonenumber"
                id="phonenumber"
                placeholder="1234567890"
                style={{ boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)" }}
                className="w-full rounded-lg bg-gray-800 p-3 text-gray-100"
                {...register("phoneNo", {
                  required: {
                    value: true,
                    message: "Please enter your Phone Number.",
                  },
                  maxLength: { value: 12, message: "Invalid Phone Number" },
                  minLength: { value: 10, message: "Invalid Phone Number" },
                })}
              />
            </div>
          </div>
        </label>

        {errors.phoneNo && (
          <span className="mt-1 text-xs text-pink-200">
            {errors.phoneNo.message}
          </span>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message">
          <p className="mb-1 text-[0.875rem] leading-5.5 text-gray-100">
            Message <sup className="text-pink-200">*</sup>
          </p>
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="6"
            placeholder="Enter your message here"
            style={{ boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)" }}
            className="w-full rounded-lg bg-gray-800 p-3 text-gray-100"
            {...register("message", { required: true })}
          />
        </label>

        {errors.message && (
          <span className="mt-1 text-xs text-pink-200">
            Please enter your Message.
          </span>
        )}
      </div>

      <button
        disabled={loading}
        type="submit"
        className={`rounded-lg bg-yellow-500 py-2 px-3 font-medium text-gray-900
         ${
           !loading &&
           "transition-all duration-200 hover:scale-95 hover:shadow-none"
         }  disabled:bg-gray-500 sm:text-[16px] `}
      >
        Send Message
      </button>
    </form>
  )
}

export default ContactUsForm