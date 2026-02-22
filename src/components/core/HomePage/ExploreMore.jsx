import { HomePageExplore } from "../../../data/homepage-explore"
import HighlightText from "./HightlightText";
import { useState } from "react";
import CourseCard from "./CourseCard"


const tabsName = ["Free", "New to coding", "Most popular", "Skills paths", "Career paths"];




const ExploreMore = () => {
    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((courses) => courses.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }

    return (
        <div >
            <div className="text-4xl font-semibold">
                Unlock the
                <HighlightText text={" Power of Code"}></HighlightText>
            </div>
            <p className="font-semibold text-gray-400 text-center my-3 text-lg">Learn to Build Anything You Can Imagine</p>


            <div className="flex bg-gray-800 px-1 py-1 rounded-full gap-1.5 ">
                {
                    tabsName.map((element, index) => {
                        return (
                            <div className={`flex flex-row text-[16px] items-center gap-2
                            ${currentTab === element ?
                                    "bg-gray-950 text-gray-50 font-medium"
                                    : "text-gray-300"} rounded-full transition-all duration-200 cursor-pointer  hover:text-gray-100 px-7 py-2`} key={index}
                                onClick={() => setMyCards(element)}>
                                {element}
                            </div>
                        )
                    })
                }
            </div>

            <div className="h-[170px]"></div>

            {/* course card create karne hai */}

            <div className="lg:w-[1260px] lg:absolute justify-center flex lg:justify-between flex-wrap w-full lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[-45%] text-black  mb-7 lg:px-0 px-3">
                {courses.map((element) => (
                    <CourseCard
                        key={element.heading}
                        cardData={element}
                        currentCard={currentCard}
                        setCurrentCard={setCurrentCard}
                    />
                ))}
            </div>


        </div>
    )
}

export default ExploreMore