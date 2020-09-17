import blogService from "../services/blog";

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: "INIT_BLOGS",
      data: blogs,
    });
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    let { ...updatedBlog } = blog;
    updatedBlog.likes = blog.likes + 1;
    const returnedBlog = await blogService.likeBlog(blog.id, updatedBlog);
    dispatch({
      type: "LIKE_BLOG",
      data: returnedBlog,
    });
  };
};

export const commentBlog = (blog) => {
  return async (dispatch) => {
    const returnedBlog = await blogService.commentBlog(blog.id, blog);
    dispatch({
      type: "COMMENT_BLOG",
      data: returnedBlog,
    });
  };
};

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blog.id);
    dispatch({
      type: "REMOVE_BLOG",
      data: blog,
    });
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    const returnedBlog = await blogService.createBlog(blog);
    dispatch({
      type: "CREATE_BLOG",
      data: returnedBlog,
    });
  };
};

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BLOGS":
      return action.data;
    case "LIKE_BLOG":
      const likedBlogs = state.map((blog) =>
        blog.id !== action.data.id ? blog : action.data
      );
      return likedBlogs;
    case "COMMENT_BLOG":
      const commentedBlogs = state.map((blog) =>
        blog.id !== action.data.id ? blog : action.data
      );
      return commentedBlogs;
    case "REMOVE_BLOG":
      const returnedBlogs = state.map((blog) =>
        blog.id !== action.data.id ? blog : null
      );
      return returnedBlogs;
    case "CREATE_BLOG":
      return state.concat(action.data);
    default:
      return state;
  }
};

export default blogReducer;
