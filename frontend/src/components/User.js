import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const User = () => {
  const id = useParams().id;
  const users = useSelector((state) => state.userbase);
  const user = users.find((user) => user.id === id);

  return (
    <>
      <h3>{user.username}</h3>
      <ul>
        {user.blogs.map((blog, index) => {
          return <li key={index}>{blog.title}</li>;
        })}
      </ul>
    </>
  );
};

export default User;
