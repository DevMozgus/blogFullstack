import React from "react";
import { useParams } from "react-router-dom";
import { newNotification } from "../reducers/messageReducer";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog, removeBlog } from "../reducers/blogReducers";
import Comment from "./Comment";
import styled from "styled-components";

const Blog = () => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const blogs = useSelector((state) => state.blogs);
  const blog = blogs.find((blog) => blog.id === id);

  const addLike = async (id) => {
    try {
      dispatch(likeBlog(blog));
    } catch (err) {
      const error = {
        error: "Failed to update blog",
        err: err,
      };
      dispatch(newNotification(error, 3));
    }
  };

  const deleteBlog = async (id, title) => {
    if (window.confirm(`Remove blog '${title}'?`)) {
      try {
        const blog = blogs.find((blog) => blog.id === id);
        dispatch(removeBlog(blog));
      } catch (err) {
        const error = {
          error: "Failed to delete blog",
          err: err,
        };
        dispatch(newNotification(error, 3));
      }
    }
  };

  const user = useSelector((state) => state.user);

  if (!blog) return null;

  return (
    <>
      <BlogDiv>
        <h3>{blog.title}</h3>
        <p>Author: {blog.author}</p>
        <p>Link: {blog.url}</p>
        <p>Likes: {blog.likes}</p>
        <div>
          {user ? (
            <>
              <button onClick={() => addLike(blog.id)}>like</button>
            </>
          ) : null}
          {user && (user.username === blog.user.username || blog.user) ? (
            <button onClick={() => deleteBlog(blog.id, blog.title)}>
              delete
            </button>
          ) : null}
        </div>
      </BlogDiv>
      <Comment blog={blog} />
    </>
  );
};

const BlogDiv = styled.div`
  p {
    color: white;
  }

  div {
    border-top: solid 2px;
    padding-top: 5px;
    border-color: #0f3460;
  }
  button {
    margin-right: 15px;
    border: none;
  }
  button:hover {
    background-color: rgba(0, 0, 0, 0);
    text-decoration: underline;
    text-decoration-color: #e94560;
  }
`;

export default Blog;
