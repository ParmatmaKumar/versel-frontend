import React from 'react'
import RenderSteps from "./RenderSteps"

export default function AddCourse() {
  return (
    <div>
        <div className='flex items-start gap-5'>
            <h1>
                Add Course
            </h1>
            <div>
                <RenderSteps/>
            </div>
            <div className='w-[390px] h-[360px] text-white bg-[#161D29] p-6 rounded-md '>
                <p>⚡ Code Upload Tips</p>
                <ul className="mt-3 list-disc list-outside pl-5 space-y-2 text-sm text-gray-300">

                    <li>Set the Course Price option or make it free.</li>
                    <li>Standard size for the course thumbnail is 1024x576.</li>
                    <li>Video section controls the course overview video.</li>
                    <li>Course Builder is where you create & organize a course.</li>
                    <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                    <li>Information from the Additional Data section shows up on the course single page.</li>
                    <li>Make Announcements to notify any important</li>
                    <li>Notes to all enrolled students at once.</li>
                </ul>
            </div>
        </div>
    </div>
  )
}

