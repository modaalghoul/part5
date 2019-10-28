import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

test('renders content',() => {
  const blog = {
    title:'learn js',
    author:'mohammad',
    likes: 5
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  component.debug()

  expect(component.container).toHaveTextContent(
    'learn js'
  )

})