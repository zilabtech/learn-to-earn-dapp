import React from "react"
import Layout from "../../components/Layout"
import Seo from "../../components/Seo"
import Link from "next/link"
import { useApi } from "../../hooks/useApi"

export async function getServerSideProps() {
  const api = useApi()
  const { data } = await api.get(`/v1/categories`)
  return {
    props: { categories: data.results },
  }
}

const Categories = ({ categories }) => {
  // categories.sort((a, b) => b.posts.length - a.posts.length)

  return (
    <Layout>
      <Seo title="Categories" description="Categories archive" />
      <div className="main">
        <div className="container">
          <div className="centered-page-header text-center">
            <h1 className="title">Categories</h1>
            {/* <div className="description">add description here</div> */}
          </div>
          <div className="row">
            {categories.map((cat, index) => (
              <div
                className="col-xl-4 col-lg-6 col-md-6 tag-card-wrap"
                key={index}
              >
                <Link href={`/categories/${cat.id}`}>
                  <a className="tag-card flex">
                    <div className="tag-info-wrap">
                      <h2 className="tag-name h5">{cat.name}</h2>
                      <div className="post-count">
                        {cat.posts.length}
                        {` `}
                        {cat.posts.length > 1 ? "posts" : "post"}
                      </div>
                    </div>
                    {/* {tag.coverImage !== null && (
                      <div className="tag-image-wrap">
                        <img src={tag.coverImage} alt={tag.name} />
                      </div>
                    )} */}
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

export default Categories
