import connectMongo from "@/database/conn"
import Users from "@/models/Schema"
import { hash } from "bcryptjs"

export default async function handler(req, res) {
  try {
    await connectMongo()

    // only post method is accepted
    if (req.method === "POST") {
      if (!req.body) {
        return res.status(404).json({ error: "No form data" })
      }

      const { username, email, password } = req.body

      // check duplicate users
      const checkExisting = await Users.findOne({ email })

      if (checkExisting) {
        return res.status(400).json({ message: "Sorry, there's been an error" })
      }

      // hash password
      const hashedPassword = await hash(password, 12)
      const newUser = await Users.create({
        username,
        email,
        password: hashedPassword,
      })

      return res.status(201).json({ status: true, user: newUser })
    } else {
      return res
        .status(500)
        .json({ message: "HTTP method not valid only POST accepted" })
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" })
  }
}
