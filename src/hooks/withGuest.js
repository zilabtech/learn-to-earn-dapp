import { authOptions } from "../pages/api/auth/[...nextauth]"
import { unstable_getServerSession } from "next-auth/next"

export function withGuest(gssp) {
  return async context => {
    const { req, res } = context
    const session = await unstable_getServerSession(req, res, authOptions)

    if (session) {
      // Redirect to home page
      return {
        redirect: {
          destination: "/",
          statusCode: 302,
        },
      }
    }

    return await gssp(context) // Continue on to call `getServerSideProps` logic
  }
}
