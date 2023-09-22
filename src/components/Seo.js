import React from "react"
import { Helmet } from "react-helmet"
import { helmetJsonLdProp } from "react-schemaorg"
import { useRouter } from "next/router"
import config from "../config"

const Seo = ({
  lang,
  homePage,
  title,
  author,
  description,
  image,
  date,
  children,
}) => {
  const router = useRouter()
  const { asPath: pathname } = router

  // const metaDescription = description || config.description

  const {
    siteTitle,
    titleTemplate,
    siteDescription,
    siteUrl,
    defaultImage,
    twitterUsername,
    siteLanguage,
    storgeUrl,
    favicon,
  } = config

  const seo = {
    title: title || siteTitle,
    description: description || siteDescription,
    image: `${storgeUrl}/${image || defaultImage}`,
    url: `${siteUrl}${pathname}`,
    canonical: pathname ? `${siteUrl}${pathname}` : null,
    twitterUsername: twitterUsername,
  }

  // Structured Data / JSON-lD

  const scripts = []

  // JSON-LD for home page
  // if (homePage) {
  //   const websiteJsonLd = helmetJsonLdProp({
  //     "@context": "https://schema.org",
  //     "@type": "WebSite",
  //     publisher: {
  //       "@type": "Organization",
  //       name: title || siteTitle,
  //       url: siteUrl,
  //       logo: {
  //         "@type": "ImageObject",
  //         url: "https://arun.gbjsolution.com/content/images/2021/05/arun-light-theme-logo.svg",
  //       },
  //     },
  //     url: seo.url,
  //     image: {
  //       "@type": "ImageObject",
  //       url: `${siteUrl}${image || defaultImage}`,
  //       width: 1300,
  //       height: 1625,
  //     },
  //     mainEntityOfPage: {
  //       "@type": "WebPage",
  //       "@id": siteUrl,
  //     },
  //     description:
  //       "An architect, software developer, YouTuber and keynote speaker. On this site I write about my learning and experience.",
  //   })
  //   scripts.push(websiteJsonLd)
  // }

  // // JSON-LD for posts and other pages
  // if (title && author) {
  //   const articleJsonLd = helmetJsonLdProp({
  //     "@context": "https://schema.org",
  //     "@type": "Article",
  //     headline: title,
  //     image: `${siteUrl}${image}`,
  //     datePublished: date,
  //     author: {
  //       "@type": "Person",
  //       name: `${author.name}`,
  //       // url: `/author/${author.name.replace(" ", "-").toLowerCase()}`,
  //     },
  //   })
  //   scripts.push(articleJsonLd)
  // }

  return (
    <Helmet
      htmlAttributes={{
        lang: siteLanguage,
      }}
      title={seo.title}
      titleTemplate={titleTemplate}
      link={[
        { rel: "icon", href: favicon },
        seo.canonical && {
          rel: "canonical",
          href: seo.canonical,
        },
      ]}
      meta={[
        {
          name: "title",
          content: seo.title,
        },
        {
          name: "description",
          content: seo.description,
        },
        {
          name: "image",
          content: seo.image,
        },
        {
          property: "og:url",
          content: seo.url,
        },
        {
          property: "og:title",
          content: seo.title,
        },
        {
          property: "og:description",
          content: seo.description,
        },
        {
          property: "og:image",
          content: seo.image,
        },
        {
          property: "twitter:card",
          content: "summary_large_image",
        },
        // {
        //   property: "twitter:creator",
        //   content: seo.twitterUsername,
        // },
        {
          property: "twitter:title",
          content: seo.title,
        },
        {
          property: "twitter:description",
          content: seo.description,
        },
        {
          property: "twitter:image",
          content: seo.image,
        },
      ]}
      script={scripts}
    >
      {children}
    </Helmet>
  )
}

export default Seo
