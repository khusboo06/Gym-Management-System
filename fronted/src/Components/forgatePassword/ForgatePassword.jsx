// import React, { useState } from "react";
// import Loader from "../Loader/Loader";
// import axios from "axios";
// import { toast,ToastContainer } from 'react-toastify';

// const ForgatePassword = () => {
//   const [emailSubmit, setEmailSubmit] = useState(false);
//   const [otpValidate, setOtpValidate] = useState(false);
//   const [loader,setLoader] = useState(false);
//   const [contentVal, setContentVal] = useState("Submit Your Email");
//   const [inputField, setInputField] = useState({
//     email: "",
//     otp: "",
//     newPassword: "",
//   });

//   const handleSubmit = () => {
//     if (!emailSubmit) {
//       sendOtp();
//     } else if (emailSubmit && !otpValidate) {
//       verifyOtp();
//     } else{
//        changePassword();
//     }
//   };

//   const changePassword=async()=>{
//     setLoader(true);
//     await axios.post('http://localhost:4000/auth/reset-password',{email:inputField.email,newPassword:inputField.newPassword})
//     .then((response)=>{
//       toast.success(response.data.message);
//       setLoader(false);
//     }).catch((err)=>{
//         toast.error("Some technical issue while sending mail");
//        console.log(err);
//        setLoader(false);
//     })
//   }

//   const verifyOtp=async()=>{
//     setLoader(true); 
//     await axios.post('http://localhost:4000/auth/reset-password/checkOtp',{email:inputField.email,otp:inputField.otp})
//     .then((response)=>{
//       setOtpValidate(true); 
//       setContentVal("Submit New Password");
//       toast.success(response.data.message);
//       setLoader(false);
//     }).catch((err)=>{
//         toast.error("Some technical issue while sending mail");
//        console.log(err);
//        setLoader(false);
//     })
//   }

//   const sendOtp=async()=>{
//     setLoader(true);
//     await axios.post('http://localhost:4000/auth/reset-password/sendOtp',{email:inputField.email})
//     .then((response)=>{
//         setEmailSubmit(true);
//         setContentVal("Submit OTP");
//         toast.success(response.data.message);
//         setLoader(false);
//     }).catch((err)=>{
//         toast.error("Some technical issue while sending mail");
//        console.log(err);
//        setLoader(false);
//     })
//   }

//   const handleOnChange = (event, name) => {
//     setInputField({ ...inputField, [name]: event.target.value });
//   };

//   return (
//     <div className="w-full px-4">
//       <div className="w-full bg-white rounded-xl shadow-lg p-4 sm:p-6 max-w-md mx-auto">
//         {/* Email Field */}
//         <div className="w-full mb-4">
//           <label className="block text-base sm:text-sm font-medium mb-2 text-gray-700">
//             Enter Your Email
//           </label>
//           <input
//             value={inputField.email}
//             onChange={(event) => handleOnChange(event, "email")}
//             type="email"
//             className="w-full px-3 py-3 sm:py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base sm:text-sm"
//             placeholder="Enter Email"
//           />
//         </div>

//         {/* OTP Field */}
//         {emailSubmit && (
//           <div className="w-full mb-4">
//             <label className="block text-base sm:text-sm font-medium mb-2 text-gray-700">
//               Enter Your OTP
//             </label>
//             <input
//               value={inputField.otp}
//               onChange={(event) => handleOnChange(event, "otp")}
//               type="text"
//               className="w-full px-3 py-3 sm:py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base sm:text-sm"
//               placeholder="Enter OTP"
//             />
//           </div>
//         )}

//         {/* New Password Field */}
//         {otpValidate && (
//           <div className="w-full mb-4">
//             <label className="block text-base sm:text-sm font-medium mb-2 text-gray-700">
//               Enter Your New Password
//             </label>
//             <input
//               value={inputField.newPassword}
//               onChange={(event) => handleOnChange(event, "newPassword")}
//               type="password"
//               className="w-full px-3 py-3 sm:py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base sm:text-sm"
//               placeholder="Enter new password"
//             />
//           </div>
//         )}

//         {/* Submit Button */}
//         <button
//           className="w-full bg-blue-600 text-white py-3 sm:py-2 rounded-lg font-semibold text-base sm:text-sm hover:bg-blue-700 transition"
//           onClick={handleSubmit}
//         >
//           {contentVal}
//         </button>
//       </div>
//       {
//         loader && <Loader />
//       }
//       <ToastContainer />
//     </div>
//   );
// };

// export default ForgatePassword;


import React, { useState } from "react";
import Loader from "../Loader/Loader";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';

const ForgatePassword = () => {

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const [emailSubmit, setEmailSubmit] = useState(false);
  const [otpValidate, setOtpValidate] = useState(false);
  const [loader, setLoader] = useState(false);
  const [contentVal, setContentVal] = useState("Submit Your Email");
  const [inputField, setInputField] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const handleSubmit = () => {
    if (!emailSubmit) {
      sendOtp();
    } else if (emailSubmit && !otpValidate) {
      verifyOtp();
    } else {
      changePassword();
    }
  };

  const changePassword = async () => {
    setLoader(true);
    await axios
      .post(
        `${BASE_URL}/auth/reset-password`,
        { email: inputField.email, newPassword: inputField.newPassword }
      )
      .then((response) => {
        toast.success(response.data.message);
        setLoader(false);
      })
      .catch((err) => {
        toast.error("Some technical issue while sending mail");
        console.log(err);
        setLoader(false);
      });
  };

  const verifyOtp = async () => {
    setLoader(true);
    await axios
      .post(
        `${BASE_URL}/auth/reset-password/checkOtp`,
        { email: inputField.email, otp: inputField.otp }
      )
      .then((response) => {
        setOtpValidate(true);
        setContentVal("Submit New Password");
        toast.success(response.data.message);
        setLoader(false);
      })
      .catch((err) => {
        toast.error("Some technical issue while sending mail");
        console.log(err);
        setLoader(false);
      });
  };

  const sendOtp = async () => {
    setLoader(true);
    await axios
      .post(
        `${BASE_URL}/auth/reset-password/sendOtp`,
        { email: inputField.email }
      )
      .then((response) => {
        setEmailSubmit(true);
        setContentVal("Submit OTP");
        toast.success(response.data.message);
        setLoader(false);
      })
      .catch((err) => {
        toast.error("Some technical issue while sending mail");
        console.log(err);
        setLoader(false);
      });
  };

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };

  return (
    <div className="w-full px-4">
      <div className="w-full bg-white rounded-xl shadow-lg p-4 sm:p-6 max-w-md mx-auto">

        <div className="w-full mb-4">
          <label className="block text-base sm:text-sm font-medium mb-2 text-gray-700">
            Enter Your Email
          </label>
          <input
            value={inputField.email}
            onChange={(event) => handleOnChange(event, "email")}
            type="email"
            className="w-full px-3 py-3 sm:py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base sm:text-sm"
            placeholder="Enter Email"
          />
        </div>

        {emailSubmit && (
          <div className="w-full mb-4">
            <label className="block text-base sm:text-sm font-medium mb-2 text-gray-700">
              Enter Your OTP
            </label>
            <input
              value={inputField.otp}
              onChange={(event) => handleOnChange(event, "otp")}
              type="text"
              className="w-full px-3 py-3 sm:py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base sm:text-sm"
              placeholder="Enter OTP"
            />
          </div>
        )}

        {otpValidate && (
          <div className="w-full mb-4">
            <label className="block text-base sm:text-sm font-medium mb-2 text-gray-700">
              Enter Your New Password
            </label>
            <input
              value={inputField.newPassword}
              onChange={(event) => handleOnChange(event, "newPassword")}
              type="password"
              className="w-full px-3 py-3 sm:py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base sm:text-sm"
              placeholder="Enter new password"
            />
          </div>
        )}

        <button
          className="w-full bg-blue-600 text-white py-3 sm:py-2 rounded-lg font-semibold text-base sm:text-sm hover:bg-blue-700 transition"
          onClick={handleSubmit}
        >
          {contentVal}
        </button>
      </div>

      {loader && <Loader />}
      <ToastContainer />
    </div>
  );
};

export default ForgatePassword;
