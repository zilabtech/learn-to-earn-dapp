import * as React from "react"
import HomeHero from "../components/HomeHero"
import Layout from "../components/Layout"
import PostLoop from "../components/PostLoop"
import FeaturedPostLoop from "../components/FeaturedPostLoop"
import Seo from "../components/Seo"
import { useStoreState } from "easy-peasy"
import { useApi } from "../hooks/useApi"

export const getServerSideProps = async () => {
  const api = useApi()
  const { data } = await api.get("/v1/posts")
  return {
    props: { posts: data },
  }
}

const IndexPage = ({ posts }) => {
  const { meta } = useStoreState(state => state.translations)
  const featuredPosts = posts.data.filter(post => post.featured)

  return (
    <Layout>
      <Seo
        title="Home"
        descriptoin={meta?.descriptoin}
        image={meta?.logo}
        homePage={true}
      />
      <HomeHero />
      <div className="main">
        {featuredPosts.length > 0 && <FeaturedPostLoop posts={featuredPosts} />}
        <PostLoop
          posts={posts.data}
          postPerPage={posts.per_page}
          sectionTitle="Latest post"
        />
      </div>
    </Layout>
  )
}

export default IndexPage
