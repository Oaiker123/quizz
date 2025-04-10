
import axios from "../utils/axiosCustomize";

const postCreateUser = (email, password, username, role, image) => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  return axios.post("api/v1/participant", data);
};

const getAllUsers = () => {
  return axios.get("api/v1/participant/all");
}

const putUpdateUser = (id, username, role, image) => {
  const data = new FormData();
  data.append("id", id);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  return axios.put("api/v1/participant", data);
};

const getDeleteUsers = (userId) => {
  return axios.delete("api/v1/participant", { data: { id: userId } });
}

const getUserWithPaginate = (page, limit) => {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
}

const postLogin = (userEmail, userPassword) => {
  return axios.post(`/api/v1/login`, {
    email: userEmail,
    password: userPassword,
    delay: 2000
  });
}

const postSignUp = (userEmail, userPassword, userName) => {
  return axios.post(`/api/v1/register`, { email: userEmail, password: userPassword, username: userName });
}

export {
  postCreateUser,
  getAllUsers,
  putUpdateUser,
  getDeleteUsers,
  getUserWithPaginate,
  postLogin,
  postSignUp
};
