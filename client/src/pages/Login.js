import React from 'react'
import { useState } from 'react'

function Login() {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  })

  const handleInputChange = (event) => {
    setLoginForm((form) => ({ ...form, [event.target.name]: event.target.value }))
  }

  const onFormSubmit = (event) => {
    event.preventDefault()
    
    if (loginForm.username === '' || loginForm.password === '' || loginForm === null) {
      window.alert("\nPlease enter a valid username or password:\n\nFields must not be blank.")
    } else {
      handleOnSubmit(loginForm)
    }
  }

  const handleOnSubmit = async (event) => {
    // Should implement jwt and user context? Will also need to add relation in DB for specific user's links
    await fetch(`/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' },body: JSON.stringify({ username: loginForm.username, password:loginForm.password })})
  }

  return (
    <div className="Login">
      <h1>Sign in</h1>
        <form onSubmit={onFormSubmit} >
            <section>
                <label for="username">Username</label>
                <input id="username" name="username" type="text" autocomplete="username" onChange={handleInputChange} required autofocus></input>
            </section>
            <section>
                <label for="current-password">Password</label>
                <input id="current-password" name="password" type="password" autocomplete="current-password" onChange={handleInputChange} required></input>
            </section>
            <button type="submit">Sign in</button>
        </form>
    </div>
  )
}

export default Login
