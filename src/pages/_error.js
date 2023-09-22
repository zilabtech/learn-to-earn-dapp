import CloseIcon from "@rsuite/icons/Close"

export default () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 my-10">
      <div className="h-32 w-32 border-4 rounded-full flex items-center justify-center border-red-600">
        <CloseIcon className="h-16 w-16 text-red-600" />
      </div>
      <p className="text-center text-red-600">
        Something went wrong. Please try again.
      </p>
    </div>
  )
}
