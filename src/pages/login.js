import Layout from "../components/Layout"
import Seo from "../components/Seo"
import PageContainer from "../components/PageContainer"
import { Field, Form, Formik } from "formik"
import Link from "next/link"
import { Message } from "rsuite"
import { signIn } from "next-auth/react"
import { useRouter } from "next/router"
import { useState } from "react"
import { withGuest } from "../hooks/withGuest"
import { Modal, Button } from "rsuite"

export const getServerSideProps = withGuest(() => ({ props: {} }))

const Login = () => {
  const [error, setError] = useState(null)
  const router = useRouter()
  const title = "Login"
  const fields = [
    {
      label: "Email",
      name: "email",
      placeholder: "Email",
      type: "email",
    },
    {
      label: "Password",
      name: "password",
      placeholder: "Password",
      type: "password",
    },
  ]

  const submit = async (values, { setSubmitting }) => {
    const res = await signIn("credentials", {
      ...values,
      redirect: false,
    })
    if (res.error) setError(res.error)
    else router.push("/")
    setSubmitting(false)
  }

  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)

  return (
    <Layout>
      <Seo title={title} />
      <PageContainer title={title}>
        <div className="post-content">
          <Formik initialValues={{ email: "", password: "" }} onSubmit={submit}>
            {({ isSubmitting, errors }) => (
              <Form>
                <div className="row">
                  {fields.map((field, index) => (
                    <div key={index} className="col-12">
                      <Field
                        name={field.name}
                        placeholder={field.placeholder}
                        type={field.type}
                      />
                      {errors[field.name] && (
                        <ErrorMessage
                          className="text-danger"
                          name={field.name}
                          component="div"
                        />
                      )}
                    </div>
                  ))}
                </div>
                {error && (
                  <Message showIcon type="error" className="mb-4">
                    {error}
                  </Message>
                )}

                <div className="flex justify-between items-center">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                  <p className="text-right">
                    <Link href="#">
                      <a onClick={handleOpen}>Forgot your password?</a>
                    </Link>
                  </p>
                  <Modal open={open} onClose={handleClose}>
                    <Modal.Header>
                      <Modal.Title>Forgot your password?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p>
                        If you have forgot your password, please contact our
                        Support Team to reset the password.
                      </p>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button onClick={handleClose} appearance="subtle">
                        Cancel
                      </Button>
                      <Button
                        href="https://odon.finance/contact"
                        target="_blank"
                        onClick={handleClose}
                        appearance="primary"
                        className="btn btn-primary"
                      >
                        Contact support
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
                <p className=" mt-4">
                  Not registered yet?{" "}
                  <Link href="/register">
                    <a>Create Account</a>
                  </Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </PageContainer>
    </Layout>
  )
}

export default Login
