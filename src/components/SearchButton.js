import React, { useRef } from "react"
import SearchPopup from "./SearchPopup"
import { Search } from "../icons"

const SearchButton = () => {
  const popupRef = useRef(null)

  const handleToggle = () => {
    popupRef.current()
  }

  return (
    <>
      <button
        className="nav-icon search-icon flex btn-no-style"
        aria-label="Open search"
        onClick={handleToggle}
      >
        <span>
          <Search />
        </span>
      </button>
      <SearchPopup popupRef={popupRef} />
    </>
  )
}

export default SearchButton
