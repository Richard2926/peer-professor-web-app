import axiosInstance from "services/api";
import TokenService from "services/token.service";
import { verifyAuth, VERIFY_FAILURE } from "redux/actions/auth";

const interceptors = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();
      if (token) {
        config.headers["Authorization"] = 'Bearer ' + token;
        // config.headers["email"] = "rarockiasamy3@gatech.edu";
        // config.headers["x-access-token"] = token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;

      if (originalConfig.url !== "/auth/login" && originalConfig.url !== "/auth/refresh" && err.response) {
        
        if (err.response.status === 401) {

          try {
            const rs = await axiosInstance.post("/auth/refresh", {
              refreshToken: TokenService.getLocalRefreshToken(),
            });

            const { accessToken } = rs.data;
            await TokenService.updateLocalAccessToken(accessToken);
            return axiosInstance(originalConfig);
          } catch (_error) {
            await TokenService.removeUser();
            store.dispatch({
              type: VERIFY_FAILURE
            });
            return Promise.reject(_error);
          }
        }
      }
      return Promise.reject(err);
    }
  );
};

export default interceptors;
