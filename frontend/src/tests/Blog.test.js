import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blogs from '../components/Blogs'
import Blog from '../components/Blog'
import Togglable from '../components/Togglable'
import BlogForm from '../components/BlogForm'

describe('blogs function correctly', () => {
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

    const post = blogs[0]
    const component = render(
      <Blog blog={post}
        user={user}
        addLike={mockHandler}
        deleteBlog={mockHandler} />
    )

    const button = component.getByText(
      'like'
    )
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
  })
})

describe('Togglable functions correctly', () => {
  let component

  beforeEach(() => {
    component = render(
      <Togglable label1={'show'} label2={'hide'}>
        <div className="testDiv" >
          <p>test</p>
        </div>
      </Togglable>
    )
  })

  test('renders its children', () => {
    expect(
      component.container.querySelector('.testDiv')
    ).toBeDefined()
  })

  test('Content is hidden at start', () => {
    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('content is displayed on click', () => {
    const button = component.getByText('show')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('content is hidden again on click', () => {
    const button = component.getByText('show')
    fireEvent.click(button)

    const secondButton = component.getByText('hide')
    fireEvent.click(secondButton)

    //console.log(prettyDOM(component.container))

    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })
})
