import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const User = () => {
  const id = useParams().id;
  const users = useSelector((state) => state.userbase);
  const user = users.find((user) => user.id === id);
  
  if (!users || !user) return null

  return (
    <section className="user">
      <h3>User '{user.username}' blogs:</h3>
      <ul>
        {user.blogs.length === 0 ?
        <p>No Blogs!</p>:
        user.blogs.map((blog, index) => {
          return <li key={index}>{blog.title}</li>;
        })}
      </ul>
    </section>
  );
};

export default User;
