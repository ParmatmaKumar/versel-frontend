import IconBtn from "./IconBtn"

const ConfirmationModal = ({ modalData }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="min-w-[320px] rounded-md bg-gray-800 text-gray-400 p-6 shadow-lg">
        <div className="mb-4">
          <p className="text-lg font-semibold">{modalData.text1}</p>
          <p className="text-sm ">{modalData.text2}</p>
        </div>

        <div className="flex gap-3 justify-end">
          <IconBtn onClick={modalData?.btn2Handler} text={modalData?.btn2Text} outline={true} />
          <IconBtn onClick={modalData?.btn1Handler} text={modalData?.btn1Text} />
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal