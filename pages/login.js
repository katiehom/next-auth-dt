import { useState } from "react"
import Head from "next/head"
import Layout from "@/components/layout/layout"
import Link from "next/link"
import styles from "../styles/Form.module.css"
import Image from "next/image"
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi"
import { signIn, signOut } from "next-auth/react"
import { useFormik } from "formik"

export default function Login() {
  const [show, setShow] = useState()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
  })

  async function onSubmit(values) {
    console.log(values)
  }

  // Google Handler function - could also pass this directly to the onClick function as an anonymous function
  async function handleGoogleSignIn() {
    signIn("google", { callbackUrl: "http://localhost:3000" })
  }

  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>
      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-4">Explore</h1>
          <p className="w-3/4 mx-auto text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores,
            officia?
          </p>
        </div>
        {/* form */}
        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          <div className={styles.input_group}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={styles.input_text}
              {...formik.getFieldProps("email")}
            />
            <span className="icon flex items-center px-4">
              <HiAtSymbol size={25} />
            </span>
          </div>
          <div className={styles.input_group}>
            <input
              type={`${show ? "text" : "password"}`}
              name="password"
              placeholder="Password"
              className={styles.input_text}
              {...formik.getFieldProps("password")}
            />
            <span
              className="icon flex items-center px-4"
              onClick={() => setShow(!show)}
            >
              <HiFingerPrint size={25} />
            </span>
          </div>
          {/* login buttons */}
          <div className="input-button">
            <button type="submit">Login</button>
          </div>
          <div>
            <button onClick={() => signIn("instagram")} type="button">
              Sign in with Instagram
              <Image
                src={"/assets/instagram.svg"}
                width={25}
                height={25}
                alt="Instagram logo"
              ></Image>
            </button>
          </div>
          <div>
            {/* only want one 'submit' button inside form */}
            <button type="button" onClick={handleGoogleSignIn}>
              Sign in with Google
              <Image
                src={"/assets/google.svg"}
                width={20}
                height={20}
                alt="Google logo"
              ></Image>
            </button>
          </div>
          <div>
            <button type="button">
              Sign in with GitHub
              <Image
                src={"/assets/github.svg"}
                width={25}
                height={25}
                alt="GitHub logo"
              ></Image>
            </button>
          </div>
        </form>

        {/* bottom */}
        <p className="text-center text-gray-400">
          Do not have an account yet?
          <Link href={"/register"} className="text-blue-700">
            {" "}
            Sign Up
          </Link>
        </p>
      </section>
    </Layout>
  )
}
