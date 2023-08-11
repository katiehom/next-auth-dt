import { useState } from "react"
import Image from "next/image"
import { Inter } from "next/font/google"
import Head from "next/head"
import Link from "next/link"
import { getSession, useSession, signOut } from "next-auth/react"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  // will call NextAuth session and store to session variable
  // const [session, setSession] = useState(true);

  const { data: session } = useSession()

  function handleSignOut() {
    signOut()
  }

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      {/* {Guest()} */}
      {/* {AuthorizedUser()} */}

      {session ? AuthorizedUser({ session, handleSignOut }) : Guest()}
    </>
  )
}

// Guest
function Guest() {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">Guest Homepage</h3>
      <div className="flex justify-center">
        <Link
          href={"/login"}
          className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray"
        >
          Sign In
        </Link>
      </div>
    </main>
  )
}

// Authorized User
function AuthorizedUser({ session, handleSignOut }) {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">Authorized User Homepage</h3>
      <div className="details">
        <h5>{session.user.name}</h5>
        <h5>{session.user.email}</h5>
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleSignOut}
          className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 bg-gray-50"
        >
          Sign Out
        </button>
      </div>
      <div className="flex justify-center">
        <Link
          href={"/profile"}
          className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray"
        >
          Profile Page
        </Link>
      </div>
    </main>
  )
}

// This function will generate the page only when we have the session in the cookies
// could pass 'context' to getSSP and then pass 'context.req' to getSession or just destructure
export async function getServerSideProps({ req }) {
  const session = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}
