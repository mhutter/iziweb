/* global test, expect */
import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

test('renders Journal', () => {
  const { getByText } = render(<App />)
  const linkElement = getByText(/journal/i)
  expect(linkElement).toBeInTheDocument()
})
