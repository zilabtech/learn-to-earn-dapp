// import App from 'next/app'
import Router, { useRouter } from "next/router"
import { createContext, useEffect } from "react"
import { StoreProvider } from "easy-peasy"
import { initializeStore, useStore } from "../store/store"
import { SessionProvider } from "next-auth/react"
import { useSession } from "next-auth/react"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"
// import NProgress from "nprogress"

import App from "next/app"
import "../assets/scss/app.scss"
import { useApi, setToken } from "../hooks/useApi"
import config from "../config"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter()
  const store = useStore(pageProps.ssrStoreState)

  // Router.events.on("routeChangeStart", () => NProgress.start())
  // Router.events.on("routeChangeComplete", () => NProgress.done())
  // Router.events.on("routeChangeError", () => NProgress.done())

  // NProgress.configure({ showSpinner: false })

  // useEffect(() => {
  //   void (function () {
  //     window.__onThemeChange = function () {}
  //     var preferredTheme
  //     try {
  //       preferredTheme = localStorage.getItem("theme")
  //     } catch (err) {}
  //     function setTheme(newTheme) {
  //       document.documentElement.setAttribute("data-theme", newTheme)
  //       document.body.classList.remove(
  //         newTheme === "dark" ? "rs-theme-light" : "rs-theme-dark"
  //       )
  //       document.body.classList.add(`rs-theme-${newTheme}`)
  //       window.__theme = newTheme
  //       preferredTheme = newTheme
  //       window.__onThemeChange(newTheme)
  //     }
  //     window.__setPreferredTheme = function (newTheme) {
  //       setTheme(newTheme)
  //       try {
  //         localStorage.setItem("theme", newTheme)
  //       } catch (err) {}
  //     }
  //     var darkQuery = window.matchMedia("(prefers-color-scheme: dark)")
  //     darkQuery.addListener(function (e) {
  //       window.__setPreferredTheme(e.matches ? "dark" : "light")
  //     })
  //     setTheme(preferredTheme || (darkQuery.matches ? "dark" : "light"))
  //   })()
  // }, [])

  useEffect(() => {
    if (typeof window === "undefined") return

    const Tawk_API = Tawk_API || {},
      Tawk_LoadStart = new Date()
    ;(function () {
      const s1 = document.createElement("script"),
        s0 = document.getElementsByTagName("script")[0]
      s1.async = true
      s1.src = "https://embed.tawk.to/62f6268854f06e12d88e3b22/1ga8od1sg"
      s1.charset = "UTF-8"
      s1.setAttribute("crossorigin", "*")
      s0.parentNode.insertBefore(s1, s0)
    })()
    /*=====================================================
    A simple throttle function
  =====================================================*/
    function CustomThrottle(func, limit) {
      var lastFunc, lastRan
      return function () {
        var context = this,
          args = arguments
        if (!lastRan) {
          func.apply(context, args)
          lastRan = Date.now()
        } else {
          clearTimeout(lastFunc)
          lastFunc = setTimeout(function () {
            if (Date.now() - lastRan >= limit) {
              func.apply(context, args)
              lastRan = Date.now()
            }
          }, limit - (Date.now() - lastRan))
        }
      }
    }
    /*=====================================================
    sticky nav
  =====================================================*/
    var navType = document.querySelector(".site-wrap").getAttribute("data-nav")
    var header = document.querySelector(".site-header")
    if (
      typeof header !== undefined &&
      header !== null &&
      navType === "sticky"
    ) {
      window.addEventListener(
        "scroll",
        CustomThrottle(function () {
          var currScroll = window.pageYOffset
          if (currScroll > 1) {
            header.classList.add("small")
          } else {
            header.classList.remove("small")
          }
        }, 50)
      )
    }
    /*=====================================================
        Responsive table
=====================================================*/
    var tables = document.querySelectorAll("table")
    if (tables.length > 0) {
      tables.forEach(function (table) {
        var wrapper = document.createElement("div")
        wrapper.classList.add("table-responsive")
        table.parentNode.insertBefore(wrapper, table)
        wrapper.appendChild(table)
      })
    }
  }, [router])

  return (
    <SessionProvider session={session}>
      <MyCustomProvider>
        <StoreProvider store={store}>
          <GoogleReCaptchaProvider
            reCaptchaKey={config.googleCaptchaKey}
            scriptProps={{
              async: false,
              defer: false,
              appendTo: "head",
              nonce: undefined,
            }}
            container={{
              // optional to render inside custom element
              element: "recaptchaHolder",
              parameters: {
                badge: "bottomleft", // optional, default undefined
                theme: "dark", // optional, default undefined
              },
            }}
          >
            <div id="recaptchaHolder"></div>
            <Component {...pageProps} />
          </GoogleReCaptchaProvider>
        </StoreProvider>
      </MyCustomProvider>
    </SessionProvider>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.

MyApp.getInitialProps = async appContext => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext)
  const store = initializeStore()
  const api = useApi()
  const { isLoaded } = store.getState()
  if (!isLoaded) {
    const { data } = await api.get("/v1/translations")
    store.getActions().setTranslations(data)
    store.getActions().setIsLoaded(true)
  }

  appProps.pageProps = {
    ssrStoreState: store.getState(),
  }

  return { ...appProps }
}

// const MyCustomContext = createContext()

const MyCustomProvider = ({ children }) => {
  const { data } = useSession()
  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(data?.accessToken)
    }
  }, [data])
  return <>{children}</>
}

export default MyApp
