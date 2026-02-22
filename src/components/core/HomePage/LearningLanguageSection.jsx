import HighlightText from "./HightlightText"
import know_you_progress from  "../../../assets/Images/Know_your_progress.png"
import compare_with_others from "../../../assets/Images/Compare_with_others.png"
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from "./CTAButton"

const LearningLanguageSection = () =>{
    return( 
        <div className="my-20 flex flex-col gap-14">
            <div className=" flex flex-col gap-1 text-black items-center">
                <div className="text-4xl font-semibold text-center ">
                    Your Swiss Knife for 
                    <HighlightText text={" Learning any Language"}/>
                </div>

                <div className="text-center mx-auto text-base font-medium w-[70%]">
                    Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                </div>


                <div className='flex flex-row items-center justify-center '>

                    <img src={know_you_progress} alt="" className="object-contain -mr-32"/>

                    <img src={compare_with_others } alt="" className="object-contain"/>

                    <img src={plan_your_lesson} alt="" className="object-contain -ml-36"/>

                </div>

                <div className="w-fit ">
                    <CTAButton active={true} linkto={"/signup"}> 
                        Learn More
                    </CTAButton>
                </div>
            
            </div>
        </div>
    )
}

export default LearningLanguageSection;