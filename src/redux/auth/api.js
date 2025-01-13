// import axios from "axios";

// export const BASE_URL = "https://nnarziev.pythonanywhere.com";

// export const setAuthToken = (token) => {
//   if (token) {
//     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   } else {
//     delete axios.defaults.headers.common["Authorization"];
//   }
// };

// export const loginApi = async ({ data }) => {
//   const response = await axios.post(
//     "https://nnarziev.pythonanywhere.com/user/token",
//     {
//       username: data.data.login,
//       password: data.data.password,

//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//     }
//   );
//   return response;
// };

// export const refreshApi = async (refresh_token) => {
//   const response = await axios.post(
//     "https://nnarziev.pythonanywhere.com/user/token/refresh",
//     {
//       refresh: refresh_token,
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//     }
//   );
//   return response;
// };
