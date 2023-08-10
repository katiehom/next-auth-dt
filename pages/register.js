import { useState } from 'react';
import Head from 'next/head';
import Layout from '@/components/layout/layout';
import Link from 'next/link';
import styles from '../styles/Form.module.css';
import Image from 'next/image';
import { HiOutlineUser, HiAtSymbol, HiFingerPrint } from 'react-icons/hi';

export default function Register() {
  const [show, setShow] = useState({ password: false, cPassword: false });

  return (
    <Layout>
      <Head>
        <title>Register</title>
      </Head>
      <section className='w-3/4 mx-auto flex flex-col gap-10'>
        <div className='title'>
          <h1 className='text-gray-800 text-4xl font-bold py-4'>Register</h1>
          <p className='w-3/4 mx-auto text-gray-400'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores,
            officia?
          </p>
        </div>
        {/* form */}
        <form className='flex flex-col gap-5'>
          <div className={styles.input_group}>
            <input
              type='text'
              name='username'
              placeholder='Username'
              className={styles.input_text}
            />
            <span className='icon flex items-center px-4'>
              <HiOutlineUser size={25} />
            </span>
          </div>
          <div className={styles.input_group}>
            <input
              type='email'
              name='email'
              placeholder='Email'
              className={styles.input_text}
            />
            <span className='icon flex items-center px-4'>
              <HiAtSymbol size={25} />
            </span>
          </div>
          <div className={styles.input_group}>
            <input
              type={`${show.password ? 'text' : 'password'}`}
              name='password'
              placeholder='Password'
              className={styles.input_text}
            />
            <span
              className='icon flex items-center px-4'
              onClick={() => setShow({ ...show, password: !show.password })}
            >
              <HiFingerPrint size={25} />
            </span>
          </div>
          <div className={styles.input_group}>
            <input
              type={`${show.cPassword ? 'text' : 'password'}`}
              name='cPassword'
              placeholder='Confirm Password'
              className={styles.input_text}
            />
            <span
              className='icon flex items-center px-4'
              onClick={() => setShow({ ...show, cPassword: !show.cPassword })}
            >
              <HiFingerPrint size={25} />
            </span>
          </div>
          {/* login buttons */}
          <div className='input-button'>
            <button type='submit'>Login</button>
          </div>
          <div>
            {/* only want one 'submit' button inside form */}
            <button type='button'>
              Sign in with Google
              <Image src={'/assets/google.svg'} width={20} height={20}></Image>
            </button>
          </div>
          <div>
            <button type='button'>
              Sign in with Github
              <Image src={'/assets/github.svg'} width={25} height={25}></Image>
            </button>
          </div>
        </form>

        {/* bottom */}
        <p className='text-center text-gray-400'>
          Already have an account?
          <Link href={'/login'} className='text-blue-700'>
            {' '}
            Sign In
          </Link>
        </p>
      </section>
    </Layout>
  );
}
