import React from "react"
import Header from "./Header"
import Footer from "./Footer"
import NewsletterSubscription from "./NewsletterSubscription"
import config from "../config"
import ReadingBar from "./ReadingBar"

const Layout = ({ showReadingBar = false, children }) => {
  const { stickyNav } = config
  return (
    <div className="site-wrap" data-nav={stickyNav ? "sticky" : ""}>
      {showReadingBar && <ReadingBar />}
      <Header />
      {children}
      <NewsletterSubscription />
      <Footer />
    </div>
  )
}

export default Layout
