import React, { useState } from "react"
import { useApi } from "../hooks/useApi"
import { useToaster, Message } from "rsuite"

const HomeHeroSubscription = () => {
  const api = useApi()
  const toaster = useToaster()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post("/v1/subscribe", { email })
      toaster.push(
        <Message type="success" duration={5000}>
          Thank you for subscribing!
        </Message>,
        { placement: "bottomCenter" }
      )
    } catch (e) {
      toaster.push(
        <Message type="error" duration={5000}>
          {e.response?.status === 400
            ? "Email is already subscribed."
            : "Something went wrong"}
        </Message>,
        {
          placement: "bottomCenter",
        }
      )
    }
    setLoading(false)
    setEmail("")
  }

  return (
    <form
      className={`members-form cover-subscribe-form text-left${
        loading ? " loading" : ""
      }`}
      data-members-form="subscribe"
      onSubmit={e => handleSubmit(e)}
    >
      <div className="form-field-wrap field-group-inline">
        <label htmlFor="header-form-email" className="sr-only">
          Email
        </label>
        <input
          type="email"
          name="email"
          className="email form-field input-field"
          id="header-form-email"
          placeholder="Your email address"
          required
          autoComplete="off"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button className="btn form-field" type="submit">
          <span>Subscribe</span>
        </button>
      </div>
    </form>
  )
}

export default HomeHeroSubscription
