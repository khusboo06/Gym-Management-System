// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios"
// import {toast,ToastContainer} from 'react-toastify'

// const Login = () => {
//   const [loginField, setLoginField] = useState({ userName: "", password: "" });
//   const navigate = useNavigate();

//   const handleLogin = async() => {
//     // sessionStorage.setItem("isLogin", true);
    

//     await axios.post('http://localhost:4000/auth/login',loginField,{withCredentials:true})
//     .then((response)=>{
//       console.log(response.data);
//       localStorage.setItem('gymName',response.data.gym.gymName);
//       localStorage.setItem('gymPic',response.data.gym.profilePic);
//       localStorage.setItem('isLogin',true);
//       localStorage.setItem('token',response.data.token)
//       console.log(localStorage.getItem('gymPic'));

//       navigate("/dashboard");
//     }).catch((err)=>{
//       const errorMessage=err.response.data.error
//       console.log(errorMessage);
//       toast.error(errorMessage);
//     })

//   }; 

//   const handleOnChange = (event, name) => {
//     setLoginField({ ...loginField, [name]: event.target.value });
//   };

//   return (
//     <div className="w-full max-w-md mx-auto p-2 sm:p-6 bg-white rounded-xl shadow-lg">
//       <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>

//       <input
//         value={loginField.userName}
//         onChange={(event) => handleOnChange(event, "userName")}
//         type="text"
//         className="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         placeholder="Enter Username"
//       />

//       <input
//         value={loginField.password}
//         onChange={(event) => handleOnChange(event, "password")}
//         type="password"
//         className="w-full mb-6 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         placeholder="Enter Password"
//       />

//       <button
//         className="w-full p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
//         onClick={handleLogin}
//       >
//         Login
//       </button>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const [loginField, setLoginField] = useState({ userName: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    await axios
      .post(
        `${BASE_URL}/auth/login`,
        loginField,
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response.data);
        localStorage.setItem('gymName', response.data.gym.gymName);
        localStorage.setItem('gymPic', response.data.gym.profilePic);
        localStorage.setItem('isLogin', true);
        localStorage.setItem('token', response.data.token);
        console.log(localStorage.getItem('gymPic'));

        navigate("/dashboard");
      })
      .catch((err) => {
        const errorMessage = err.response?.data?.error || "Login failed";
        console.log(errorMessage);
        toast.error(errorMessage);
      });
  };

  const handleOnChange = (event, name) => {
    setLoginField({ ...loginField, [name]: event.target.value });
  };

  return (
    <div className="w-full max-w-md mx-auto p-2 sm:p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>

      <input
        value={loginField.userName}
        onChange={(event) => handleOnChange(event, "userName")}
        type="text"
        className="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter Username"
      />

      <input
        value={loginField.password}
        onChange={(event) => handleOnChange(event, "password")}
        type="password"
        className="w-full mb-6 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter Password"
      />

      <button
        className="w-full p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
        onClick={handleLogin}
      >
        Login
      </button>

      <ToastContainer />
    </div>
  );
};

export default Login;
