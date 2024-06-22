import React from 'react'
import FormLogin from "../components/FormLogin"

const Register = () => {
  return (
    <FormLogin route="/api/user/register/" method="register" />
  )
}

export default Register