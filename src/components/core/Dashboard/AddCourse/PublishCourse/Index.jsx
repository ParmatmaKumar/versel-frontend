import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import IconBtn from "../../../../common/IconBtn"
import { resetCourseState, setStep } from "../../../../../slices/courseSlice"
import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI"
import { COURSE_STATUS } from "../../../../../utils/constants"

const PublishCourse = () => {
    const { register, handleSubmit, setValue, getValues } = useForm()
    const { course } = useSelector((state) => state.course)
    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (course?.status === COURSE_STATUS.PUBLISHED) {
            setValue("public", true)
        }
    }, [course?.status, setValue])

    const goToCourse = () => {
        dispatch(resetCourseState())
        navigate("/dashboard/my-courses")
    }

    const handleCoursePublish = async () => {
        if (course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true || (course.status === COURSE_STATUS.DRAFT && getValues("public") === false)) {
            //no need to update
            //no need to make api call
            goToCourse();
            return;
        }
        //if form is Updaed 
        const formData = new FormData();
        formData.append("courseId", course._id);
        const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
        formData.append("status", courseStatus);

        setLoading(true);
        const result = await editCourseDetails(formData, token);
        if (result) {
            goToCourse();
        }
        setLoading(false);

    }
    const onSubmit = () => {
        handleCoursePublish();
    }

    const goBack = () => {
        dispatch(setStep(2));
    }
    return (
        <div className="max-w-2xl mx-auto bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-lg text-gray-100">

            <h2 className="text-2xl font-semibold mb-6">
                Publish Course
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                {/* Publish Toggle */}
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                    <label
                        htmlFor="public"
                        className="flex items-center gap-4 cursor-pointer"
                    >
                        <input
                            type="checkbox"
                            id="public"
                            {...register("public")}
                            className="h-5 w-5 rounded border-gray-600 bg-gray-700 text-green-500 focus:ring-green-500 focus:ring-2"
                        />

                        <div>
                            <p className="font-medium text-gray-200">
                                Make this course Public
                            </p>
                            <p className="text-sm text-gray-400">
                                Students will be able to view and purchase your course.
                            </p>
                        </div>
                    </label>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-800">

                    <button
                        type="button"
                        onClick={goBack}
                        disabled={loading}
                        className="px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition disabled:opacity-50"
                    >
                        Back
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-500 transition font-medium disabled:opacity-50 flex items-center gap-2"
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>

                </div>

            </form>
        </div>
    )

}

export default PublishCourse