import CheckIcon from "@rsuite/icons/Check"
import CloseIcon from "@rsuite/icons/Close"

const StatusMessage = ({ status, children }) => {
  const Icon = status === "success" ? CheckIcon : CloseIcon
  const borderColor =
    status === "success" ? "border-green-600" : "border-red-600"
  const color = status === "success" ? "text-green-600" : "text-red-600"
  return (
    <div className="flex flex-col items-center justify-center gap-5 my-10">
      <div
        className={`h-32 w-32 border-4 rounded-full flex items-center justify-center ${borderColor}`}
      >
        <Icon className={`h-16 w-16 ${color}`} />
      </div>
      {children}
    </div>
  )
}

export default StatusMessage
