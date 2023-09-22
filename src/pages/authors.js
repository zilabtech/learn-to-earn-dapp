import React from "react"
import Layout from "../components/Layout"
import Link from "next/link"
import Seo from "../components/Seo"
import { User } from "../icons"
import authors from "../config/authors"

const Authors = () => {
  return (
    <Layout>
      <Seo title="Authors" />
      <div className="main">
        <div className="container">
          <div className="centered-page-header text-center">
            <h1 className="title">Authors</h1>
            {/* <div className="description">
                add description here
            </div> */}
          </div>
          <div className="row">
            {authors
              .filter(author => author.postCount > 0)
              .map((author, index) => (
                <div
                  className="col-xl-4 col-lg-6 col-md-6 author-card-wrap"
                  key={index}
                >
                  <Link href={`/author/${author.name}`}>
                    <a className="author-card">
                      <div className="avatar-wrap">
                        {author.profilePicture !== null ? (
                          <img src={author.profilePicture} alt={author.name} />
                        ) : (
                          <div className="avatar no-image">
                            <User />
                          </div>
                        )}
                      </div>
                      <div className="author-info">
                        <h2 className="name h5">{author.name}</h2>
                        <div className="author-meta">
                          {author.location && (
                            <span className="author-location">
                              {author.location}
                            </span>
                          )}
                          <span className="post-count">
                            {` `}
                            {author.postCount}
                            {` `}
                            {author.postCount > 1 ? "posts" : "post"}
                          </span>
                        </div>
                        {author.description && (
                          <div className="bio">{author.description}</div>
                        )}
                      </div>
                    </a>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Authors
