import React from 'react'

function Login() {
  return (
    <div className="Login">
      <h1>Sign in</h1>
        <form action="/login/password" method="post">
            <section>
                <label for="username">Username</label>
                <input id="username" name="username" type="text" autocomplete="username" required autofocus></input>
            </section>
            <section>
                <label for="current-password">Password</label>
                <input id="current-password" name="password" type="password" autocomplete="current-password" required></input>
            </section>
            <button type="submit">Sign in</button>
        </form>
    </div>
  )
}

export default Login
