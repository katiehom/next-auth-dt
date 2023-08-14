import Users from "@/models/Schema" // Import your Mongoose User model

// async function handleSignIn(user, account, profile, providerName) {
//   // Access user information from the normalized user object
//   const newUser = {
//     email: user.email,
//     name: user.name,
//     image: user.image,
//     providerId: account.id,
//     provider: providerName,
//     profileField: profile.fieldName,
//     // Other relevant user information
//   }

//   try {
//     // Create the user in your MongoDB database
//     await Users.create(newUser)
//     return true // Return true to allow sign-in
//   } catch (error) {
//     console.error("Error creating user:", error)
//     return false // Return false to prevent sign-in if there was an error
//   }
// }

// export { handleSignIn }

async function handleSignIn(user, account, profile, providerName) {
  try {
    // Create a new user based on the Mongoose schema
    const newUser = await Users.create({
      email: user.email,
      username: user.name, // You can adjust this based on your data
      provider: providerName,
      providerId: account.id,
      profileField: profile.fieldName, // Replace fieldName with the actual field you want
      // Other relevant user information
    })

    console.log("New user created:", newUser)

    return true // Return true to allow sign-in
  } catch (error) {
    console.error("Error creating user:", error)
    return false // Return false to prevent sign-in if there was an error
  }
}

export { handleSignIn }
