import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RxDropdownMenu } from "react-icons/rx"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { AiOutlinePlus } from "react-icons/ai"
import { MdOutlineArrowDropDown } from "react-icons/md"

import ConfirmationModal from "../../../../common/ConfirmationModal"
import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/courseDetailsAPI"
import { setCourse } from "../../../../../slices/courseSlice"
import SubSectionModal from "./SubSectionModal"

const NestedView = ({ handleChangeEditSectionName }) => {
  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [addSubSection, setAddSubSection] = useState(null)
  const [viewSubSection, setViewSubSection] = useState(null)
  const [editSubSection, setEditSubSection] = useState(null)
  const [confirmationModel, setConfirmationModel] = useState(null)

  const handleDeleteSection = async (sectionId) => {
    const result = await deleteSection({ sectionId, courseId: course._id }, token)
    if (result) dispatch(setCourse(result))
    setConfirmationModel(null)
  }

  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection({ subSectionId, sectionId }, token)
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setConfirmationModel(null)
  }

  return (
    <div className="w-full">
      <div>
        {course?.courseContent?.map((section) => (
          <details
            key={section._id}
            open
            className="group transition-all duration-300 flex flex-col "
          >
            <summary className="flex w-full list-none cursor-pointer items-center justify-between gap-5 py-3">
              <div className="flex w-full items-center gap-3">
                <RxDropdownMenu className="text-2xl text-gray-400 transition-transform group-open:rotate-90" />
                <p className="min-w-90 font-semibold tracking-wide text-gray-400">
                  {section.sectionName}
                </p>
              </div>

              <div className="flex w-full items-center">
                <button
                  onClick={() =>
                    handleChangeEditSectionName(section._id, section.sectionName)
                  }
                  className="rounded-lg p-2 transition hover:bg-gray-700"
                >
                  <MdEdit className="text-lg text-blue-300" />
                </button>

                <button
                  onClick={() =>
                    setConfirmationModel({
                      text1: "Delete this Section?",
                      text2: "All the lectures in this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDeleteSection(section._id, course._id),
                      btn2Handler: () => setConfirmationModel(null),
                    })
                  }
                  className="rounded-lg p-2 transition hover:bg-red-500/20"
                >
                  <RiDeleteBin6Line className="text-lg text-gray-400" />
                </button>

                <div className="text-gray-400">|</div>

                <button className="text-2xl text-gray-400 transition-transform group-open:rotate-90 cursor-pointer">
                  <MdOutlineArrowDropDown />
                </button>

              </div>
            </summary>

            <div className="w-full space-y-2 px-5 pb-4">
              {(section.subSection ?? []).map((data) => (
                <div
                  key={data._id}
                  className="flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 transition border border-gray-500 bg-gray-800"
                >
                  <div onClick={() => setViewSubSection(data)} className="flex items-center gap-3">
                    <RxDropdownMenu className="text-xl text-gray-300" />
                    <p className="font-medium text-gray-100">{data.title}</p>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setEditSubSection({ ...data, sectionId: section._id })
                      }}
                      className="rounded-md p-2 transition hover:bg-gray-700"
                    >
                      <MdEdit className="text-base text-blue-300" />
                    </button>

                    <button
                      onClick={() =>
                        setConfirmationModel({
                          text1: "Delete this SubSection?",
                          text2: "All the lectures in this subSection will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                          btn2Handler: () => setConfirmationModel(null),
                        })
                      }
                      className="rounded-lg p-3 transition hover:bg-red-500/20"
                    >
                      <RiDeleteBin6Line className="text-lg text-gray-400" />
                    </button>
                  </div>
                </div>
              ))}

              {(!section.subSection || section.subSection.length === 0) && (
                <p className="px-2 py-3 text-sm italic text-gray-400">
                  No lectures yet. Click "Add Lecture" to create one.
                </p>
              )}
            </div>

            <button
                onClick={() => setAddSubSection(section._id)}
                className="flex items-center gap-1 rounded-lg bg-yellow-400/10 px-3 py-1.5 text-sm font-medium text-yellow-300 transition hover:bg-yellow-400/20"
              >
                <AiOutlinePlus /> Add Lecture
              </button>
          </details>
        ))}
      </div>

      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : (
        <div></div>
      )}

      {confirmationModel ? (
        <ConfirmationModal modalData={confirmationModel} />
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default NestedView
