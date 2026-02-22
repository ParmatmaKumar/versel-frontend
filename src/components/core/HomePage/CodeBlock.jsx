import React from "react";
import CTAButton from "./CTAButton";
import HighlightText from './HightlightText'
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";


const CodeBlocks = ({
    position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor
}) => {
    return (
        <div className={`flex ${position} my-30 justify-between gap-20 w-11/12 max-w-[1260px] mx-auto items-center`}>
            {/* section1 */}
            <div className="w-[50%] flex flex-col text-white font-semibold ">
                {heading}
                <div className="text-gray-400 mt-5 text-[18px] font-bold">
                    {subheading}
                </div>

                <div className="flex gap-7 mt-14">
                    <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                        <div className="flex gap-2 items-center">
                            {ctabtn1.btnText}
                            <FaArrowRight />
                        </div>
                    </CTAButton>

                    <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                        {ctabtn2.btnText}
                    </CTAButton>

                </div>
            </div>

            {/* section2 */}
            <div className={`flex flex-row py-4 w-[37%] text-[14px] ${backgroundGradient}`}  >

                <div className="text-center flex flex-col w-[10%] text-gray-500 font-bold ">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                    <p>12</p>


                </div>

                <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono  ${codeColor} pr-2`}>
                    <TypeAnimation sequence={[codeblock, 200, " "]}
                        repeat={Infinity}
                        style={{ whiteSpace: "pre-line", display: "block" }}
                        omitDeletionAnimation={true}
                    />
                </div>

            </div>
        </div>
    )
}
export default CodeBlocks;
