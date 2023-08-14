import { useState } from "react"
import Head from "next/head"
import Layout from "@/components/layout/layout"
import Link from "next/link"
import styles from "../styles/Form.module.css"
import Image from "next/image"
import { HiOutlineUser, HiAtSymbol, HiFingerPrint } from "react-icons/hi"
import { useFormik } from "formik"
import { registerValidate } from "@/lib/validate"
import { useRouter } from "next/router"

export default function Register() {
  const [show, setShow] = useState({ password: false, cPassword: false })
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      cPassword: "",
    },
    validate: registerValidate,
    onSubmit,
  })

  async function onSubmit(values) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }

    await fetch("http://localhost:3000/api/auth/signup", options)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          router.push("http://localhost:3000")
        }
      })
  }

  return (
    <Layout>
      <Head>
        <title>Register</title>
      </Head>
      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-4">Register</h1>
          <p className="w-3/4 mx-auto text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores,
            officia?
          </p>
        </div>
        {/* form */}
        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          <div
            className={`${styles.input_group} ${
              formik.errors.username && formik.touched.username
                ? "border-2 border-rose-600"
                : "border border-gray-300"
            }`}
          >
            <input
              type="text"
              name="username"
              placeholder="Username"
              className={styles.input_text}
              {...formik.getFieldProps("username")}
            />
            <span className="icon flex items-center px-4">
              <HiOutlineUser size={25} />
            </span>
          </div>
          {formik.errors.username && formik.touched.username && (
            <span className="text-rose-500">{formik.errors.username}</span>
          )}
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
              type={`${show.password ? "text" : "password"}`}
              name="password"
              placeholder="Password"
              className={styles.input_text}
              {...formik.getFieldProps("password")}
            />
            <span
              className="icon flex items-center px-4"
              onClick={() => setShow({ ...show, password: !show.password })}
            >
              <HiFingerPrint size={25} />
            </span>
          </div>
          {formik.errors.password && formik.touched.password && (
            <span className="text-rose-500">{formik.errors.password}</span>
          )}
          <div
            className={`${styles.input_group} ${
              formik.errors.cPassword && formik.touched.cPassword
                ? "border-2 border-rose-600"
                : "border border-gray-300"
            }`}
          >
            <input
              type={`${show.cPassword ? "text" : "password"}`}
              name="cPassword"
              placeholder="Confirm Password"
              className={styles.input_text}
              {...formik.getFieldProps("cPassword")}
            />
            <span
              className="icon flex items-center px-4"
              onClick={() => setShow({ ...show, cPassword: !show.cPassword })}
            >
              <HiFingerPrint size={25} />
            </span>
          </div>
          <span></span>
          {formik.errors.cPassword && formik.touched.cPassword && (
            <span className="text-rose-500">{formik.errors.cPassword}</span>
          )}
          {/* login buttons */}
          <div className="input-button">
            <button type="submit">Sign Up</button>
          </div>

          {/* bottom */}
          <p className="text-center text-gray-400">
            Already have an account?
            <Link href={"/login"} className="text-blue-700">
              {" "}
              Sign In
            </Link>
          </p>
        </form>
      </section>
    </Layout>
  )
}
