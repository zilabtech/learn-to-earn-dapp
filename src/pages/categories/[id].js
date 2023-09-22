import Link from "next/link"
import { useState } from "react"
import Layout from "../../components/Layout"
import PostLoop from "../../components/PostLoop"
import Seo from "../../components/Seo"
import { useApi } from "../../hooks/useApi"

export async function getServerSideProps({ params }) {
  const api = useApi()
  const { id } = params
  const { data } = await api.get(`/v1/category/${id}/posts`)
  return {
    props: { category: data.results[0] },
  }
}
const Posts = ({ category }) => {
  const postsCount = category.posts.length
  return (
    <Layout>
      <Seo title="Posts" />
      <div className="main">
        <div className="container">
          <div className="centered-page-header text-center">
            <h1 className="title">{category.name} Posts</h1>
            <div className="description">
              {postsCount} {postsCount > 1 ? "posts" : "post"}
            </div>
          </div>
          <div className="row">
            <PostLoop posts={category.posts} hasMore={false} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Posts
