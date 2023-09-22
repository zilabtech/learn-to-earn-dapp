import { createRef, useState } from "react"
import Layout from "../../components/Layout"
import Tags from "../../components/Tags"
import PrevNextPosts from "../../components/PrevNextPosts"
import Seo from "../../components/Seo"
import ShareLinks from "../../components/ShareLinks"
import config from "../../config"
import { useRouter } from "next/router"
import { DiscussionEmbed } from "disqus-react"
import { setToken, useApi } from "../../hooks/useApi"
import { format, parseISO } from "date-fns"
import QuizModal from "../../components/quizModal"
import { useSession } from "next-auth/react"
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]"
import Link from "next/link"
import PageNextIcon from "@rsuite/icons/PageNext"
import PagePreviousIcon from "@rsuite/icons/PagePrevious"
import { Pagination } from "rsuite"

// import RelatedPosts from "../../components/RelatedPosts"

export async function getServerSideProps({ req, res, params }) {
  const session = await unstable_getServerSession(req, res, authOptions)
  const api = useApi()
  setToken(session?.accessToken)
  const { slug } = params
  const {
    data: { post, has_participated, next_post, older_post },
  } = await api.get(`/v1/post/${slug}`)
  const { data: quiz } = await api.get(`/v1/post/${post.id}/quizzes`)
  return {
    props: { post, quiz, has_participated, next_post, older_post },
  }
}

const Post = ({ post, quiz, has_participated, next_post, older_post }) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const { status } = useSession()
  const isAuthenticated = status === "authenticated"
  const disqusConfig = {
    config: {
      url: post.slug,
      identifier: post.id,
      title: post.title,
      language: config.siteLanguage,
    },
  }
  const content = post.body.split("[NEXT_PAGE]")

  const contentRef = createRef()
  const [activePage, setActivePage] = useState(1)
  const activeContent = content[activePage - 1]

  return (
    <Layout>
      <Seo
        title={post.title}
        description={post.description || post.excerpt}
        image={`${post.image}`}
        author={post.author}
        date={post.created_at}
      />
      <div className="main">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <article className="single-post">
                <header className="post-header max-w-full">
                  <div className="tag-wrap">
                    {post.category && <Tags tags={[post.category]} />}
                  </div>
                  <h1 className="post-title">{post.title}</h1>
                  <div className="post-meta flex">
                    <div className="author-list flex">
                      {/* <Link href={`/author/${post.author.id}`}>
                        <a className="author-name">{}</a>
                      </Link> */}
                      {/* &nbsp; */}
                      <span>{post.author.name}</span>
                    </div>
                    <time className="post-date" dateTime={post.created_at}>
                      {format(parseISO(post.created_at), "MMMM dd, yyyy")}
                    </time>
                    {/* <span className="read-time">
                      {post.timeToRead} min read
                    </span> */}
                  </div>
                </header>
                {post.image && (
                  <div className="featured-image-wrap">
                    <img
                      src={`${config.storgeUrl}/${post.image}`}
                      alt={post.title}
                    />
                  </div>
                )}
                <div
                  ref={contentRef}
                  className="post-content max-w-full border-b-2 border-color-primary"
                >
                  <div
                    key={activePage}
                    className="markdown-body"
                    dangerouslySetInnerHTML={{ __html: activeContent }}
                  ></div>
                  {content.length > 1 && (
                    <div className="flex justify-center text-white">
                      <Pagination
                        prev
                        next
                        total={content.length}
                        size="lg"
                        limit={1}
                        activePage={activePage}
                        onChangePage={page => {
                          setActivePage(page)
                          contentRef.current.scrollIntoView({
                            behavior: "smooth",
                          })
                        }}
                      />
                    </div>
                  )}
                  <div className="flex justify-center">
                    {isAuthenticated &&
                      quiz.length > 0 &&
                      activePage === content.length && (
                        <button
                          onClick={() => setIsOpen(true)}
                          className="btn btn-primary mt-4 text-2xl"
                          disabled={has_participated}
                        >
                          Earn {post.prize} ODON Tokens
                        </button>
                      )}
                  </div>
                </div>
                <div className="post-footer">
                  {quiz.length > 0 && (
                    <QuizModal
                      open={isOpen}
                      onClose={() => setIsOpen(false)}
                      quiz={quiz}
                      post_id={post.id}
                    />
                  )}

                  <ShareLinks
                    url={`${config.siteUrl}${router.asPath}`}
                    title={post.title}
                  />
                </div>
              </article>
              <PrevNextPosts prev={older_post} next={next_post} />
              <div className="comment-wrap">
                <div className="comment-container">
                  <DiscussionEmbed
                    shortname="learn-to-earn-frontend"
                    config={disqusConfig}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <RelatedPosts posts={[post, post, post, post]} count={4} /> */}
    </Layout>
  )
}

export default Post
