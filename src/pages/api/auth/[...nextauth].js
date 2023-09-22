import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from "axios"
import config from "../../../config"
import { setToken } from "../../../hooks/useApi"

const providers = [
  CredentialsProvider({
    name: "Credentials",
    authorize: async credentials => {
      try {
        const { data } = await axios.post(
          `${config.apiUrl}/login`,
          {
            email: credentials.email,
            password: credentials.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
        return {
          ...data.user,
          token: data.authorisation.token,
        }
      } catch (e) {
        throw new Error(e.response?.data.message || "Something went wrong")
      }
    },
  }),
]

const callbacks = {
  // Getting the JWT token from API response
  async jwt({ token, user }) {
    if (user) {
      token.accessToken = user.token
    }
    return token
  },

  async session({ session, token }) {
    session.accessToken = token.accessToken
    return session
  },
}

export const authOptions = {
  providers,
  secret: "vIS+lNxW5L8DTn+tHz6JXaEDDrmitWgaI10zFaplKYA=",
  callbacks,
  pages: {
    error: "/login",
    signIn: "/login",
  },
}

export default (req, res) => NextAuth(req, res, authOptions)
