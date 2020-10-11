import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { filterLikes, filterComments } from "../reducers/blogReducers"
import { Spinner } from "reactstrap"

const Blogs =  () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const direct = user ? "/blogs/create" : "/login";
  const [ filter, setFilter ] = useState("");
  const dispatch = useDispatch()

  const toggleFilter = (type) => {
    if (type === "likes") {
      dispatch(filterLikes())
      setFilter("likes")
    } else if (type === "comments") {
      dispatch(filterComments())
      setFilter("comments")
    }
  }

  if (!blogs) return <Spinner id="spinner" />


  return (
    <>
      <div className="blogFilter">
        <label>Sort By: </label>
        <button id={filter === "likes"? "activeFilter": null} 
        onClick={() => toggleFilter("likes")}>Likes</button>
        <button id={filter === "comments"? "activeFilter": null}
        onClick={() => toggleFilter("comments")}>Comments</button>
        <Link to={direct}>Submit</Link>
      </div>

      <section className="blogs">
      {blogs.map((blog, index) => {
        const blogId = `blogNum${index}`;
        return (
          <section  id={blogId} key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              <h3 >{blog.title}</h3>
            </Link>
          <div >
          <label>{blog.likes} like/s</label>
          <label>{blog.comments.length} comment/s</label>
          <label>By u/{blog.user.username}</label>
          </div>
          </section>
        );
      })}
      </section>
    </>
  );
};


export default Blogs;
