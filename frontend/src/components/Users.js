import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Users = () => {
  const users = useSelector((state) => state.userbase);
  if (!users) return null;

  return (
    <>
      <h3>Users</h3>
      {users.map((user, index) => {
        const blogs = user.blogs.length;
        return (
          <p key={index}>
            <Link to={`/users/${user.id}`}>
              {user.username} created {blogs} blogs
            </Link>
          </p>
        );
      })}
    </>
  );
};

export default Users;
