import Layout from "../components/Layout"
import Seo from "../components/Seo"
import PageContainer from "../components/PageContainer"
import { useMessage } from "../hooks/useMessage"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"
import { useCallback, useEffect, useState } from "react"
import { useApi } from "../hooks/useApi"

const Contact = () => {
  const message = useMessage()
  const api = useApi()
  const title = "Contact Me"
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [token, setToken] = useState(null)

  const form = [
    {
      name: "full_name",
      type: "text",
      placeholder: "Full Name",
      as: "input",
      validation: Yup.string().required("Full Name is a required field"),
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email",
      as: "input",
      validation: Yup.string()
        .email("Email must be valid")
        .required("Email is a required field"),
    },
    {
      name: "subject",
      type: "text",
      placeholder: "Subject",
      as: "input",
      validation: Yup.string().required("Subject is a required field"),
    },
    {
      name: "message",
      type: "text",
      placeholder: "Message",
      as: "textarea",
      props: { rows: 4 },
      validation: Yup.string().required("Message is a required field"),
    },
  ]

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) return
    const token = await executeRecaptcha("contactForm")
    setToken(token)
  }, [executeRecaptcha])

  useEffect(() => {
    handleReCaptchaVerify()
  }, [handleReCaptchaVerify])

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (!token) {
      message.error("Please verify you are not a robot")
      return
    }
    try {
      await api.post("/v1/contact-us", values)
      message.success("Thank you for contacting us!")
      resetForm()
    } catch (e) {
      message.error("Something went wrong, please try again.")
    }

    setSubmitting(false)
  }

  return (
    <Layout>
      <Seo title={title} />
      <PageContainer title={title}>
        <div className="post-content">
          <p>
            Hello! Do you have any question or suggestion about this site, or
            just want to say Hi? Send me a message using below form. I will get
            back to you as soon as possible.
          </p>
          <Formik
            initialValues={form.reduce(
              (acc, cur) => ({ ...acc, [cur.name]: "" }),
              {}
            )}
            validationSchema={Yup.object().shape(
              form.reduce(
                (acc, cur) => ({ ...acc, [cur.name]: cur.validation }),
                {}
              )
            )}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors }) => (
              <Form>
                {form.map((item, index) => (
                  <div key={index} className={`form-group mb-3`}>
                    <Field
                      className="mb-0"
                      name={item.name}
                      type={item.type}
                      as={item.as}
                      placeholder={item.placeholder}
                      {...item.props}
                    />
                    {errors[item.name] && (
                      <ErrorMessage
                        className="text-red-600"
                        name={item.name}
                        component="div"
                      />
                    )}
                  </div>
                ))}
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </PageContainer>
    </Layout>
  )
}

export default Contact
