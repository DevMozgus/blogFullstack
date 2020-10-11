import React from "react";
import { createBlog } from "../reducers/blogReducers";
import { useDispatch } from "react-redux";
import { newNotification } from "../reducers/messageReducer";
import { useField } from "../hooks";
import { useHistory } from "react-router-dom";

const BlogForm = () => {
  const [title, resetTitle] = useField("text");
  const [author, resetAuthor] = useField("text");
  const [url, resetUrl] = useField("url");
  const history = useHistory()
  const dispatch = useDispatch();

  const handleNewBlog = async (event) => {
    event.preventDefault();
    const newEntry = {
      title: title.value,
      author: author.value,
      url: url.value,
      likes: 0,
    };
    try {
      dispatch(createBlog(newEntry));
      const success = {
        success: "Successfuly added blog!",
      };
      dispatch(newNotification(success, 3));
    } catch (err) {
      const error = {
        error: "Blog entry failed",
        err: err,
      };
      dispatch(newNotification(error));
    }
    history.push('/')
  };

  const resetForm = () => {
    resetTitle();
    resetAuthor();
    resetUrl();
  }

  return (
    <section className="blogbox">
      <h3 className="formelement">New Blog Entry</h3>
      {
        <form  onSubmit={handleNewBlog}>
            <div id="formauthor" className="formelement" >
              <label>Author</label>
              <input
                placeholder="Notreal McFake"
                name="Author"
                id="author"
                {...author}
              />
              </div>
              <div id="formtitle" className="formelement" >
              <label>Title</label>
              <input
                placeholder="Whoever created this site must be a genius"
                name="Title"
                id="title"
                {...title}
              />
              </div>
              <div id="formurl" className="formelement" >
              <label>Url</label>
              <input
                placeholder="http://www.totallylegitandrealwebsite.com"
                name="Url"
                id="url"
                {...url}
              />
              </div>
            <div className="formelement formbuttons">
            <button className="importantButton" id="submit-blog" type="submit">
              Submit
            </button>
            <button  onClick={resetForm} type="button">Reset</button>
            </div>
        </form>
      }
    </section>
  );
};


export default BlogForm;
