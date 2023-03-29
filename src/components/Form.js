import { useState } from 'react'

const Form = ({ handleSubmit }) => {
  const [form, setForm] = useState({name:"",URL:""})
  const handleChange = (event) => {
       setForm((form) => ({ ...form, [event.target.name]: event.target.value }))
  }

  const onFormSubmit = (event) => {
    event.preventDefault()
    
    let url = form.URL
    if (form.name === '' || form.url === '' || form === null) {
      window.alert("\nPlease enter a valid Name or URL:\n\nName field must not be blank. URL must start with 'https://'")
    } else if (!url.startsWith("http")) {
      window.alert("\nPlease enter a valid URL:\n\nURL must start with 'https://'")
    } else {
      handleSubmit(form)
      document.getElementById('form').reset()
      setForm({})
    }
  }

  return (
    <form id='form' onSubmit={onFormSubmit}>
      <label>Name</label>
      <input type='text' name='name' onChange={handleChange}></input>
      <label>URL</label>
      <input type='text' name='URL' onChange={handleChange}></input>
      <button type='submit'>Submit</button>
    </form>
  )
}

export default Form