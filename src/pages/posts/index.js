import { useState } from "react"
import Layout from "../../components/Layout"
import PostLoop from "../../components/PostLoop"
import Seo from "../../components/Seo"
import { useApi } from "../../hooks/useApi"

export const getServerSideProps = async () => {
  const api = useApi()
  const { data } = await api.get(`/v1/posts`)
  return {
    props: { posts: data },
  }
}

const Posts = ({ posts }) => {
  const api = useApi()
  const [postsList, setPostsList] = useState([...posts.data])
  const [page, setPage] = useState(posts.current_page || 1)
  const [hasMore, setHasMore] = useState(page < posts.last_page)

  const loadMore = async page => {
    const { data } = await api.get(`/v1/posts?page=${page}`)
    setPostsList([...postsList, ...data.data])
    setPage(data.current_page)
    setHasMore(page < data.last_page)
  }

  return (
    <Layout>
      <Seo title="Posts" />
      <div className="main">
        <div className="container">
          <div className="centered-page-header text-center">
            <h1 className="title">Posts</h1>
            {/* <div className="description">
              add description here
            </div> */}
          </div>
          <div className="row">
            <PostLoop
              posts={postsList}
              hasMore={hasMore}
              handleLoadMore={() => loadMore(page + 1)}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Posts
