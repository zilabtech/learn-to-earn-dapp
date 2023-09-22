import React from "react"
import Link from "next/link"
import StarIcon from "../assets/svg-icons/star.svg"
import Tags from "./Tags"
import { format } from "date-fns"
import config from "../config"

const PostItem = ({ post }) => {
  const dateFormatted = () => format(new Date(post.created_at), "MMM dd, yyyy")

  return (
    <article className="post-card flex">
      {post.image && (
        <Link href={`/posts/${post.slug}`}>
          <a className="post-img-wrap">
            <img src={`${config.storgeUrl}/${post.image}`} alt={post.title} />
          </a>
        </Link>
      )}
      <div className="post-info-wrap">
        <div className="flex post-top-meta">
          {post.category && <Tags tags={[post.category]} />}
          {post.featured && (
            <div
              className="featured-icon"
              aria-labelledby="Featured post icon"
              role="img"
            >
              <StarIcon className="mb-2" />
            </div>
          )}
        </div>
        <h2 className="h3 post-title">
          <Link href={`/posts/${post.slug}`}>
            <a>{post.title}</a>
          </Link>
        </h2>
        <div className="post-excerpt">{post.excerpt}</div>
        <div className="post-meta">
          <time className="post-date" dateTime={post.created_at}>
            {dateFormatted()}
          </time>
          {/* <span className="read-time">{post.timeToRead} min read</span> */}
        </div>
      </div>
    </article>
  )
}

export default PostItem
