import { useState, useEffect } from 'react'
import Table from './Table';
import Form from './Form';

const LinkContainer = (props) => {
  const [links, setLinks] = useState([])

  useEffect(() => {
    const links = JSON.parse(localStorage.getItem('links'));
    if (links) {
     setLinks(links);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('links', JSON.stringify(links))
  }, [links])

  const handleRemove = (index) => {
    let newLinks = [...links]
    newLinks.splice(index, 1)
    setLinks(newLinks)
  }

  const handleSubmit = (form) => {
    setLinks((links) => [...links, form])
  }

  return (
    <div className="container">
      <h1>My Favorite Links</h1>
      <p>Add a new url with a name and link to the table.</p>
      <Table linkData={links} removeLink={handleRemove} />

      <br />

      <h3>Add New</h3>
      <Form handleSubmit={handleSubmit} />
    </div>
  )
}
export default LinkContainer