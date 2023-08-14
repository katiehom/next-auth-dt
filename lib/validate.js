export default function loginValidate(values) {
  const errors = {}

  // validate email
  if (!values.email) {
    errors.email = "Required"
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address"
  }

  // validate password
  if (!values.password) {
    errors.password = "Required"
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = "Must be between 8 and 20 characters long."
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid Password"
  }

  return errors
}

export function registerValidate(values) {
  const errors = {}

  // validate username
  if (!values.username) {
    errors.username = "Required"
  } else if (values.username.includes(" ")) {
    errors.username = "Invalid username"
  }

  // validate email
  if (!values.email) {
    errors.email = "Required"
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address"
  }

  // validate password
  if (!values.password) {
    errors.password = "Required"
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = "Must be between 8 and 20 characters long"
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid Password"
  }

  // validate confirm password
  if (!values.cPassword) {
    errors.cPassword = "Required"
  } else if (values.password !== values.cPassword) {
    errors.cPassword = "Passwords do not match"
  } else if (values.cPassword.length < 8 || values.cPassword.length < 20) {
    errors.cPassword = "Must be between 8 and 20 characters long."
  } else if (values.cPassword.includes(" ")) {
    errors.cPassword = "Invalid Password"
  }

  return errors
}
