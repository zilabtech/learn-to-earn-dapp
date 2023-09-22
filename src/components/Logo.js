import Link from "next/link"
import React from "react"
import config from "../config"
import { useStoreState } from "easy-peasy"

const Logo = () => {
  const { title, logoLight, logoDark } = config
  const { meta } = useStoreState(state => state.translations)
  const logo = `${config.storgeUrl}/${meta?.logo}`

  return (
    <>
      {logoLight !== null && logoDark !== null ? (
        <>
          <Link href="/">
            <a className="logo-img theme-light-logo ">
              {" "}
              <img src={logo} alt={title} />
            </a>
          </Link>
          <Link href="/">
            <a className="logo-img theme-dark-logo flex lg:justify-start justify-center">
              <img src={logo} alt={title} />
            </a>
          </Link>
        </>
      ) : (
        <Link href="/" className="logo-text">
          <a>{title}</a>
        </Link>
      )}
    </>
  )
}

export default Logo
