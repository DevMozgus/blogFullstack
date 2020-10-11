import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { newNotification } from "../reducers/messageReducer";
import { useDispatch, useSelector } from "react-redux";
import { initBlogs, likeBlog, removeBlog } from "../reducers/blogReducers";
import Comment from "./Comment";
import { Spinner } from "reactstrap"

const Blog = () => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const blogs = useSelector((state) => state.blogs);
  const history = useHistory()

  const blog = blogs.find((blog) => blog.id === id)

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
        await dispatch(removeBlog(blog));
        await dispatch(initBlogs())
      } catch (err) {
        const error = {
          error: "Failed to delete blog",
          err: err,
        };
        dispatch(newNotification(error, 3));        
      }
      history.push('/')
    }
  };

  const user = useSelector((state) => state.user);

  if (!blog) return <Spinner id="spinner" />


  return (
    <>
      <section className="blogpost">
        <h3>{blog.title}</h3>
        <div className="bloginfo">
        <p>{blog.url}</p>
        <p>{blog.likes} like/s</p>
        <p>By {blog.author}</p>
        </div>
        <div className="blogoptions">
          {user ? (
            <>
              <button onClick={() => addLike(blog.id)}>like</button>
            </>
          ) : null}
          {user && (user.username === blog.user.username) ? (
            <button onClick={() => deleteBlog(blog.id, blog.title)}>
              delete
            </button>
          ) : null}
        </div>
      </section>
      <Comment blog={blog} />
    </>
  );
};


export default Blog;
