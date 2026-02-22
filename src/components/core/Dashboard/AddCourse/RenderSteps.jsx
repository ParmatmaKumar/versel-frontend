import React from 'react'
import { useSelector } from 'react-redux'
import { FaCheck } from 'react-icons/fa'
import CourseInformationForm from "./CourseInformation/CourseInformationForm"
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm"
import PublishCourse from "./PublishCourse/Index"
const RenderSteps = () => {
    const { step } = useSelector((state) => state.course)
    const steps = [
        {
            id: 1,
            title: "Course Information",
        },
        {
            id: 2,
            title: "Course Builder",
        },
        {
            id: 3,
            title: "Publish",
        }
    ]

    return (
        <div>
            <div className='flex flex-col items-center justify-center '>
                <div className="flex items-center">
                    {steps.map((item, index) => (
                        <div key={index} className="flex items-center">

                            {/* Step circle */}
                            <div
                                className={`w-8 h-8 flex items-center justify-center rounded-full border
                                ${step === item.id
                                        ? "bg-yellow-800/50 border-yellow-200 text-yellow-100"
                                        : "bg-gray-900 border-gray-700 text-gray-400"
                                    }`}
                            >
                                {step > item.id ? <FaCheck className='text-yellow-300' /> : item.id}
                            </div>

                            {/* Dashed connector */}
                            {index !== steps.length - 1 && (
                                <div className="w-42 border-t-2 border-dashed border-gray-600 mx-2" />
                            )}
                        </div>
                    ))}
                </div>



                <div className='text-white flex flex-row gap-30 mb-10'>
                    {
                        steps.map((item) => (
                            <div key={item.id}>
                                <p>{item.title}</p>
                            </div>
                        ))
                    }
                </div>

                {
                    step === 1 && <CourseInformationForm />
                }
                {
                    step === 2 && <CourseBuilderForm />
                }
                {
                    step === 3 && <PublishCourse />
                }

            </div>
        </div>
    )
}

export default RenderSteps