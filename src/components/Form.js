import { useState } from 'react'

const Form = ({ handleSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    URL: ""
  })
  const handleChange = (event) => {
       setForm((form) => ({ ...form, [event.target.name]: event.target.value }))
  }

  const onFormSubmit = (event) => {
    event.preventDefault()
    handleSubmit(form)
  }

  return (
    <form onSubmit={onFormSubmit}>
      <label>Name</label>
      <input type='text' name='name' onChange={handleChange}></input>
      <label>URL</label>
      <input type='url' name='URL' onChange={handleChange}></input>
      <button type='submit'>Submit</button>
    </form>
  )
}

export default Form