import { useCallback, useEffect, useState } from "react"
import {
  Modal,
  List,
  Form,
  RadioGroup,
  Radio,
  useToaster,
  Message,
  Loader,
  Progress,
} from "rsuite"
import { useApi } from "../hooks/useApi"
import StatusMessage from "./StatusMessage"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"

const QuizModal = ({ open, onClose, quiz, post_id }) => {
  const api = useApi()
  const toaster = useToaster()
  const total = quiz.length
  const [loading, setLoading] = useState(false)
  const [current, setCurrent] = useState(0)
  const [question, setQuestion] = useState(quiz[current])
  const [answers, setAnswers] = useState({})
  const [percent, setPercent] = useState(0)
  const [response, setResponse] = useState(null)
  const { executeRecaptcha } = useGoogleReCaptcha()

  useEffect(() => setQuestion(quiz[current]), [current])
  useEffect(
    () =>
      setPercent((Object.values(answers).filter(a => a).length / total) * 100),
    [answers]
  )
  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) return
    return await executeRecaptcha("quizForm")
  }, [executeRecaptcha])

  useEffect(() => {
    handleReCaptchaVerify()
  }, [handleReCaptchaVerify])

  const submit = async () => {
    setLoading(true)
    setResponse(null)

    try {
      const token = await handleReCaptchaVerify()

      const payload = {
        post_id,
        token,
        answers: JSON.stringify(
          Object.entries(answers).map(([key, value]) => ({
            quiz_id: key,
            answer_id: value,
          }))
        ),
      }

      const { data } = await api.post(`/v1/participate`, payload)
      setResponse(data)
    } catch (error) {
      if (error?.response && error.response.status !== 401)
        setResponse(error?.response.data)
      else
        toaster.push(<Message type="error">Something went wrong...</Message>, {
          placement: "bottomCenter",
        })
    }
    setLoading(false)
  }

  const handleChange = ({ id }, index) => {
    setAnswers({ ...answers, [id]: index })
  }

  return (
    <Modal className="QuizModal" open={open} onClose={onClose}>
      <Modal.Header>
        <Modal.Title>
          <p className="text-primary">
            Questoin {current + 1} out of {total}
          </p>
          <p className="font-semibold text-2xl">{question.question}</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!response ? (
          <>
            {/* <Progress.Line
              className="mb-3 px-0"
              percent={percent}
              showInfo={false}
            /> */}

            <List
              key={question.id}
              className="mb-5 border-2 border-color-primary"
              hover
              bordered
            >
              {question.answers.map(answer => (
                <List.Item
                  key={answer.id}
                  className={{
                    selected: answers[question.id] === answer.id,
                    "text-lg p-5": true,
                  }}
                  onClick={() => handleChange(question, answer.id)}
                >
                  {answer.option}
                </List.Item>
              ))}
            </List>
            <div className="flex justify-between">
              <div className="flex gap-5">
                {/* {current > 0 && (
              <button className="btn" onClick={() => setCurrent(current - 1)}>
                Prev
              </button>
            )} */}
                {current < total - 1 && (
                  <button
                    className="btn"
                    onClick={() => setCurrent(current + 1)}
                    disabled={answers[question.id] === undefined}
                  >
                    Next
                  </button>
                )}
              </div>
              {current === total - 1 && (
                <button
                  className="btn"
                  onClick={submit}
                  disabled={answers[question.id] === undefined}
                >
                  Submit
                </button>
              )}
            </div>
          </>
        ) : (
          <StatusMessage
            status={response.status === "OK" ? "success" : "error"}
          >
            {response.received_points && (
              <p className="font-bold text-4xl text-center mb-0">
                Score:{" "}
                {(response.received_points / response.maximum_points) * 100}%
              </p>
            )}
            <div
              className="font-semibold text-xl text-center mt-5"
              dangerouslySetInnerHTML={{ __html: response?.meta.message }}
            ></div>
          </StatusMessage>
        )}
      </Modal.Body>
      {loading && (
        <Loader
          backdrop
          size="md"
          content="Please be patient, this could take some time to process."
        />
      )}
    </Modal>
  )
}

export default QuizModal
