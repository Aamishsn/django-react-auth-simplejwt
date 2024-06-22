import React from 'react'
import FormLogin from "../components/FormLogin"

const Login = () => {
  return (

    <FormLogin route="/api/token/" method="login" />
  )
}

export default Login