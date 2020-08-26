import React from 'react'

interface Props {
  error: any
}

const Error: React.FC<Props> = ({ error }) => {
  if (error !== null) {
    return (
      <div className='alert alert-danger'>
        <strong>Fehler:</strong> {error.toString()}
      </div>
    )
  }
  return null
}

export default Error
