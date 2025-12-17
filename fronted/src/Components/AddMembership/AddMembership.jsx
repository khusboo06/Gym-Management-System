
// import axios from 'axios'
// import React, { useState, useEffect } from 'react'
// import {toast,ToastContainer} from 'react-toastify'

// const AddMembership = ({handleClose}) => {
//   const [inputField, setInputField] = useState({ months: "", price: "" })
//   const [membership, setMembership] = useState([]);
//   const handleOnChange = (event, name) => {
//     setInputField({ ...inputField, [name]: event.target.value })
//   }
//   const fetchMembership = async () => {
//     await axios.get('http://localhost:4000/plans/get-membership', { withCredentials: true })
//       .then((res) => {
//         console.log(res);
//         setMembership(res.data.membership)
//       }).catch((err) => {
//         console.log(err);
//       })
//   }
//   useEffect(() => {
//     fetchMembership()
//   }, [])

//   const handleAddMembership=async()=>{
//     await axios.post('http://localhost:4000/plans/add-membership',inputField,{ withCredentials: true })
//     .then((res)=>{
//       toast.success(res.data.message);
//       handleClose();
//     }).catch((err)=>{
//        console.log(err);
//        toast.error("Something Wrong Happend")
//     })
//   }

//   //change
//   const handleDeleteMembership = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this membership?")) return;

//     try {
//         await axios.delete(`http://localhost:4000/plans/delete-membership/${id}`, { withCredentials: true });
//         toast.success("Membership deleted successfully");
//         fetchMembership(); // Refresh the list
//     } catch (err) {
//         console.log(err);
//         toast.error("Failed to delete membership");
//     }
// };


//   return (
//     <div className='text-black'>
//       <div className='flex flex-wrap gap-3 items-center justify-center'>

//         {/* Membership blocks */}
//         {/* {
//           membership.map((item, index) => {
//             return (
//               <div className='bg-slate-900 text-[12px] text-center text-white border-2 flex flex-col gap-1 pl-2 pr-2 pb-1 justify-between pt-2 rounded-xl font-semibold hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 '>
//                 <div>{item.months} Month Membership</div>
//                 <div>Rs {item.price}</div>
//               </div>
//             )
//           })
//         } */}

//         {/* change */}

//         {
//   membership.map((item, index) => {
//     return (
//       <div key={index} className='bg-slate-900 text-[12px] text-center text-white border-2 flex flex-col gap-1 pl-2 pr-2 pb-1 justify-between pt-2 rounded-xl font-semibold hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
//         <div>{item.months} Month Membership</div>
//         <div>Rs {item.price}</div>
//         <div
//           onClick={() => handleDeleteMembership(item._id)}
//           className="mt-1 text-red-500 cursor-pointer hover:text-red-700"
//         >
//           Delete
//         </div>
//       </div>
//     )
//   })
// }




//         {/* Inputs and Add button */}
//         <div className='flex flex-col gap-3 mb-4 w-full sm:flex-row sm:gap-5 justify-center items-center'>
//           <input
//             value={inputField.months}
//             onChange={(event) => { handleOnChange(event, "months") }}
//             type="number"
//             className='border-1 rounded-lg text-[15px] w-full sm:w-1/3 h-10 p-2'
//             placeholder='Add No. of Months'
//           />

//           <input
//             value={inputField.price}
//             onChange={(event) => { handleOnChange(event, "price") }}
//             type="number"
//             className='border-1 rounded-lg text-[15px] w-full sm:w-1/3 h-10 p-2'
//             placeholder='Add Price'
//           />

//           <div onClick={()=>{handleAddMembership()}} className='text-lg border-2 p-2 w-full sm:w-auto text-center rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
//             Add +
//           </div>
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   )
// }

// export default AddMembership


import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'

const AddMembership = ({ handleClose }) => {

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const [inputField, setInputField] = useState({ months: "", price: "" })
  const [membership, setMembership] = useState([])

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value })
  }

  const fetchMembership = async () => {
    await axios
      .get(`${BASE_URL}/plans/get-membership`, { withCredentials: true })
      .then((res) => {
        console.log(res)
        setMembership(res.data.membership)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchMembership()
  }, [])

  const handleAddMembership = async () => {
    await axios
      .post(
        `${BASE_URL}/plans/add-membership`,
        inputField,
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message)
        handleClose()
      })
      .catch((err) => {
        console.log(err)
        toast.error("Something Wrong Happened")
      })
  }

  const handleDeleteMembership = async (id) => {
    if (!window.confirm("Are you sure you want to delete this membership?")) return

    try {
      await axios.delete(
        `${BASE_URL}/plans/delete-membership/${id}`,
        { withCredentials: true }
      )
      toast.success("Membership deleted successfully")
      fetchMembership()
    } catch (err) {
      console.log(err)
      toast.error("Failed to delete membership")
    }
  }

  return (
    <div className='text-black'>
      <div className='flex flex-wrap gap-3 items-center justify-center'>

        {
          membership.map((item, index) => {
            return (
              <div
                key={index}
                className='bg-slate-900 text-[12px] text-center text-white border-2 flex flex-col gap-1 pl-2 pr-2 pb-1 justify-between pt-2 rounded-xl font-semibold hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
              >
                <div>{item.months} Month Membership</div>
                <div>Rs {item.price}</div>
                <div
                  onClick={() => handleDeleteMembership(item._id)}
                  className="mt-1 text-red-500 cursor-pointer hover:text-red-700"
                >
                  Delete
                </div>
              </div>
            )
          })
        }

        <div className='flex flex-col gap-3 mb-4 w-full sm:flex-row sm:gap-5 justify-center items-center'>
          <input
            value={inputField.months}
            onChange={(event) => { handleOnChange(event, "months") }}
            type="number"
            className='border-1 rounded-lg text-[15px] w-full sm:w-1/3 h-10 p-2'
            placeholder='Add No. of Months'
          />

          <input
            value={inputField.price}
            onChange={(event) => { handleOnChange(event, "price") }}
            type="number"
            className='border-1 rounded-lg text-[15px] w-full sm:w-1/3 h-10 p-2'
            placeholder='Add Price'
          />

          <div
            onClick={() => { handleAddMembership() }}
            className='text-lg border-2 p-2 w-full sm:w-auto text-center rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
          >
            Add +
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  )
}

export default AddMembership
