import React from 'react'

const Error = ({ error }) => {
  if (error === null) {
    return null
  }

  return (
    <div className='alert alert-danger'>
      <strong>Fehler:</strong> {error.toString()}
    </div>
  )
}

export default Error
