import axios from "axios";
const baseurl = "https://mernstackblognicola.herokuapp.com/api/blogs";
let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const request = await axios.get(baseurl);
  return request.data;
};

const createBlog = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.post(baseurl, newObject, config);
  return request.data;
};

const likeBlog = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.put(`${baseurl}/${id}`, newObject, config);
  return request.data;
};

const commentBlog = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.put(
    `${baseurl}/${id}/comments`,
    newObject,
    config
  );
  return request.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.delete(`${baseurl}/${id}`, config);
  return request.data;
};

export default {
  getAll,
  createBlog,
  likeBlog,
  commentBlog,
  deleteBlog,
  setToken,
};
