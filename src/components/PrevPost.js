import { format, parseISO } from "date-fns"
import Link from "next/link"
import React from "react"
// import config from "../config"
import PagePreviousIcon from "@rsuite/icons/PagePrevious"

const PrevPost = ({ post }) => {
  return (
    <div className="post prev-post">
      <Link href={`/posts/${post.slug}`}>
        <a className="flex items-center">
          <PagePreviousIcon className="hidden lg:block h-16 w-16 mr-4" />
          {/* {post.image && (
            <div className="featured-image">
              <img src={`${config.storgeUrl}/${post.image}`} alt={post.title} />
            </div>
          )} */}
          <div className="content-wrap">
            <div className="nav-text">Previous article</div>
            <h4 className="title h5">{post.title}</h4>
            <div className="post-meta">
              <time className="post-date" dateTime="{post.data}">
                {format(parseISO(post.created_at), "MMMM dd, yyyy")}
              </time>
              {/* <span className="read-time">5 min read</span> */}
            </div>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default PrevPost
