import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"
import { RxCross1 } from "react-icons/rx"

import IconBtn from "../../../../common/IconBtn"
import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operations/courseDetailsAPI"
import { setCourse } from "../../../../../slices/courseSlice"

const SubSectionModal = ({
  modalData,
  setModalData,
  add = false,
  edit = false,
  view = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm()

  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData?.title || "")
      setValue("lectureDescription", modalData?.description || "")
    }
  }, [edit, modalData, setValue, view])

  const closeModal = () => {
    if (!loading) {
      setModalData(null)
    }
  }

  const isFormUpdated = () => {
    const currentValues = getValues()
    return (
      currentValues.lectureTitle !== (modalData?.title || "") ||
      currentValues.lectureDescription !== (modalData?.description || "") ||
      (currentValues.lectureVideo && currentValues.lectureVideo.length > 0)
    )
  }

  const handleEditSubSection = async () => {
    const currentValues = getValues()
    const formData = new FormData()
    formData.append("sectionId", modalData.sectionId)
    formData.append("subSectionId", modalData._id)

    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle)
    }
    if (currentValues.lectureDescription !== modalData.description) {
      formData.append("description", currentValues.lectureDescription)
    }
    if (currentValues.lectureVideo?.[0]) {
      formData.append("videoFile", currentValues.lectureVideo[0])
    }

    setLoading(true)
    const result = await updateSubSection(formData, token)
    if (result) {
      // update the structure of course
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData.sectionId ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setLoading(false)
    closeModal()
  }

  const onSubmit = async (data) => {
    if (view) return

    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No changes made to the lecture")
        return
      }
      await handleEditSubSection()
      return
    }

    if (add) {
      const formData = new FormData()
      formData.append("sectionId", modalData)
      formData.append("title", data.lectureTitle)
      formData.append("description", data.lectureDescription)
      formData.append("videoFile", data.lectureVideo[0])

      setLoading(true)
      const result = await createSubSection(formData, token)
      if (result) {
        // update the structure of course
        const updatedCourseContent = course.courseContent.map((section) =>
          section._id === modalData ? result : section
        )
        const updatedCourse = { ...course, courseContent: updatedCourseContent }
        dispatch(setCourse(updatedCourse))
      }
      setLoading(false)
      closeModal()
    }
  }

  const modeText = view ? "Viewing" : add ? "Adding" : "Editing"

  return (
    <div className="fixed inset-0 z-1000 grid place-items-center overflow-auto bg-gray-500/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-3xl rounded-md border-2 border-gray-600 bg-gray-800 shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-500 bg-gray-700 px-6 py-4">
          <p className="text-lg font-semibold text-gray-100">
            {modeText} Lecture
          </p>
          <button
            type="button"
            onClick={closeModal}
            className="rounded-md p-2 text-gray-100 transition hover:bg-gray-700 cursor-pointer"
          >
            <RxCross1 />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 px-6 py-5">
          <div>
            <label
              htmlFor="lectureVideo"
              className="mb-2 block text-sm font-medium text-gray-100"
            >
              Lecture Video {!view && <sup className="text-pink-300">*</sup>}
            </label>

            {!view && (
              <label
                htmlFor="lectureVideo"
                className="flex flex-col items-center justify-center w-full h-48
                 border-2 border-dashed border-gray-600
                 rounded-lg cursor-pointer
                 bg-gray-700 hover:bg-gray-600 transition"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                  <svg
                    className="w-10 h-10 mb-3 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 15a4 4 0 014-4h1m4 0h1a4 4 0 110 8h-1m-4 0H7a4 4 0 01-4-4m9-4v8m0 0l-3-3m3 3l3-3"
                    />
                  </svg>

                  <p className="mb-2 text-sm text-gray-300">
                    <span className="font-semibold text-yellow-400">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-400">
                    MP4, MOV, or WebM (Max 100MB)
                  </p>
                </div>

                <input
                  id="lectureVideo"
                  type="file"
                  accept="video/*"
                  className="hidden"
                  {...register("lectureVideo", { required: add })}
                />
              </label>
            )}

            {view && modalData?.videoUrl && (
              <a
                href={modalData.videoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-yellow-200 underline underline-offset-2"
              >
                Open current video
              </a>
            )}

            {errors.lectureVideo && (
              <span className="mt-1 block text-xs text-pink-300">
                Lecture video is required
              </span>
            )}
          </div>


          <div>
            <label
              htmlFor="lectureTitle"
              className="mb-2 block text-sm font-medium text-gray-100"
            >
              Lecture Title <sup className="text-pink-300">*</sup>
            </label>
            <input
              id="lectureTitle"
              placeholder="Enter lecture title"
              disabled={view}
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-gray-100 placeholder:text-gray-300 focus:outline-none"
              {...register("lectureTitle", { required: true })}
            />
            {errors.lectureTitle && (
              <span className="mt-1 block text-xs text-pink-300">
                Lecture title is required
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="lectureDescription"
              className="mb-2 block text-sm font-medium text-richblack-25"
            >
              Lecture Description <sup className="text-pink-300">*</sup>
            </label>
            <textarea
              id="lectureDescription"
              rows={6}
              placeholder="Enter lecture description"
              disabled={view}
              className="w-full min-h-[130px] rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-gray-100 placeholder:text-gray-300 focus:outline-none"
              {...register("lectureDescription", { required: true })}
            />
            {errors.lectureDescription && (
              <span className="mt-1 block text-xs text-pink-300">
                Lecture description is required
              </span>
            )}
          </div>

          {!view && (
            <div className="flex justify-end pt-2">
              <IconBtn
                type="submit"
                disabled={loading}
                text={loading ? "Saving..." : edit ? "Save Changes" : "Save"}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default SubSectionModal
