import React from "react"
import PostLoop from "../../components/PostLoop"
import Seo from "../../components/Seo"
import tags from "../../config/tags"
import postsConfig from "../../config/posts"
import Layout from "../../components/Layout"

export async function getServerSideProps({ params }) {
  const tag = tags.find(tag => tag.name === params.slug)
  const posts = postsConfig.filter(post => post.tags.includes(tag.name))

  return {
    props: { tag, posts }, // will be passed to the page component as props
  }
}

const tag = ({ tag, posts }) => {
  const totalPosts = posts.length
  return (
    <Layout>
      <Seo title={tag.name} description={tag.description} />
      <div className="main">
        <div className="container">
          <div className="archive-cover">
            <div
              className={`archive-cover-inner cover-tag flex${
                tag.coverImage !== null ? " has-image" : ""
              }`}
            >
              {tag.coverImage && (
                <img
                  className="cover-image"
                  src={tag.coverImage}
                  alt={tag.name}
                />
              )}
              <div className="cover-content-wrapper">
                <div className="tag-info-wrap text-center">
                  <h1 className="tag-name h2">{tag.name}</h1>
                  <div className="archive-info">
                    <span className="post-count">
                      {totalPosts > 1
                        ? `${totalPosts} posts`
                        : `${totalPosts} post`}
                    </span>
                  </div>
                  <div className="tag-description">{tag.description}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PostLoop posts={posts} />
      </div>
    </Layout>
  )
}

export default tag
