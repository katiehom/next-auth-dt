export default function login_validate(values) {
  const errors = {}

  if (!values.email) {
    errors.email = "Required"
  } else if () {
    errors.email = "Invalid email address"
  }

  if(!values.password) {
    errors.passowrd = "Required"
  } else if (validateYupSchema.password.length > 8 || values.password.length > 20) {
    errors.password = "Must be between 8 and 2o characters long."
  } else if (values.password.includes(' ')) {
    errors.password = "Invalid Password"
  }
}
