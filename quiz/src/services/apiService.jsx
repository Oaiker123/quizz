
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

const getQuizByUser = () => {
  return axios.get("/api/v1/quiz-by-participant");
}

const getDataQuiz = (id) => {
  return axios.get(`/api/v1/questions-by-quiz?quizId=${id}`);
}

const postSubmitQuiz = (data) => {
  return axios.post(`/api/v1/quiz-submit`, { ...data });
}

const postCreateNewQuiz = (description, name, difficulty, image) => {
  const data = new FormData();
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", image);
  return axios.post("api/v1/quiz", data);
}

const getAllQuizForAdmin = () => {
  return axios.get(`/api/v1/quiz/all`);
}

const putUpdateQuizForAdmin = (id, name, description, difficulty, image) => {
  const data = new FormData();
  data.append("id", id);
  data.append("name", name);
  data.append("description", description);
  data.append("difficulty", difficulty);
  data.append("quizImage", image);
  return axios.put(`/api/v1/quiz`, data);
}

const deleteQuizForAdmin = (id) => {
  return axios.delete(`/api/v1/quiz/${id}`);
}

const postCreateNewQuestionForQuiz = (quiz_id, description, image) => {
  const data = new FormData();
  data.append("quiz_id", quiz_id);
  data.append("description", description);
  data.append("questionImage", image);
  return axios.post(`/api/v1/question`, data);
}

const postCreateNewAnswerForQuestion = (description, correct_answer, question_id) => {

  return axios.post(`/api/v1/answer`, {
    description: description,
    correct_answer: correct_answer,
    question_id: question_id
  });
}

const postAssignQuiz = (quizId, userId) => {
  return axios.post(`/api/v1/quiz-assign-to-user`, {
    quizId: quizId,
    userId: userId
  })
}

const getQuizWithQA = (quizId) => {
  return axios.get(`/api/v1/quiz-with-qa/${quizId}`);
}

const postQuizUpsertQA = (data) => {
  return axios.post(`/api/v1/quiz-upsert-qa`, { ...data });
}

const logout = (email, refresh_token) => {
  return axios.post(`/api/v1/logout`, {
    email,
    refresh_token
  });
}

const getOverview = () => {
  return axios.get(`/api/v1/overview`);
}

const postChangePassword = (current_password, new_password) => {
  return axios.post(`/api/v1/change-password`, {
    current_password,
    new_password,
  });
}

const getQuizHistory = () => {
  return axios.get('/api/v1/history');
};

export {
  postCreateUser,
  getAllUsers,
  putUpdateUser,
  getDeleteUsers,
  getUserWithPaginate,
  postLogin,
  postSignUp,
  getQuizByUser,
  getDataQuiz,
  postSubmitQuiz,
  postCreateNewQuiz,
  getAllQuizForAdmin,
  putUpdateQuizForAdmin,
  deleteQuizForAdmin,
  postCreateNewQuestionForQuiz,
  postCreateNewAnswerForQuestion,
  postAssignQuiz,
  getQuizWithQA,
  postQuizUpsertQA,
  logout,
  getOverview,
  postChangePassword,
  getQuizHistory
};
