import React from "react"
import IconsMap from "../util/IconsMap"
import { useStoreState } from "easy-peasy"

const SocialLinks = () => {
  const { socials } = useStoreState(state => state.translations)
  return (
    <div className="social-links-wrap flex lg:justify-start justify-center">
      <span className="title">Follow:</span>
      <div className="social-links flex">
        {socials &&
          Object.entries(socials)
            .filter(([_, item]) => item)
            .map(([key, item], index) => (
              <a href={item} aria-label="link" key={index}>
                {(() => {
                  const Icon =
                    IconsMap[key.toLowerCase()] || IconsMap["Default"]
                  return <Icon />
                })()}
              </a>
            ))}
      </div>
    </div>
  )
}

export default SocialLinks
