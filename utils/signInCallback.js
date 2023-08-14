import { connectMongo } from "@/database/conn"
import Users from "@/models/Schema"

export default async function signInCallback(profile, account, metadata) {
  const { db } = await connectMongo()
  const user = await Users.findOneAndUpdate(
    { email: profile.email },
    {
      provider: profile.provider,
      providerId: profile.provider.id,
    },
    { upsert: true, new: true }
  )

  return Promise.resolve(true)
}
