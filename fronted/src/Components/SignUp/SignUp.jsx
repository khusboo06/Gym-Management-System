// import React, { useState } from "react";
// import "./signUp.css";
// import Modal from "../Modal/Modal";
// import ForgatePassword from "../forgatePassword/ForgatePassword";
// import axios from "axios";
// import Stack from "@mui/material/Stack";
// import LinearProgress from "@mui/material/LinearProgress";
// import {toast,ToastContainer} from 'react-toastify'

// const SignUp = () => {
//   const [forgetPassword, setForgetPassword] = useState(false);
//   const [inputField, setInputField] = useState({
//     gymName: "",
//     email: "",
//     userName: "",
//     password: "",
//     profilePic:
//       "https://static.vecteezy.com/system/resources/thumbnails/017/504/043/small_2x/bodybuilding-emblem-and-gym-logo-design-template-vector.jpg",
//   });
//   const [loaderImage, setLoaderImage] = useState(false);

//   const handleClose = () => {
//     setForgetPassword((prev) => !prev);
//   };

//   const handleOnChange = (event, name) => {
//     setInputField({ ...inputField, [name]: event.target.value });
//   };

//   const uploadImages = async (event) => {
//     setLoaderImage(true);
//     const files = event.target.files;
//     const data = new FormData();
//     data.append("file", files[0]);
//     data.append("upload_preset", "gym-management");
//     try {
//       const response = await axios.post(
//         "https://api.cloudinary.com/v1_1/dgtyncnap/image/upload",
//         data
//       );
//       const imageUrl = response.data.secure_url;
//       setLoaderImage(false);
//       setInputField({ ...inputField, ["profilePic"]: imageUrl });
//     } catch (error) {
//       console.log(error);
//       setLoaderImage(false);
//     }
//   };

//   const handleRegister = async () => {
//     await axios.post('http://localhost:4000/auth/register', inputField)
//       .then((response) => {
//         //console.log(response);
//         const successMessage=response.data.message;
//         toast.success(successMessage)
//       }).catch((err) => {
//         const errorMessage = err.response.data.error
//         //console.log(errorMessage);
//         toast.error(errorMessage);
//       })

//   }

//   return (
//     <div className="w-full max-w-sm mx-auto mt-10 bg-white rounded-xl shadow-lg overflow-hidden">
//       {/* Header */}
//       <div className="bg-blue-600 py-3 text-center">
//         <h2 className="text-lg sm:text-xl font-bold text-white">
//           Register Your Gym
//         </h2>
//       </div>

//       {/* Content */}
//       <div className="p-4 max-h-[65vh] overflow-y-auto custom-scrollbar space-y-4">
//         {/* Email */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Email
//           </label>
//           <input
//             value={inputField.email}
//             onChange={(e) => handleOnChange(e, "email")}
//             type="email"
//             className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter Email"
//           />
//         </div>

//         {/* Gym Name */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Gym Name
//           </label>
//           <input
//             value={inputField.gymName}
//             onChange={(e) => handleOnChange(e, "gymName")}
//             type="text"
//             className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter Gym Name"
//           />
//         </div>

//         {/* Username */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Username
//           </label>
//           <input
//             value={inputField.userName}
//             onChange={(e) => handleOnChange(e, "userName")}
//             type="text"
//             className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter Username"
//           />
//         </div>

//         {/* Password */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Password
//           </label>
//           <input
//             value={inputField.password}
//             onChange={(e) => handleOnChange(e, "password")}
//             type="password"
//             className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter Password"
//           />
//         </div>

//         {/* File Upload */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Upload Profile Picture
//           </label>
//           <input
//             onChange={uploadImages}
//             type="file"
//             className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
//           />
//         </div>

//         {/* Loader */}
//         {loaderImage && (
//           <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
//             <LinearProgress color="secondary" />
//           </Stack>
//         )}

//         {/* Profile Picture Preview */}
//         <div className="flex justify-center mb-4">
//           <img
//             src={inputField.profilePic}
//             alt="profile"
//             className="h-20 w-20 rounded-full object-cover border-2 border-gray-300 shadow-md"
//           />
//         </div>

//         {/* Buttons */}
//         <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition mb-2" onClick={() => handleRegister()}>
//           Register
//         </button>

//         <button
//           onClick={handleClose}
//           className="w-full bg-gray-800 text-white py-2 rounded-lg font-semibold hover:bg-gray-900 transition"
//         >
//           Forgot Password
//         </button>
//       </div>

//       {/* Modal for Forgot Password */}
//       {forgetPassword && (
//         <Modal
//           header="Forgot Password"
//           handleClose={handleClose}
//           content={<ForgatePassword />}
//         />
//       )}
//       <ToastContainer />
//     </div>
//   );
// };

// export default SignUp;




import React, { useState } from "react";
import "./signUp.css";
import Modal from "../Modal/Modal";
import ForgatePassword from "../forgatePassword/ForgatePassword";
import axios from "axios";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { toast, ToastContainer } from 'react-toastify';

const SignUp = () => {

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const [forgetPassword, setForgetPassword] = useState(false);
  const [inputField, setInputField] = useState({
    gymName: "",
    email: "",
    userName: "",
    password: "",
    profilePic:
      "https://static.vecteezy.com/system/resources/thumbnails/017/504/043/small_2x/bodybuilding-emblem-and-gym-logo-design-template-vector.jpg",
  });
  const [loaderImage, setLoaderImage] = useState(false);

  const handleClose = () => {
    setForgetPassword((prev) => !prev);
  };

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };

  const uploadImages = async (event) => {
    setLoaderImage(true);
    const files = event.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "gym-management");
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dgtyncnap/image/upload",
        data
      );
      const imageUrl = response.data.secure_url;
      setLoaderImage(false);
      setInputField({ ...inputField, profilePic: imageUrl });
    } catch (error) {
      console.log(error);
      setLoaderImage(false);
    }
  };

  const handleRegister = async () => {
    await axios
      .post(
        `${BASE_URL}/auth/register`,
        inputField
      )
      .then((response) => {
        const successMessage = response.data.message;
        toast.success(successMessage);
      })
      .catch((err) => {
        const errorMessage = err.response?.data?.error || "Registration failed";
        toast.error(errorMessage);
      });
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-10 bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-blue-600 py-3 text-center">
        <h2 className="text-lg sm:text-xl font-bold text-white">
          Register Your Gym
        </h2>
      </div>

      {/* Content */}
      <div className="p-4 max-h-[65vh] overflow-y-auto custom-scrollbar space-y-4">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            value={inputField.email}
            onChange={(e) => handleOnChange(e, "email")}
            type="email"
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Email"
          />
        </div>

        {/* Gym Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gym Name
          </label>
          <input
            value={inputField.gymName}
            onChange={(e) => handleOnChange(e, "gymName")}
            type="text"
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Gym Name"
          />
        </div>

        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            value={inputField.userName}
            onChange={(e) => handleOnChange(e, "userName")}
            type="text"
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Username"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            value={inputField.password}
            onChange={(e) => handleOnChange(e, "password")}
            type="password"
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Password"
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Profile Picture
          </label>
          <input
            onChange={uploadImages}
            type="file"
            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
          />
        </div>

        {/* Loader */}
        {loaderImage && (
          <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
            <LinearProgress color="secondary" />
          </Stack>
        )}

        {/* Profile Picture Preview */}
        <div className="flex justify-center mb-4">
          <img
            src={inputField.profilePic}
            alt="profile"
            className="h-20 w-20 rounded-full object-cover border-2 border-gray-300 shadow-md"
          />
        </div>

        {/* Buttons */}
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition mb-2"
          onClick={() => handleRegister()}
        >
          Register
        </button>

        <button
          onClick={handleClose}
          className="w-full bg-gray-800 text-white py-2 rounded-lg font-semibold hover:bg-gray-900 transition"
        >
          Forgot Password
        </button>
      </div>

      {/* Modal for Forgot Password */}
      {forgetPassword && (
        <Modal
          header="Forgot Password"
          handleClose={handleClose}
          content={<ForgatePassword />}
        />
      )}

      <ToastContainer />
    </div>
  );
};

export default SignUp;
