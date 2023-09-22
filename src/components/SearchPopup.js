import React, { useState, useEffect, useRef, useCallback } from "react"
import { Close } from "../icons"
import { useApi } from "../hooks/useApi"
import { useDebounce } from "../hooks/useDebounce"
import Link from "next/link"
import { useRouter } from "next/router"

const SearchPopup = ({ popupRef }) => {
  const api = useApi()
  const router = useRouter()
  const [popupVisible, setPopupVisible] = useState(false)
  const inputRef = useRef(null)

  const handleToggle = () => {
    setPopupVisible(!popupVisible)
    if (popupVisible === true) {
      setSearchTerm(null)
      inputRef.current.value = null
    } else {
      window.setTimeout(function () {
        inputRef.current && inputRef.current.focus()
      }, 200)
    }
  }
  popupRef.current = handleToggle

  // Keydown handler which closes search popup on "Escape" key press
  const handleKeyDown = event => {
    event.key === "Escape" && handleToggle()
  }
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  })
  useEffect(() => {
    setPopupVisible(false)
    setSearchTerm(null)
    inputRef.current.value = null
    const switchMenu = document.getElementById("mobile-menu-toggle")
    if (switchMenu?.checked) switchMenu.checked = false
  }, [router.asPath])

  const [results, setResults] = useState([])
  const [searchTerm, setSearchTerm] = useState(null)
  const [loading, setLoading] = useState(false)
  const handleInputValue = event => {
    setSearchTerm(event.target.value)
  }

  useEffect(() => {
    setLoading(true)
    search(searchTerm)
  }, [searchTerm])

  const search = useCallback(
    useDebounce(async q => {
      try {
        if (!q) {
          setResults([])
          setLoading(false)
          return
        }
        const { data } = await api.get(`/v1/search/${q}`)
        setResults(data.results)
      } catch (e) {}
      setLoading(false)
    }, 200),
    []
  )

  return (
    <div
      className={`search-popup js-search-popup${popupVisible && " visible"}`}
      role="dialog"
    >
      <div className="search-popup-bg"></div>
      <button
        className="close-button btn-no-style"
        id="search-close"
        aria-label="Close search"
        onClick={handleToggle}
      >
        <Close />
      </button>
      <div className="popup-inner">
        <div className="inner-container">
          <form
            className="search-form"
            id="search-form"
            onSubmit={e => e.preventDefault()}
          >
            <div className="search-form-box flex">
              <input
                type="text"
                className="search-input"
                placeholder="Type to search"
                id="search-input"
                aria-label="Type to search"
                role="searchbox"
                ref={inputRef}
                onKeyUp={handleInputValue}
              />
            </div>
          </form>
          <div className="search-close-note">Press ESC to close.</div>
          {results.length > 0 ? (
            <div className="search-result" id="search-results">
              {results.map((post, index) => (
                <div className="search-results-item" key={index}>
                  <Link href={`/posts/${post.slug}`}>
                    <a>
                      <div className="content">
                        <h3 className="title h5">
                          <span>{post.title}</span>
                        </h3>
                        <div className="meta font-bold">
                          <span>Prize: {post.prize} odon token</span>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          ) : loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            searchTerm && (
              <p className="text-center">
                No results found for <strong>{searchTerm}</strong>
              </p>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchPopup
