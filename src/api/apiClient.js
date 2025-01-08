import { create } from "apisauce";
import { store } from "../redux/store";
import { logout } from "../redux/authSlice";
import toast from "react-hot-toast";
// const baseURL = "https://sidhulushpaints-be.vercel.app/api/v1/";
const baseURL = "http://localhost:6969/api/v1/";
const apiClient = create({
  baseURL: baseURL,
});

apiClient.addRequestTransform((request) => {
  const authToken = store?.getState()?.auth?.accessToken;
  if (!authToken) return;
  request.headers.authorization = "Bearer " + authToken;
});

apiClient?.addResponseTransform((response) => {
  if (response.status === 401) {
    if (store?.getState()?.auth?.token) {
    }
  } else if (response.status === 403) {
    toast.error("Restricted Route!!");
  }
});

function setAuthToken(token) {
  apiClient.setHeader("authorization", `Bearer ${token}`);
}

export { setAuthToken };
export default apiClient;
