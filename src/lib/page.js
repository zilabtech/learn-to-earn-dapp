// Install gray-matter and date-fns
import matter from "gray-matter"
import { parseISO, format } from "date-fns"
import fs from "fs"
import { join } from "path"

// Add markdown files in `/content/blog`
const pagesDirectory = join(process.cwd(), "content", "pages")

export function getPageBySlug(slug) {
  const realSlug = slug.replace(/\.md$/, "")
  const fullPath = join(pagesDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)
  const date = format(new Date(), "LLL")

  return { slug: realSlug, frontmatter: { ...data, date }, content }
}

export function getAllPages() {
  const slugs = fs.readdirSync(pagesDirectory)
  const pages = slugs.map(slug => getPageBySlug(slug))

  return pages
}
