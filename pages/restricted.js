import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]"

// eslint did not like this as I was exporting before assigning the arrow function to a variable
// export default async (req, res) => {

const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions)

  if (session) {
    res.send({
      content:
        "This is protected content. You can access this content because you are signed in.",
    })
  } else {
    res.send({
      error:
        "You must be signed in to view the protected content on this page.",
    })
  }
}
