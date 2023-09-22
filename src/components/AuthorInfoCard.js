import Link from "next/link"
import React from "react"
import config from "../config"
import { User } from "../icons"

const AuthorInfoCard = ({ author }) => {
  const { id, name } = author
  return (
    <div className="about-author flex">
      <div className="avatar-wrap">
        <Link href={`/author/${id}`} title={name}>
          <a>
            {author.avatar !== null ? (
              <img
                src={`${config.storgeUrl}/${author.avatar}`}
                alt={author.name}
              />
            ) : (
              <div className="avatar no-image">
                <User />
              </div>
            )}
          </a>
        </Link>
      </div>
      <div className="author-info">
        <h3 className="name h5">
          <Link href={`/author/${id}`}>
            <a className="author-name">{name}</a>
          </Link>
        </h3>
        {author.email && <div className="bio">{author.email}</div>}
      </div>
    </div>
  )
}

export default AuthorInfoCard
