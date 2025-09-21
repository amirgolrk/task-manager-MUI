import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toaster from "../helpers/toaster";
const loginSlice = createSlice({
  name: "login",
  initialState: {
},
  reducers: {
    
    auth: (state, action) => {
      console.log(action);
      axios
        .post("http://localhost:4000/login", {
          email: action.payload.loginInfo.email,
          password: action.payload.loginInfo.password,
        })
        .then((response) => {
          localStorage.setItem("token", response.data.accessToken);
          localStorage.setItem("id", response.data.user.id);
          localStorage.setItem("email", response.data.user.email);
          action.payload.onSuccess();
          console.log("object");
        })
        .catch((error) => {
          if (error.response) {
            toaster(error?.response?.data,"error",3000)
          } else {
            toaster(error?.message,"error",3000)
          }

          console.log(error);
          //action.payload.onFail()
        })
    },
    logOut: (state, action) => {
      try {
        localStorage.clear();
        toaster("kicking you out !!! bye bye .","warn",2000)
        setTimeout(() => {
          action.payload.onSuccess();
        }, 2500);
      } catch (error) {
        action.payload.onFail();
      }
    },
  },
});

export const { auth, logOut } = loginSlice.actions;

export default loginSlice.reducer;
