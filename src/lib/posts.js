// Install gray-matter and date-fns
import matter from "gray-matter"
import { parseISO, format } from "date-fns"
import fs from "fs"
import { join } from "path"
import authors from "../config/authors"
import tagsConfig from "../config/tags"

// Add markdown files in `/content/blog`
const postsDirectory = join(process.cwd(), "content", "posts")

export function getPostBySlug(slug) {
  const realSlug = slug.replace(/\.md$/, "")
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)
  const date = format(new Date(), "MMMM dd, yyyy")
  const author = authors.find(author => author.name === data.author)
  return {
    slug: realSlug,
    frontmatter: { ...data, date, author, timeToRead: 3 },
    content,
  }
}

export function getAllPosts() {
  const slugs = fs.readdirSync(postsDirectory)
  const posts = slugs.map(slug => getPostBySlug(slug))

  return posts
}
