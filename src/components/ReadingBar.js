import { useEffect, useState } from "react"
function ReadingBar() {
  //Width State
  const [width, setWidth] = useState(0)
  // scroll function
  const scrollHeight = () => {
    const postContent = document.querySelector(".post-content")
    const el = document.documentElement
    const ScrollTop =
      (el.scrollTop || document.body.scrollTop) - postContent.offsetTop + 75
    const ScrollHeight = postContent.clientHeight - postContent.offsetTop - 100
    // ScrollHeight = el.scrollHeight || document.body.scrollHeight
    const percent = (ScrollTop / ScrollHeight) * 100
    // store percentage in state
    setWidth(percent > 100 ? 100 : percent < 0 ? 0 : percent)
  }
  //useEffect to control the component lifecycle
  useEffect(() => {
    window.addEventListener("scroll", scrollHeight)
    return () => window.removeEventListener("scroll", scrollHeight)
  })
  return (
    <div
      style={{
        width: width + "%",
        position: "fixed",
        height: "6px",
        borderRadius: "0px 2px 0px 0px",
        top: "0",
        zIndex: "9999",
        background:
          "linear-gradient( 90deg, rgba(109, 227, 219, 1) 0%, rgba(132, 115, 177, 1) 100%, rgba(3, 9, 112, 1) 100% )",
      }}
    ></div>
  )
}
export default ReadingBar
