import React, { useState } from "react"
import { CustomEnvelop } from "../icons"
import { useApi } from "../hooks/useApi"
import { useToaster, Message } from "rsuite"

const NewsletterSubscription = () => {
  const api = useApi()
  const toaster = useToaster()
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post("/v1/subscribe", { email, full_name: fullName })
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
    setFullName("")
  }

  return (
    <section className="email-subs">
      <div className="container">
        <div className="email-subs-wrap text-center">
          <div className="icon">
            <CustomEnvelop className="text-primary" />
          </div>
          <h2 className="lg:text-6xl text-4xl email-subs-section-title">
            Subscribe to newsletter
          </h2>
          <div className="email-subs-section-description">
            Stay up to date! Get all the latest posts delivered straight to your
            inbox.
          </div>
          <div className="form-wrap bg-transparent">
            <form
              onSubmit={e => handleSubmit(e)}
              className={`subscribe-form text-left${loading ? " loading" : ""}`}
            >
              <div className="field-group-inline">
                <input
                  type="text"
                  name="name"
                  className="form-field input-field"
                  id="name"
                  placeholder="Your name"
                  required
                  autoComplete="off"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                />
                <input
                  type="email"
                  name="email"
                  className="email form-field input-field"
                  id="email"
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
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsletterSubscription
