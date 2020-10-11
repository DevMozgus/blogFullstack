import axios from "axios";
const baseurl = 'https://mernstackblognicola.herokuapp.com/api/login'

const login = async credentials => {
  const response = await axios.post(baseurl, credentials)
  return response.data
}

export default { login }