import Link from "next/link"
import Logo from "./Logo"
import SocialLinks from "./SocialLinks"
import { footerMenu } from "../config/footerMenu"
import { useStoreState } from "easy-peasy"

const Footer = () => {
  const { footer } = useStoreState(state => state.translations)
  return (
    <footer className="site-footer border-0">
      <div className="container pt-10 pb-5 border-t-2 border-b-2 border-color-primary">
        <div className="">
          <div className="row lg:text-left text-center">
            <div className="col-lg-5">
              <div className="footer-widget widget-about">
                <div className="widget-content">
                  <div className="footer-logo-wrap">
                    <Logo />
                  </div>
                  <div className="site-description mb-4">
                    {footer?.description}
                  </div>
                  <SocialLinks />
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="widget secondary-nav">
                {footerMenu.map((column, index) => (
                  <div className="nav-col" key={index}>
                    <h3 className="title h6">{column.title}</h3>
                    <nav>
                      <ul className="no-style-list">
                        {column.items.map((item, i) => (
                          <li className="nav-link" key={i}>
                            <Link href={item.url}>
                              <a>{item.name}</a>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-5 mt-5 flex justify-center">
        <div className="copyright">
          Made by{" "}
          <a href="https://zilab.co/" target="_blank">
            ZiLab Technologies
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
