
export default function login(req, res) {
  const { cookies, body } = req
  console.log({ cookies, body })
  res.status(200)
}