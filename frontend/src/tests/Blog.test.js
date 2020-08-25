import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blogs from '../components/Blogs'
import Blog from '../components/Blogs'

const blogs = [{
  title: 'Component testing is done with react-testing-library',
  author: 'test',
  url: 'nonexistent.com',
  likes: 2,
  user: {
    username: 'tester'
  }
}]

test('renders content', () => {

  const component = render(
    <Blogs blogs={blogs} />
  )

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )

  const div = component.container.querySelector('.blogs')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )

  //console.log(prettyDOM(div))
})

test('clicking button calls event handler', () => {
  const mockHandler = jest.fn()

  const user = {
    username: 'tester'
  }
  const component = render(
    <Blog blog={blogs[0]} user={user} addLike={mockHandler} deleteBlog={mockHandler} />
  )

  const button = component.getByText(
    'like'
  )
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})