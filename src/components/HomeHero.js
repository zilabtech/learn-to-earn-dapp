import React from "react"
import HomeHeroSubscription from "./HomeHeroSubscription"
import SocialLinks from "./SocialLinks"
import { useStoreState } from "easy-peasy"
import config from "../config"

const HomeHero = () => {
  const { home_page } = useStoreState(state => state.translations)
  return (
    <section className="home-cover-area">
      <div className="container">
        <div
          className={`row home-cover-wrap${
            home_page?.banner_image ? " has-cover-image" : ""
          }`}
        >
          {home_page?.banner_image && (
            <div className="col-lg-5">
              <div className="cover-img-container">
                <div className="cover-img-wrap">
                  <img
                    src={`${config.storgeUrl}/${home_page?.banner_image}`}
                    alt={`${home_page?.title} Cover`}
                    width={400}
                    height={400}
                    style={{ position: "absolute", borderRadius: "50%" }}
                    placeholder="blurred"
                  />
                  {/* <img
                    loading="lazy"
                    srcSet=""
                    src={config.cover}
                    alt={`${site.siteMetadata.title} Cover`}
                  ></img> */}

                  <div className="dot-parent dot-1">
                    <div className="dot"></div>
                  </div>
                  <div className="dot-parent dot-2">
                    <div className="dot"></div>
                  </div>
                  <div className="dot-parent dot-3">
                    <div className="dot"></div>
                  </div>
                  <div className="dot-parent dot-4">
                    <div className="dot"></div>
                  </div>
                  <div className="dot-parent dot-5">
                    <div className="dot"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="col-lg-7">
            <div className="home-cover-content-wrap">
              <h1
                className="heading-large"
                dangerouslySetInnerHTML={{
                  __html: home_page?.title,
                }}
              ></h1>
              <div
                className="intro-description"
                dangerouslySetInnerHTML={{
                  __html: home_page?.description,
                }}
              ></div>
              <HomeHeroSubscription />
              <SocialLinks />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeHero
