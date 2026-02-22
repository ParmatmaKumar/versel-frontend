import HighlightText from "../HomePage/HightlightText"

const Quote = () => {
    return (
        <div className="text-4xl text-white font-bold text-center ">
            We are passionate about revolutionizing the way we learn. Our <br />innovative platform
            <HighlightText text={" combines technology"} />
            <span className="text-yellow-200">
               {" "} expertise
            </span>
            , and community to create an
            <span className="text-yellow-500">
                 {" "}unparalleled educational experience.
            </span>
        </div>
    )
}
export default Quote