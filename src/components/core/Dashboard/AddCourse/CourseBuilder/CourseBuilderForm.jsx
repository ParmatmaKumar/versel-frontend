import React from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn'
import { useState } from 'react'
import { MdAddCircleOutline } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { createSection, updateSection } from "../../../../../services/operations/courseDetailsAPI"
import { setCourse, setEditCourse, setStep } from "../../../../../slices/courseSlice"
import NestedView from "./NestedView"

const CourseBuilderForm = () => {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm()
    const dispatch = useDispatch();
    const { course } = useSelector((state) => state.course)
    const { token } = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(null);

    const onSubmit = async (data) => {
        setLoading(true);
        let result;

        if (editSectionName) {
            //we are eding the section name
            result = await updateSection(
                {
                    sectionName: data.sectionName,
                    sectionId: editSectionName,
                    courseId: course._id,
                }, token
            )
        } else {
            result = await createSection({
                sectionName: data.sectionName,
                courseId: course._id
            }, token)
        }
        //Update Values
        if (result) {
            dispatch(setCourse(result));
            setEditSectionName(null);
            setValue("sectionName", "");
        }
        // Loading flase
        setLoading(false);
    }

    const [editSectionName, setEditSectionName] = useState(null);
    const cancelEdit = () => {
        setEditSectionName(null);
        setValue("sectionName", "");
    }



    const goBack = () => {
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
    }

    const goToNext = () => {
        if (course?.courseContent?.length === 0) {
            toast.error("Please add atleast one Section");
            return;
        }

        if (course?.courseContent?.some((section) => section.subSection.length === 0)) {
            toast.error("Please add atleast one lecture in each section")
            return;
        }
        // if everthig is good 
        dispatch(setStep(3));
    }

    const handleChangeEditSectionName = (sectionId, sectionName) => {
        if (editSectionName === sectionId) {
            cancelEdit();
            return;
        }
        setEditSectionName(sectionId);
        setValue("sectionName", sectionName);
    }

    return (
        <div className="text-white space-y-6 bg-gray-900 p-6 rounded-md border border-gray-700 w-[600px] ">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-3xl font-semibold">Course Builder</p>
                    <p className="text-md text-gray-400">Add sections and lectures for your course.</p>
                </div>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="rounded-md bg-gray-900 border border-gray-700 p-6 space-y-5"
            >
                <div>
                    <label htmlFor='sectionName' className="text-sm text-gray-200">
                        Section Name <sup className="text-red-400">*</sup>
                    </label>
                    <input
                        id='sectionName'
                        placeholder='Add Section Name'
                        className="w-full mt-2 rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/60"
                        {...register("sectionName", { required: true })} />
                    {
                        errors.sectionName && (
                            <span className="mt-2 block text-xs text-red-400">Section Name is required</span>
                        )
                    }
                </div>
                <div className='mt-6 flex flex-wrap items-center gap-4'>
                    <IconBtn
                        type="submit"
                        text={editSectionName ? "Edit Section Name" : "Create Section"}
                    ><MdAddCircleOutline /></IconBtn>

                    {editSectionName && (
                        <button
                            type='button'
                            onClick={cancelEdit}
                            className='text-sm text-gray-300 underline underline-offset-4 hover:text-gray-100'
                        >
                            Cancel Edit
                        </button>
                    )}

                </div>
            </form>


            {course?.courseContent?.length > 0 && (
                <div className="rounded-md border border-gray-700 bg-gray-900 p-4">
                    <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
                </div>
            )}

            <div className="flex items-center justify-between">
                <button
                    onClick={goBack}
                    className="rounded-md border border-gray-600 px-4 py-2 text-sm text-gray-200 hover:bg-gray-800"
                >
                    Back
                </button>
                <IconBtn text="Next" onClick={goToNext} />
            </div>
        </div>
    )
}

export default CourseBuilderForm
