import HighlightText from "../HomePage/HightlightText";
import CTAButton from "../HomePage/CTAButton";

const LearningGridArray = [
    {
        order: -1,
        heading: "World-Class Learning for",
        highlightText: "Anyone, Anywhere",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        BtnText: "Learn More",
        BtnLink: "/",
    },
    {
        order: 1,
        heading: "Curriculum Based on Industry Needs",
        description:
            "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
        order: 2,
        heading: "Our Learning Methods",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 3,
        heading: "Certification",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 4,
        heading: `Rating "Auto-grading"`,
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 5,
        heading: "Ready to Work",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
];

const LearningGrid = () => {
    return (
        <div className="grid mx-auto w-[350px] xl:w-fit grid-cols-1 xl:grid-cols-4 mb-12">
            {
                LearningGridArray.map((item, index) => {
                    return (
                        <div key={index} className={`${index === 0 && "lg:col-span-2"}
                        ${item.order % 2 === 1
                                ? "bg-gray-600 h-[294px]"
                                : item.order % 2 === 0
                                    ? "bg-gray-800 h-[294px]"
                                    : "bg-transparent"
                            }
                        ${item.order === 3 && "lg:col-start-2"
                            }`
                        }>
                            {
                                item.order < 0 ? (
                                    <div className="xl:w-[85%] flex flex-col gap-3 pb-10 xl:pb-0">
                                        <div className="text-4xl text-gray-100 font-bold">
                                            {item.heading}
                                            <span className="">
                                                {" "}
                                                <HighlightText text={item.highlightText} />
                                            </span>
                                        </div>
                                        <p className="text-[17px] text-gray-400 font-medium">
                                            {item.description}
                                        </p>
                                        <div className="w-fit mt-2">
                                            <CTAButton active={true} linkto={item.BtnLink}>
                                                {item.BtnText}
                                            </CTAButton>
                                        </div>
                                    </div>

                                ) : (
                                    <div className="p-8 flex flex-col gap-8">
                                        <h1 className="text-gray-100 text-lg font-semibold">{item.heading}</h1>
                                        <p className="text-gray-400 font-medium">
                                            {item.description}
                                        </p>
                                    </div>
                                )
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default LearningGrid;