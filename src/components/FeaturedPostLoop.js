import React from "react"
import PostItem from "./PostItem"

const FeaturedPostLoop = ({ posts }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-10 offset-lg-1 js-post-list-wrap">
          <h2 className="h4 section-title">
            <span>Featured posts</span>
          </h2>
          {posts.map((post, index) => (
            <PostItem post={post} key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeaturedPostLoop
