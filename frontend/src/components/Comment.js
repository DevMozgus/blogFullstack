import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useField } from "../hooks";
import { commentBlog } from "../reducers/blogReducers";

const Comment = ({ blog }) => {
  const [comment, resetComment] = useField("text");

  const dispatch = useDispatch();
  const handleNewComment = async (event) => {
    event.preventDefault();
    try {
      const updatedComments = { comments: blog.comments.concat(comment.value) };
      await dispatch(commentBlog({ ...blog, ...updatedComments }));
    } catch (err) {
      console.log(err);
    }
    resetComment();
  };

  const user = useSelector((state) => state.user);

  return (
    <>
      <CommentsDiv>
        <h5>
          Comment as <b>{user.username}</b>
        </h5>
        <form onSubmit={handleNewComment}>
          <input
            placeholder="Enter your comment..."
            name="Comment"
            id="comment"
            {...comment}
          />
          <button className="importantButton" id="submit-comment" type="submit">
            Submit Comment
          </button>
        </form>
        {blog.comments ? (
          <ul>
            {blog.comments.map((comment, index) => (
              <li key={index}>
                <label>Anon</label>
                <p>{comment}</p>
              </li>
            ))}
          </ul>
        ) : null}
      </CommentsDiv>
    </>
  );
};

const CommentsDiv = styled.div`
  h5 {
    color: white;
  }
  b {
    text-decoration: underline;
    text-decoration-color: #0f3460;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  button {
    width: 20%;
    margin-top: 15px;
  }

  ul {
    list-style-type: none;
  }

  ul li {
    border: solid 1px;
    border-radius: 4px;
    border-color: #0f3460;
    margin: 1em;
    padding: 1em;
    display: flex;
    flex-direction: column;
  }

  p {
    margin-left: 1em;
  }

  label {
    color: rgba(255, 255, 255, 0.5);
  }
`;

export default Comment;
