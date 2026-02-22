import React from 'react'
import instructor from '../../../assets/Images/Instructor.png'
import HighlightText from './HightlightText'
import CTAButton from './CTAButton'
import { FaArrowRight } from 'react-icons/fa'
const InstucationSection = () => {
    return (
        <div className="w-full flex flex-row items-center justify-between mx-auto gap-10">
            <div className="w-[50%]">
                <img src={instructor} alt="Instructor" className="shadow-[-20px_-20px_rgba(255,255,255)]
 " />
            </div>

            <div className='w-[50%] flex flex-col mx-10 gap-6'>
                <div className='text-4xl font-semibold w-[50%]'>
                    Become an
                    <HighlightText text={" Instructor "} />
                </div>
                <p className='font-medium text-[16px] text-gray-500 w-[80%]'>
                    Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love
                </p>
                <div className='w-fit'>
                    <CTAButton active={true} linkto={"/signup"} >
                        <div className='flex gap-2 items-center'>
                            Start Teaching Today
                            <FaArrowRight />
                        </div>
                    </CTAButton>
                </div>
            </div>
        </div>
    )
}

export default InstucationSection 