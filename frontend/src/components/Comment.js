import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useField } from "../hooks";
import { commentBlog } from "../reducers/blogReducers";
import { Spinner } from "reactstrap"

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
  if (!blog) return <Spinner id="spinner" />

  return (
    <>
      <section className="comments">
        {user ?
        <div>
        <form onSubmit={handleNewComment}>

          <textarea placeholder="What are your thoughts?"
            wrap="off"
            name="Comment"
            id="comment"
            {...comment}
            ></textarea>
          <button className="importantButton" id="submit-comment" type="submit">
            Submit
          </button>
        </form>
        </div>
        : null}
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
      </section>
    </>
  );
};


export default Comment;
