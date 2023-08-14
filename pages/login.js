import { useState } from "react"
import Head from "next/head"
import Layout from "@/components/layout/layout"
import Link from "next/link"
import styles from "../styles/Form.module.css"
// import Image from "next/image"
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi"
import { FaGoogle, FaInstagram, FaApple } from "react-icons/fa6"
import { signIn } from "next-auth/react"
import { useFormik } from "formik"
import loginValidate from "@/lib/validate"
import { useRouter } from "next/router"
import signInCallback from "@/utils/signInCallback"

export default function Login() {
  const [show, setShow] = useState()
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: loginValidate,
    onSubmit,
  })

  // async function onSubmit(values) {
  //   const status = await signIn("credentials", {
  //     redirect: false,
  //     email: values.email,
  //     password: values.password,
  //     callbackUrl: "/",
  //   })

  //   if (status.ok) {
  //     router.push(status.url)
  //   }
  // }

  async function onSubmit(values) {
    const callbackUrl = window.location.origin
    const status = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl,
    })

    if (status.ok) {
      await signInCallback({ email: values.email, provider: "credentials" }) // Update provider value as needed
      router.push(status.url)
    }
  }

  // Google Handler function - could also pass this directly to the onClick function as an anonymous function
  // async function handleGoogleSignIn() {
  //   signIn("google", { callbackUrl: "http://localhost:3000" })
  // }

  async function handleGoogleSignIn() {
    const callbackUrl = window.location.origin
    signIn("google", { callbackUrl })
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
          <div
            className={`${styles.input_group} ${
              formik.errors.email && formik.touched.email
                ? "border-2 border-rose-600"
                : "border border-gray-300"
            }`}
          >
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
          {formik.errors.email && formik.touched.email && (
            <span className="text-rose-500">{formik.errors.email}</span>
          )}
          <div
            className={`${styles.input_group} ${
              formik.errors.password && formik.touched.password
                ? "border-2 border-rose-600"
                : "border border-gray-300"
            }`}
          >
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
          {formik.errors.password && formik.touched.password && (
            <span className="text-rose-500">{formik.errors.password}</span>
          )}
          {/* login buttons */}
          <div className="input-button">
            <button type="submit">Login</button>
          </div>
          <div>
            <button onClick={() => signIn("instagram")} type="button">
              Sign in with Instagram
              <span className="icon flex items-center px-4">
                <FaInstagram size={25} />
              </span>
              {/* <Image
                src={"/assets/instagram.svg"}
                width={25}
                height={25}
                alt="Instagram logo"
              ></Image> */}
            </button>
          </div>
          <div>
            {/* only want one 'submit' button inside form */}
            <button type="button" onClick={handleGoogleSignIn}>
              Sign in with Google
              <span className="icon flex items-center px-4">
                <FaGoogle size={20} />
              </span>
              {/* <Image
                src={"/assets/google.svg"}
                width={20}
                height={20}
                alt="Google logo"
              ></Image> */}
            </button>
          </div>
          <div>
            <button type="button">
              Sign in with Apple
              <span className="icon flex items-center px-4">
                <FaApple size={25} />
              </span>
              {/* <Image
                src={"/assets/apple.svg"}
                width={25}
                height={25}
                alt="Apple logo"
              ></Image> */}
            </button>
          </div>

          {/* bottom */}
          <p className="text-center text-gray-400">
            Do not have an account yet?
            <Link href={"/register"} className="text-blue-700">
              {" "}
              Sign Up
            </Link>
          </p>
        </form>
      </section>
    </Layout>
  )
}
