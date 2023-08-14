import { Schema, model, models } from "mongoose"

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  provider: String, // Store the name of the authentication provider (Google, Apple, etc.)
  providerId: String, // Store the provider-specific identifier
  // profileField: String, // Additional field from user's profile (adjust the data type as needed)
  // Other fields you want to include
})

// If you already have a user model, then use that, otherwise create it
const Users = models.user || model("user", userSchema)

export default Users

// const postSchema = new Schema( {
//   id: String, // how to add a default with a random id?
//   userId: String,
//   user: Users, // relate to userSchema
//   createdAt: DateTime, // default now()
//   updatedAt: DateTime,

// })

const postSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  title: String,
  body: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

const Post = models.post || model("post", postSchema)

export { Post }
