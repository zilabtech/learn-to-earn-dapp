import { useToaster, Message } from "rsuite"

export function useMessage(options = {}) {
  const { duration = 5000, placement = "bottomCenter" } = options
  const toaster = useToaster()
  const success = message => {
    toaster.push(
      <Message type="success" duration={duration}>
        {" "}
        {message}{" "}
      </Message>,
      {
        placement,
      }
    )
  }
  const error = message => {
    toaster.push(
      <Message type="error" duration={duration}>
        {message}
      </Message>,
      {
        placement,
      }
    )
  }
  return {
    success,
    error,
  }
}
