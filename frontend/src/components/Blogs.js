import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const sortedBlogs = blogs.sort((curr, next) => next.likes - curr.likes);

  const direct = user ? "/blogs/create" : "/login";

  return (
    <>
      <CreateBlog>
        <Link to={direct}>Make your own blog?</Link>
      </CreateBlog>

      {sortedBlogs.map((blog, index) => {
        const blogId = `blogNum${index}`;
        return (
          <Blog id={blogId} key={blog.id}>
            <LinkDiv>
              <Link to={`/blogs/${blog.id}`}>
                <h3>{blog.title}</h3>
              </Link>
            </LinkDiv>
            <BlogInfo>{blog.likes} like/s</BlogInfo>
            <BlogInfo>By u/{blog.user.username}</BlogInfo>
          </Blog>
        );
      })}
    </>
  );
};

const BlogInfo = styled.h4`
  margin-right: 1em;
`;

const LinkDiv = styled.div`
  width: 100%;

  h3 {
    color: white;
  }
`;

const Blog = styled.div`
  height: 5vw;
  border-top: solid 2px;
  border-color: #16213e;
  margin-bottom: 7%;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const CreateBlog = styled.div`
  display: flex;
  align-items: center;
  align-content: flex-end;
  margin-bottom: 7%;
  justify-content: space-between;
  a {
    text-decoration: underline;
    text-decoration-color: #e94560;
  }
`;

export default Blogs;
