import { React } from 'react'

const TableHeader = () => {
  return (
    <thead className='head'>
      <tr>
        <th>Name</th>
        <th>URL</th>
        <th>Remove</th>
      </tr>
    </thead>
  )
}

const TableBody = ({ linkData, removeLink }) => {
  const rows = linkData?.map((row, index) => {

    return (
      <tr key={index}>
        <td>{row.name}</td>
        <td>
          <a href={row.url} rel='noreferrer' target='_blank' >{row.url}</a>
        </td>
        <td>
          <button className='delete-btn' onClick={() => removeLink(row.id)}><span className='btn-text'>Delete</span></button>
        </td>
      </tr>
    )
  })

  return <tbody>{rows}</tbody>
}

const Table = ({ linkData, removeLink }) => {
    return (
      <table>
        <TableHeader />
        <TableBody linkData={linkData} removeLink={removeLink} />
      </table>
    )
}

export default Table