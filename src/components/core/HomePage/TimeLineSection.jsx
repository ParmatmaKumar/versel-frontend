import React from "react";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../../assets/Images/timelineImage.png"

const timeline = [{
    logo: Logo1,
    heading: "Leadership",
    subheading: "Full commitement to the success of company"
},
{
    logo: Logo2,
    heading: "Leadership",
    subheading: "Full commitement to the success of company"
},
{
    logo: Logo3,
    heading: "Leadership",
    subheading: "Full commitement to the success of company"
},
{
    logo: Logo4,
    heading: "Leadership",
    subheading: "Full commitement to the success of company"
}



]
const TimeLineSection = () => {
    return (
        <div className="flex items-center gap-15">
            {/* left part */}
            <div className="w-[45%] flex flex-col text-black gap-5">
                {
                    timeline.map((element, index) => {
                        return (
                            <div key={index}>
                                <div className="flex flex-row gap-6 "  >
                                    <div className="w-[50px] h-[50px] bg-blue-50 text-black rounded-full flex items-center justify-center">
                                        <img src={element.logo} alt="" />
                                    </div>

                                    <div>
                                        <h2 className="font-semibold text-[18px]">{element.heading}</h2>
                                        <p>{element.subheading}</p>
                                    </div>

                                </div>

                                <div className={`hidden ${timeline.length - 1 === index ? "hidden" : "lg:block"} h-12 border-dotted border-r border-gray-700 w-[26px] mt-2`}></div>

                            </div>
                        )
                    })
                }
            </div>
            {/* right part */}

            <div className="relative shadow-[10px_-5px_50px_-5px] shadow-blue-400">
                <img src={timelineImage} alt="timelineImage"
                    className="shadow-[20px_20px_rgba(230,255,255)] object-cover h-fit" />
            </div>
            <div className="absolute bg-green-900 w-[511px] h-[110px] flex flex-row text-white uppercase py-10 left-[50%] translate-y-[200%]">
                <div className="flex felx gap-5 items-center border-r border-green-400 px-7">
                    <p className="text-3xl font-bold">10</p>
                    <p className="text-green-300 text-sm">Years of Experience</p>
                </div>

                <div className="flex gap-5 items-center px-7">
                    <p className="text-3xl font-bold">250</p>
                    <p className="text-green-300 text-sm">type of Cources</p>
                </div>


            </div>

        </div>
    )
}

export default TimeLineSection;
