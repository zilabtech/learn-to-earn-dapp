import React from "react"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import Link from "next/link"
import posts from "../config/posts"
import { format, parseISO } from "date-fns"

const MonthlyArchive = () => {
  return (
    <Layout>
      <Seo title="Yearly Archive" />
      <div className="main">
        <div className="container">
          <div className="centered-page-header text-center">
            <h1 className="title">Yearly Archive</h1>
            {/* <div className="description">
                    Use this if you want to show small description
                </div> */}
          </div>
          <div className="archive-wrap">
            {posts.map((post, index) => (
              <div
                className={`archive-post-card py-${format(
                  parseISO(post.date),
                  "yyyy"
                )}`}
                key={index}
              >
                <div className="py">{format(parseISO(post.date), "yyyy")}</div>
                <article className="archive-post">
                  <div className="inner">
                    <time className="post-date" dateTime={post.date}>
                      {format(parseISO(post.date), "MMM, dd")} -
                    </time>
                    <h2 className="title">
                      <Link
                        href={`/post/${post.title
                          .toLowerCase()
                          .replace(/\s/g, "-")}`}
                      >
                        {post.title}
                      </Link>
                    </h2>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default MonthlyArchive
