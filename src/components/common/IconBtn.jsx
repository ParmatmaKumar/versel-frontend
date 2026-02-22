const IconBtn = ({ text, onClick, children, disabled = false, outline = false, customClasses = "", type = "button" }) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            type={type}
            className={`px-3 py-2 rounded ${outline ? "border" : "bg-yellow-400 text-black cursor-pointer flex items-center "} ${customClasses}`}
        >
            {children ? (
                <>
                    <span className="mr-2">{text}</span>
                    {children}
                </>
            ) : (
                <span>{text}</span>
            )}
        </button>
    )
}

export default IconBtn