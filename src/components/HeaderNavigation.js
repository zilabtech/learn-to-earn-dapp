import React from "react"
import { ArrowDown } from "../icons"
import Link from "next/link"
import { headerMenu } from "../config/headerMenu"
import { useSession, signOut } from "next-auth/react"
import { useApi } from "../hooks/useApi"
import ExitIcon from "@rsuite/icons/Exit"
import { Dropdown, Avatar } from "rsuite"
import SearchButton from "../components/SearchButton"
// import ThemeToggle from "../components/ThemeToggle"
// import ColorSchemeScript from "./ColorSchemeScript"

const HeaderNavigation = () => {
  const { data: auth, status } = useSession()
  const api = useApi()

  const logout = async () => {
    await api.post("/logout")
    await signOut()
  }

  return (
    <>
      <nav
        className="header-nav"
        role="navigation"
        aria-label="Main navigation"
      >
        <ul className="header-nav-list no-style-list">
          {headerMenu.map((menuItem, index) => (
            <li
              className={`nav-item${menuItem.subMenu ? " submenu-parent" : ""}`}
              key={index}
            >
              <Link href={menuItem.url} activeClassName="nav-current">
                <a>
                  {menuItem.name}
                  {menuItem.subMenu && <ArrowDown />}
                </a>
              </Link>
              {menuItem.subMenu && (
                <>
                  <input
                    type="checkbox"
                    id={`submenu-parent-${menuItem.name}`}
                    className="submenu-parent-checkbox"
                  />
                  <label
                    htmlFor={`submenu-parent-${menuItem.name}`}
                    className="submenu-parent-label"
                  >
                    <ArrowDown />
                  </label>
                  <ul className="no-style-list">
                    {menuItem.subMenu.map((subMenuItem, index) => (
                      <li className="nav-item" key={index}>
                        <Link
                          href={subMenuItem.url}
                          activeClassName="nav-current"
                        >
                          <a>{subMenuItem.name}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="icon-items-wrap flex justify-between lg:gap-1 lg:ml-10 ml-3 gap-3">
        <SearchButton />
        {/* <ThemeToggle /> */}
        {status === "authenticated" ? (
          <Dropdown
            className="lg:mr-0 mr-3"
            renderToggle={(props, ref) => (
              <Avatar
                {...props}
                ref={ref}
                circle
                style={{
                  background: "var(--c-primary-dark)",
                  height: "40px",
                  width: "40px",
                  fontSize: "1.5rem",
                }}
              >
                {auth.user.name.split("")[0]}
              </Avatar>
            )}
          >
            <Dropdown.Item icon={<ExitIcon />} onClick={logout}>
              Logout
            </Dropdown.Item>
          </Dropdown>
        ) : (
          <Link href="/login">
            <a className="btn text-white">Login</a>
          </Link>
        )}
      </div>
    </>
  )
}

export default HeaderNavigation
