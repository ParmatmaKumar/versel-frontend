import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import HighlightText from '../components/core/HomePage/HightlightText'
import CTAButton from '../components/core/HomePage/CTAButton'
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/core/HomePage/CodeBlock'
import TimeLineSection from '../components/core/HomePage/TimeLineSection'
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection'
import InstucationSection from '../components/core/HomePage/InstucationSection'
import Footer from '../components/common/Footer'
import ExploreMore from '../components/core/HomePage/ExploreMore'
import ReviewSlider from '../components/common/ReviewSlider'


const Home = () => {
    return (
        <div >
            {/* {Section 1} */}
            <div className='relative w-11/12 max-w-[1260px] mx-auto flex flex-col items-center text-white justify-between'>
                <Link to={"/signup"}>

                    <div className='group p-1 mx-auto mt-16 rounded-full bg-gray-800 text-gray-400 font-bold font-Inter transition-all duration-200 hover:scale-95 w-fit'>

                        <div className='flex items-center px-10 py-[7px] gap-2 transition-all duration-200 group-hover:bg-[#000814] rounded-full'>
                            <p>Become an Instructor</p>
                            <FaArrowRight />
                        </div>
                    </div>
                </Link>

                <div className='text-center text-4xl text font-semibold mt-7'>
                    Empower Your Future with
                    <HighlightText text={" Coding Skills"} />
                </div>

                <div className="w-[85%] text-center text-lg font-bold mt-5 text-gray-400  ">
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                </div>

                <div className='flex flex-row gap-7 mt-12'>
                    <CTAButton active={true} linkto={"/signup"}>
                        Learn More
                    </CTAButton>

                    <CTAButton
                        active={false}
                        linkto={"/login"}
                        className={"shadow- shadow-blue-400"}
                    >
                        Book a Demo
                    </CTAButton>

                </div>

                <div className="mx-3 my-16 shadow-[10px_-5px_50px_-5px] shadow-blue-400">

                    <video className='shadow-[20px_20px_rgba(255,255,255)]'
                        src={Banner}
                        muted
                        loop
                        autoPlay
                    >

                    </video>


                </div>


            </div>



            {/* {code Section 1} */}

            <div>
                <CodeBlocks
                    position={"lg:flex-row"}
                    heading={
                        <div className='text-4xl'>
                            Unlock your
                            <HighlightText text={" coding potential "} />
                            with our online courses
                        </div>
                    }
                    subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}

                    ctabtn1={
                        {
                            btnText: "Try it Yourself",
                            active: true, linkto: "/signup"
                        }
                    }

                    ctabtn2={
                        {
                            btnText: "learn more",
                            active: false,
                            linkto: "/login"
                        }
                    }

                    codeblock={`<!DOCTYPE html>
                        <html lang="en">
                        <head>
                        <title>This is myPage</title>
                        </head>
                        <body>
                        <h1>Hello, World!</h1>
                        <nav> 
                        <a href="one/">One</a>
                        </nav>
                        </body>
                        </html>`}

                    codeColor={"text-yellow-400"}
                    backgroundGradient={"bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 border-2 border-gray-700"}

                ></CodeBlocks>
            </div>

            {/* {code Section 2} */}
            <div >
                <CodeBlocks
                    position={"lg:flex-row-reverse"}
                    heading={
                        <div className='text-4xl'>
                            Start
                            <HighlightText text={" coding in "} />
                            <br />
                            <HighlightText text={" seconds "} />



                        </div>
                    }
                    subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."

                    }

                    ctabtn1={
                        {
                            btnText: "Continue Learning",
                            active: true, linkto: "/signup"
                        }
                    }

                    ctabtn2={
                        {
                            btnText: "learn more",
                            active: false,
                            linkto: "/login"
                        }
                    }

                    codeblock={`import React from "react";
                                import CTAButton from "./Button";
                                import TypeAnimation from "react-type";
                                import { FaArrowRight } from "react-icons/fa";
                                const Home = () => {
                                return (<div>Home</div>
                                )
                                }
                                export default Home; `}

                    codeColor={"text-gray-500"}
                    backgroundGradient={"bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900  border-2 border-gray-700"}

                ></CodeBlocks>
            </div>
           
           <div className='w-[1260px] flex flex-col text-center text-white mx-auto items-center'>
             <ExploreMore/>
           </div>


            {/* {Section 2} */}

            <div className='bg-white text-gray-500 '>
                <div className='homepage_bg h-80'>

                    <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-center mx-auto">
                        <div className='h-[220px]'></div>
                        <div className='flex flex-row gap-7 text-white'>
                            <CTAButton active={true} linkto={"/signup"}>
                                <div className='flex items-center gap-3'>
                                    Explore Full Catalog
                                    <FaArrowRight />
                                </div>

                            </CTAButton>

                            <CTAButton active={false} linkto={"/signup"}>
                                <div className='flex items-center gap-3'>
                                    Learn more
                                    <FaArrowRight />
                                </div>

                            </CTAButton>

                        </div>

                    </div>


                </div>

                <div className="mx-auto max-w-[1260px] max-w-maxContent flex flex-col items-center justify-between gap-7">

                    <div className='flex gap-5 mb-10 mt-[85px]'>
                        <div className='text-4xl font-semibold w-[45%] text-black'>Get the skill you need for a
                            <HighlightText text={" Job that is in demand "}></HighlightText>
                        </div>

                        <div className='flex flex-col gap-10 w-[40%] items-start '>
                            <div className='text-[16px] text-black '>
                                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            </div>
                            <CTAButton active={true} linkto={"/signup"}>
                                Learn More
                            </CTAButton>
                        </div>

                    </div>




                    <TimeLineSection />
                    <LearningLanguageSection/>

                </div>

                

            </div>

            {/* {Section 3} */}

            <div className='w-[1260px] flex flex-col items-center justify-between mx-auto gap-8 my-20 text-white '>

                 <InstucationSection />

                 <h2 className='text-center text-4xl font-semibold mt-10'>Review from Other Learners</h2>

                 <ReviewSlider/>

            </div>

            {/* FOOTER */}

            <Footer/>



        </div>
    )
}

export default Home