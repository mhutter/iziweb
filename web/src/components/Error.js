import React from 'react'

const Error = ({ error }) => {
  if (error) {
    return (
      <div className='alert alert-danger'>
        <strong>Fehler:</strong> {error.toString()}
      </div>
    )
  }
  return null
}

export default Error
