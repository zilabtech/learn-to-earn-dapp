import React, { useState, useEffect } from "react"
import PostItem from "./PostItem"

const PostLoop = ({
  posts,
  sectionTitle,
  isLoading,
  hasMore,
  handleLoadMore,
}) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-10 offset-lg-1 js-post-list-wrap">
          {sectionTitle && (
            <h2 className="h4 section-title">
              <span>{sectionTitle}</span>
            </h2>
          )}
          {posts.map((post, index) => (
            <PostItem post={post} key={index} />
          ))}
        </div>
      </div>
      {posts.length > 0 && hasMore && (
        <div className="row">
          <div className="col">
            <div className="pagination-wrap text-center" id="pagination-wrap">
              <button
                className={`btn ${isLoading ? "loading" : ""}`}
                disabled={isLoading}
                onClick={handleLoadMore}
              >
                <span>Show more posts</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PostLoop
