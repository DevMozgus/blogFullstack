import axios from 'axios';
const baseurl = '/api/blogs'
let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseurl)
  return request.data;
}

const createBlog = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const request = await axios.post(baseurl, newObject, config)
  return request.data
}

const updateBlog = async (id, newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const request = await axios.put(`${baseurl}/${id}`, newObject, config)
  return request.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const request = await axios.delete(`${baseurl}/${id}`, config)
  return request.data
}

export default { getAll, createBlog, updateBlog, deleteBlog, setToken }