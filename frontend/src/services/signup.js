import axios from "axios";
const baseurl = 'https://mernstackblognicola.herokuapp.com/api/users'

const signup = async credentials => {
  const response = await axios.post(baseurl, credentials)
  return response.data
}

export default { signup }