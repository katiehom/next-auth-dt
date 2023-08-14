import { getSession } from "next-auth/client"
import mongoose from "mongoose"

import { PostSchema } from "../../components/PostForm"
import User from "../../models/User" // Assuming you have a User model
import Post from "../../models/Post" // Assuming you have a Post model

mongoose.connect("mongodb://localhost:27017/your-db-name", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end() // Method Not Allowed
  }

  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ unauthorized: true })
  }

  try {
    const user = await User.findOne({ _id: session.user.id })

    if (!user) {
      return res.status(401).json({ unauthorized: true })
    }

    const valid = await PostSchema.isValid(req.body)

    if (!valid) {
      return res.status(400).json({ error: "Validation error" })
    }

    const newPost = new Post({
      userId: user._id,
      title: req.body.title,
      body: req.body.body,
    })

    const savedPost = await newPost.save()

    res.status(201).json(savedPost)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Something went wrong" })
  }
}
