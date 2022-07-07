import api from "services/api";
import TokenService from "services/token.service";

const register = (email, password) => {
  return api.post("/auth/register", {
    email,
    password,
  });
};

const verifyEmail = (code) => {
  return api.post("/auth/verifyRegistrationCode", {
    code,
  });
};

const recoverEmail = (email) => {
  return api.post("/auth/forgotPassword", {
    email,
  });
};

const checkEmail = (email) => {
  return api.post("/auth/checkEmail", {
    email,
  });
};

const resendEmail = (email) => {
  return api.post("/auth/resendCode", {
    email,
  });
};

const login = (email, password) => {
  return api
    .post("/auth/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        TokenService.setUser(response.data);
      }
      return response.data;
    });
};

const logout = async () => {
  return api
    .post("/auth/logout", {
      refreshToken: TokenService.getLocalRefreshToken(),
    })
    .then((response) => {
      TokenService.removeUser();
    });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  verifyEmail,
  recoverEmail,
  resendEmail,
  checkEmail
};

export default AuthService;
