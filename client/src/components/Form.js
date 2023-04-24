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
      setForm({name:"",URL:""})
    }
  }

  return (
    <form id='form' onSubmit={onFormSubmit}>
      <div className='form-fields'>
        <div className='form-name'>
          <label>Name</label>
          <input type='text' name='name' onChange={handleChange}></input>
        </div>
        <div className='form-url'>
          <label>URL</label>
          <input type='text' name='URL' onChange={handleChange}></input>
        </div>
        <button type='submit'><span className='btn-text'>Submit</span></button>
      </div>
    </form>
  )
}

export default Form