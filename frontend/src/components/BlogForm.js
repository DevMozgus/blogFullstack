import React from "react";
import { createBlog } from "../reducers/blogReducers";
import { useDispatch } from "react-redux";
import { newNotification } from "../reducers/messageReducer";
import { useField } from "../hooks";
import styled from "styled-components";

const BlogForm = () => {
  const [title, resetTitle] = useField("text");
  const [author, resetAuthor] = useField("text");
  const [url, resetUrl] = useField("text");

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
    resetTitle();
    resetAuthor();
    resetUrl();
  };

  return (
    <>
      <h3>New Blog Entry</h3>
      {
        <form onSubmit={handleNewBlog}>
          <FormDiv>
            <div>
              Author
              <input
                placeholder="Enter Post Author"
                name="Author"
                id="author"
                {...author}
              />
            </div>
            <div>
              Title
              <input
                placeholder="Enter Post Title"
                name="Title"
                id="title"
                {...title}
              />
            </div>
            <div>
              Url
              <input
                placeholder="Enter Post URL"
                name="Url"
                id="url"
                {...url}
              />
            </div>
            <button className="importantButton" id="submit-blog" type="submit">
              Submit
            </button>
          </FormDiv>
        </form>
      }
    </>
  );
};

const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: flex-start;
  justify-content: space-between;

  div {
    display: flex;
    flex-direction: column;
    margin-bottom: 1vw;
    color: white;
  }

  input {
    margin-top: 2px;
  }
`;

export default BlogForm;
