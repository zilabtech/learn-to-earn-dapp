module.exports = {
  // General settings
  pathPrefix: "/", // If you deploy your site to yourdomain.tld/blog/ your pathPrefix should be "blog/"
  title: "ZiLab Learn 2 Earn Platform", // Navigation and Site Title
  titleTemplate: "%s | ZiLab Learn 2 Earn Platform", // To Add extra part in title. the title replace the %s. Example: `%s | Site title`
  description: "ZiLab Learn 2 Earn Platform",
  siteUrl: "https://learn-to-earn-frontend.vercel.app", // Domain address of your site. Do not add trailing slash!
  siteLanguage: "en", // Language Tag on <html> element

  apiUrl: "https://api-testnet-l2e.zilab.co/api",
  storgeUrl: "https://api-testnet-l2e.zilab.co/storage",

  googleCaptchaKey: "6Lf75kghAAAAAG-NisfExJ7mKmuRhkK56-AtHvoo",

  // place logo images in static/images folder - Used as site logo
  logoLight: "/images/arun-light-theme-logo.svg",
  logoDark: "/images/arun-dark-theme-logo.svg",

  // sticky nav style
  stickyNav: true,

  //place default cover image in static/images folder - used in home page cover
  cover: "/images/cover.jpg",

  // number of featured posts to show on home page
  featuredPostCount: 2,

  // number of latest posts to show on home page before load more button
  postPerPage: 8,

  disqusShortName: "arun-gatsby", // disqus shortname for disqus comment

  // JSONLD / Manifest for SEO
  titleAlt: "ZiLab Learn 2 Earn Platform", // Title for JSONLD
  headline: "ZiLab Learn 2 Earn Platform", // Headline for schema.org JSONLD
  favicon: "/favicon.ico", // Used for manifest favicon generation
  shortName: "ZiLab", // shortname for manifest. MUST be shorter than 12 characters
  author: "Jhon snow", // Author for schemaORGJSONLD
  themeColor: "#0057ff",
  backgroundColor: "#ffffff",

  //Twitter and facebook data for SEO
  twitterUsername: "@gbjsolution", // Twitter Username
  facebook: "gbjsolution", // Facebook Site Name
  ogLanguage: "en_US", // Facebook Language
  googleAnalyticsID: "XX-XXXXXXXXX-X",

  // mailchimp endpoint.
  // To know how to get it see plugin documentation https://www.gatsbyjs.com/plugins/gatsby-plugin-mailchimp/
  mailchimpEndpoint:
    "https://gbjsolution.us4.list-manage.com/subscribe/post?u=a63b2fed3ed61b70bf56d1aed&amp;id=7ae9965a25",
}
