import axios from "axios";
import { useAuth } from "@/contexts";

const useAxios = () => {
  const { token, manageLogin } = useAuth();

  const instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/`,
  });

  instance.interceptors.request.use(
    async (config) => {
      const newConfig = { ...config };

      if (newConfig.headers && token) {
        newConfig.headers.Authorization = `Bearer ${token}`;
      }

      return newConfig;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.log("Please login again");
        manageLogin(null, null);
      }
      return Promise.reject(error);
    }
  );

  return { instance };
};

export default useAxios;
