import Layout from "../components/Layout"
import Seo from "../components/Seo"
import PageContainer from "../components/PageContainer"
import { Field, Form, Formik, ErrorMessage } from "formik"
import { useApi } from "../hooks/useApi"
import { useRouter } from "next/router"
import { useToaster, Message } from "rsuite"
import * as Yup from "yup"
import { withGuest } from "../hooks/withGuest"

export const getServerSideProps = withGuest(() => ({ props: {} }))

const Register = () => {
  const api = useApi()
  const router = useRouter()
  const toaster = useToaster()
  const title = "Register"
  const fields = [
    {
      name: "name",
      placeholder: "Name",
      type: "text",
      validation: Yup.string().required("Name is a required field"),
    },
    {
      name: "email",
      placeholder: "Email",
      type: "email",
      validation: Yup.string()
        .email("Email must be valid")
        .required("Email is a required field"),
    },
    {
      name: "wallet_address",
      placeholder: "Wallet Address",
      type: "text",
      validation: Yup.string()
        .required("Wallet Address is a required field")
        .matches(/^(0x)?[0-9a-f]{40}$/i, "Wallet Address must be valid"),
    },
    {
      name: "password",
      placeholder: "Password",
      type: "password",
      validation: Yup.string().required("Password is a required field"),
    },
  ]

  const submit = async (values, { setSubmitting }) => {
    try {
      const { data } = await api.post("/register", values)
      toaster.push(
        <Message type="success" duration={5000}>
          Thank you for the registation, now you can login.
        </Message>,
        {
          placement: "bottomCenter",
        }
      )
      router.push("/login")
    } catch (error) {
      toaster.push(
        <Message showIcon type="error">
          {error.response?.data.message ||
            "Something goes wrong, please try again!"}
        </Message>,
        { placement: "bottomCenter" }
      )
    }
    setSubmitting(false)
  }

  return (
    <Layout>
      <Seo title={title} />
      <PageContainer title={title}>
        <div className="post-content">
          <Formik
            initialValues={{
              name: "",
              email: "",
              wallet_address: "",
              password: "",
            }}
            validationSchema={Yup.object().shape(
              fields.reduce(
                (acc, cur) => ({ ...acc, [cur.name]: cur.validation }),
                {}
              )
            )}
            onSubmit={submit}
            render={({ isSubmitting, errors }) => (
              <Form>
                <div className="row">
                  {fields.map((field, index) => (
                    <div key={index} className="col-12 mb-4">
                      <Field
                        name={field.name}
                        placeholder={field.placeholder}
                        type={field.type}
                        className="mb-0"
                      />
                      {errors[field.name] && (
                        <ErrorMessage
                          className="text-red-500"
                          name={field.name}
                          component="div"
                        />
                      )}
                    </div>
                  ))}
                </div>
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Registering..." : "Register"}
                </button>
              </Form>
            )}
          />
        </div>
      </PageContainer>
    </Layout>
  )
}

export default Register
