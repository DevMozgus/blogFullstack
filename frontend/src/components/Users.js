import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Spinner } from "reactstrap"

const Users = () => {
  const users = useSelector((state) => state.userbase);

  if (!users) return <Spinner id="spinner" />

  return (
    <section className="users">
      <h3>Users</h3>
      {users.map((user, index) => {
        const blogs = user.blogs.length;
        return (
          <p key={index}>
            <Link to={`/users/${user.id}`}>
              <b>{user.username}</b> created {blogs} blogs
            </Link>
          </p>
        );
      })}
    </section>
  );
};

export default Users;
