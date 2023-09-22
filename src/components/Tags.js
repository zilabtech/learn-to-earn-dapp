import React from "react"
import Link from "next/link"

const Tags = ({ tags }) => {
  return (
    <div className="tag-wrap">
      {tags.map(
        (tag, index) =>
          tag !== null && (
            <Link
              href={`/categories/${tag.id}`}
              style={{
                backgroundColor:
                  tag.color !== "" || tag.color !== null ? tag.color : "",
              }}
              key={index}
            >
              <a>{tag.name}</a>
            </Link>
          )
      )}
    </div>
  )
}

export default Tags
