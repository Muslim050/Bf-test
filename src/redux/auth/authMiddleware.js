// import { setAuthToken } from "./api";
// import { refreshAccessToken } from "./authSlice";

// // import { setAuthToken } from "../../api/api";

// export const authMiddleware = (storeAPI) => (next) => (action) => {
//   if (action.type === refreshAccessToken.fulfilled.type) {
//     const { token } = storeAPI.getState().auth;
//     setAuthToken(token);
//   }

//   const result = next(action);

//   const { token, isAuthenticated } = storeAPI.getState().auth;
//   if (token && isAuthenticated) {
//     const jwtExpiration = new Date(token.expires_in * 1000);
//     const now = new Date();
//     const diffSeconds = (jwtExpiration - now) / 1000;
//     if (diffSeconds < 60 && diffSeconds > 0) {
//       storeAPI.dispatch(refreshAccessToken());
//     }
//   }

//   return result;
// };

// import { setAuthToken } from "./api";
// import { refreshAccessToken } from "./authSlice";

// export const authMiddleware = (storeAPI) => (next) => (action) => {
//   const { token, isAuthenticated } = storeAPI.getState().auth;

//   // If token is valid and authenticated, check for expiration
//   if (token && isAuthenticated) {
//     const jwtExpiration = new Date(token.expires_in * 1000);
//     console.log("jwtExpiration", jwtExpiration);
//     const now = new Date();
//     console.log("now", now);
//     const diffSeconds = (jwtExpiration - now) / 1000;
//     console.log("diffSeconds", diffSeconds);

//     // If token is about to expire, dispatch refreshAccessToken action
//     if (diffSeconds < 60 && diffSeconds > 0) {
//       storeAPI
//         .dispatch(refreshAccessToken())
//         .then((result) => {
//           // Update token in API if refresh succeeds
//           const { token } = storeAPI.getState().auth;
//           setAuthToken(token);
//         })
//         .catch((error) => {
//           // Handle error if refresh fails
//           console.error("Error refreshing access token:", error);
//         });
//     }
//   }

//   // Call next middleware or reducer
//   const result = next(action);

//   return result;
// };
