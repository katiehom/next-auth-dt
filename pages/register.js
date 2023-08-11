import { useState } from "react"
import Head from "next/head"
import Layout from "@/components/layout/layout"
import Link from "next/link"
import styles from "../styles/Form.module.css"
import Image from "next/image"
import { HiOutlineUser, HiAtSymbol, HiFingerPrint } from "react-icons/hi"
import { useFormik } from "formik"

export default function Register() {
  const [show, setShow] = useState({ password: false, cPassword: false })

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      cPassword: "",
    },
    onSubmit,
  })

  async function onSubmit(values) {
    console.log(initialValues)
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
          <div className={styles.input_group}>
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
          <div className={styles.input_group}>
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
