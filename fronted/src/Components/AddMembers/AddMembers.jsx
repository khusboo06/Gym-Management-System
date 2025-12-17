// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import Stack from '@mui/material/Stack';
// import LinearProgress from '@mui/material/LinearProgress';
// import {toast,ToastContainer} from 'react-toastify'

// const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// const AddMembers = () => {

//   const [inputField, setInputField] = useState({ name: "", mobileNo: "", address: "", membership: "", profilePic: "https://th.bing.com/th/id/OIP.gj6t3grz5no6UZ03uIluiwHaHa?rs=18pid=ImgDetMain", joiningDate: "" })
//   const [loaderImage, setLoaderImage] = useState(false)
//   const [membershipList,setMembershipList]=useState([]);
//   const [selectedOption,setSelectedOption]=useState("");
//   const handleOnChange = (event, name) => {
//     setInputField({ ...inputField, [name]: event.target.value })
//   }
//   console.log(inputField);

//   const uploadImages = async (event) => {
//     setLoaderImage(true)
//     console.log("image uploading")
//     const files = event.target.files;
//     const data = new FormData();
//     data.append('file', files[0])
//     data.append('upload_preset', 'gym-management');
//     try {
//       const response = await axios.post("https://api.cloudinary.com/v1_1/dgtyncnap/image/upload", data);
//       console.log(response);
//       const imageUrl = response.data.secure_url;
//       setLoaderImage(false)
//       setInputField({ ...inputField, ['profilePic']: imageUrl })
//     } catch (error) {
//       console.log(error);
//       setLoaderImage(false)
//     }
//   }
//   const fetchMembership=async()=>{
//      await axios.get('http://localhost:4000/plans/get-membership',{ withCredentials: true })
//      .then((res)=>{
//        setMembershipList(res.data.membership);
//        if(res.data.membership.length===0){
//          return toast.error("No Membership added yet",{className:"text-lg"})
//        }
//        else{
//         let a=res.data.membership[0]._id;
//         setSelectedOption(a);
//         setInputField({...inputField,membership:a})
        
//        }
//      }).catch((err)=>{
//          console.log(err);
//      }) 
//   }

//   useEffect(()=>{
//     console.log(inputField)
//     fetchMembership();
//   },[])

//   const handleOnChangeSelect=(event)=>{
//      let value=event.target.value;
//      setSelectedOption(value);
//      setInputField({...inputField,membership:value})
     
//   }
//   const handleRegister=async()=>{
//      await axios.post('http://localhost:4000/members/register-member',inputField,{ withCredentials: true })
//      .then((res)=>{
//         toast.success(" New member has been registered successfully");
//         setTimeout(()=>{
//           window.location.reload();
//         },2000)
//      }).catch((err)=>{
//          console.log(err);
//          toast.error("Something Wrong Happend")
//      }) 
//   }

//   return (
//     <div className='text-black'>
//       <div className='grid gap-5 grid-cols-1 sm:grid-cols-2 text-lg'>
//         <input value={inputField.name} onChange={(event) => { handleOnChange(event, "name") }} type="text" placeholder='Name of the Joinee' className='border-1 w-full sm:w-[90%] pl-2 pr-2 pb-1 border-slate-400 rounded-md h-10' />
//         <input value={inputField.mobileNo} onChange={(event) => { handleOnChange(event, "mobileNo") }} type="text" placeholder='Mobile No.' className='border-1 w-full sm:w-[90%] pl-2 pr-2 pb-1 border-slate-400 rounded-md h-10' />
//         <input value={inputField.address} onChange={(event) => { handleOnChange(event, "address") }} type="text" placeholder='Enter Address' className='border-1 w-full sm:w-[90%] pl-2 pr-2 pb-1 border-slate-400 rounded-md h-10' />
//         <input value={inputField.joiningDate} onChange={(event) => { handleOnChange(event, "joiningDate") }} type="date" className='border-1 w-full sm:w-[90%] pl-3 pr-3 pb-2 border-slate-400 rounded-md h-10' />

//         <select value={selectedOption} onChange={handleOnChangeSelect} className='border-1 w-full sm:w-[90%] h-10 pt-2 pb-2 border-slate-400 rounded-md placeholder:text-gray'>
//           {
//             membershipList.map((item,index)=>{
//               return(
//                  <option key={index} value={item._id}>{item.months} Month Membership</option>
//               );
//             })
//           }
          
//         </select>

//         <input onChange={(e) => { uploadImages(e) }} type="file" className='border-1 w-full sm:w-[90%] h-10 pl-2 pt-2 pb-2 border-slate-400 rounded-md placeholder:text-gray' />

//         <div className='w-[80px] h-[80px]'>
//           <img src={inputField.profilePic} className='w-full h-full rounded-full' alt="" />
//           {
//             loaderImage && <Stack sx={{ width: '80px', color: 'grey.500' }} spacing={2}>
//               <LinearProgress color="secondary" />
//             </Stack>
//           }
//         </div>

//         <div onClick={()=>{handleRegister()}} className='p-1 border-1 w-28 text-lg h-10 text-center bg-slate-900 text-white rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>Register</div>
//       </div>
//       <ToastContainer />
//     </div>
//   )
// }

// export default AddMembers


import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { toast, ToastContainer } from 'react-toastify'

const AddMembers = () => {

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const [inputField, setInputField] = useState({
    name: "",
    mobileNo: "",
    address: "",
    membership: "",
    profilePic: "https://th.bing.com/th/id/OIP.gj6t3grz5no6UZ03uIluiwHaHa?rs=18pid=ImgDetMain",
    joiningDate: ""
  })

  const [loaderImage, setLoaderImage] = useState(false)
  const [membershipList, setMembershipList] = useState([])
  const [selectedOption, setSelectedOption] = useState("")

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value })
  }

  console.log(inputField)

  const uploadImages = async (event) => {
    setLoaderImage(true)
    console.log("image uploading")
    const files = event.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'gym-management')

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dgtyncnap/image/upload",
        data
      )
      console.log(response)
      const imageUrl = response.data.secure_url
      setLoaderImage(false)
      setInputField({ ...inputField, profilePic: imageUrl })
    } catch (error) {
      console.log(error)
      setLoaderImage(false)
    }
  }

  const fetchMembership = async () => {
    await axios
      .get(`${BASE_URL}/plans/get-membership`, { withCredentials: true })
      .then((res) => {
        setMembershipList(res.data.membership)

        if (res.data.membership.length === 0) {
          return toast.error("No Membership added yet", { className: "text-lg" })
        } else {
          let a = res.data.membership[0]._id
          setSelectedOption(a)
          setInputField({ ...inputField, membership: a })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    console.log(inputField)
    fetchMembership()
  }, [])

  const handleOnChangeSelect = (event) => {
    let value = event.target.value
    setSelectedOption(value)
    setInputField({ ...inputField, membership: value })
  }

  const handleRegister = async () => {
    await axios
      .post(
        `${BASE_URL}/members/register-member`,
        inputField,
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("New member has been registered successfully")
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      })
      .catch((err) => {
        console.log(err)
        toast.error("Something Wrong Happened")
      })
  }

  return (
    <div className='text-black'>
      <div className='grid gap-5 grid-cols-1 sm:grid-cols-2 text-lg'>
        <input
          value={inputField.name}
          onChange={(event) => { handleOnChange(event, "name") }}
          type="text"
          placeholder='Name of the Joinee'
          className='border-1 w-full sm:w-[90%] pl-2 pr-2 pb-1 border-slate-400 rounded-md h-10'
        />

        <input
          value={inputField.mobileNo}
          onChange={(event) => { handleOnChange(event, "mobileNo") }}
          type="text"
          placeholder='Mobile No.'
          className='border-1 w-full sm:w-[90%] pl-2 pr-2 pb-1 border-slate-400 rounded-md h-10'
        />

        <input
          value={inputField.address}
          onChange={(event) => { handleOnChange(event, "address") }}
          type="text"
          placeholder='Enter Address'
          className='border-1 w-full sm:w-[90%] pl-2 pr-2 pb-1 border-slate-400 rounded-md h-10'
        />

        <input
          value={inputField.joiningDate}
          onChange={(event) => { handleOnChange(event, "joiningDate") }}
          type="date"
          className='border-1 w-full sm:w-[90%] pl-3 pr-3 pb-2 border-slate-400 rounded-md h-10'
        />

        <select
          value={selectedOption}
          onChange={handleOnChangeSelect}
          className='border-1 w-full sm:w-[90%] h-10 pt-2 pb-2 border-slate-400 rounded-md placeholder:text-gray'
        >
          {
            membershipList.map((item, index) => {
              return (
                <option key={index} value={item._id}>
                  {item.months} Month Membership
                </option>
              )
            })
          }
        </select>

        <input
          onChange={(e) => { uploadImages(e) }}
          type="file"
          className='border-1 w-full sm:w-[90%] h-10 pl-2 pt-2 pb-2 border-slate-400 rounded-md placeholder:text-gray'
        />

        <div className='w-[80px] h-[80px]'>
          <img
            src={inputField.profilePic}
            className='w-full h-full rounded-full'
            alt=""
          />
          {
            loaderImage &&
            <Stack sx={{ width: '80px', color: 'grey.500' }} spacing={2}>
              <LinearProgress color="secondary" />
            </Stack>
          }
        </div>

        <div
          onClick={() => { handleRegister() }}
          className='p-1 border-1 w-28 text-lg h-10 text-center bg-slate-900 text-white rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
        >
          Register
        </div>
      </div>

      <ToastContainer />
    </div>
  )
}

export default AddMembers
