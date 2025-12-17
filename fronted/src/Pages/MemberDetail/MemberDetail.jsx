// import React, { useState, useEffect } from "react";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { useNavigate, useParams } from "react-router-dom";
// import Switch from "react-switch";
// import axios from "axios";
// import { toast, ToastContainer } from 'react-toastify'

// const MemberDetail = () => {
//     const navigate = useNavigate();
//     const [status, setStatus] = useState("Pending");
//     const [renew, setRenew] = useState(false);
//     const [paymentStatus, setPaymentStatus] = useState("Unpaid");
//     const [data, setData] = useState(null);
//     const [membership, setMembership] = useState([]);
//     const [planMember, setPlanMember] = useState("");
//     const { id } = useParams();

//     useEffect(() => {
//         fetchData();
//         fetchMembership();
//     }, [])

//     const fetchMembership = async () => {
//         await axios.get('http://localhost:4000/plans/get-membership', { withCredentials: true })
//             .then((res) => {
//                 setMembership(res.data.membership);
//                 setPlanMember(res.data.membership[0]._id);
//             }).catch((err) => {
//                 console.log(err);
//                 toast.error("Something Went Wrong")
//             })
//     }

//     const fetchData = async () => {
//         await axios.get(`http://localhost:4000/members/get-member/${id}`, { withCredentials: true })
//             .then((res) => {
//                 setData(res.data.member)
//                 console.log(res)
//                 setStatus(res.data.member.status)
//                 setPaymentStatus(res.data.member.paymentStatus);
//             }).catch((err) => {
//                 console.log(err);
//                 toast.error("Something Went Wrong")
//             })
//     }

//     const isDateInpast = (inputDate) => {
//         const today = new Date();
//         const givenDate = new Date(inputDate);
//         return givenDate < today;
//     }


//     const handleSwitchBtn = async () => {
//         let statuss = status === "Active" ? "Pending" : "Active";
//         await axios.post(`http://localhost:4000/members/change-status/${id}`, { status: statuss }, { withCredentials: true })
//             .then((res) => {

//             }).catch((err) => {
//                 console.log(err);
//                 toast.error("Something Went Wrong")

//             })
//         setStatus(statuss);
//     };

//     const handleOnhangeSelect = (event) => {
//         let value = event.target.value;
//         setPlanMember(value);
//     }

//     const handleRenewSaveBtn = async () => {
//         await axios.put(`http://localhost:4000/members/update-member-plan/${id}`, { membership: planMember }, { withCredentials: true })
//             .then((res) => {
//                 setData(res.data.member);
//                 toast.success(res.data.message)
//             }).catch((err) => {
//                 toast.error("Something Went Wrong")
//                 console.log(err);
//             })
//     }

//     return (
//         <div className="w-full md:w-3/4 text-black p-5 overflow-y-auto h-screen">
//             {/* Back button */}
//             <div
//                 onClick={() => {
//                     navigate(-1);
//                 }}
//                 className="border-2 w-fit text-sm md:text-[16px] font-sans text-white p-2 rounded-xl bg-slate-900 cursor-pointer"
//             >
//                 <ArrowBackIcon /> Go Back
//             </div>

//             {/* Content */}
//             <div className="mt-5 md:mt-10 p-2">
//                 <div className="w-full flex flex-col md:flex-row gap-5">
//                     {/* Profile Image */}
//                     <div className="w-full md:w-1/3 mx-auto flex justify-center">
//                         <img
//                             src={data?.profilePic}
//                             alt="img"
//                             className="h-40 w-40 md:w-full md:h-auto rounded-lg object-cover"
//                         />
//                     </div>

//                     {/* Details */}
//                     <div className="w-full md:w-2/3 mt-1 md:mt-0 text-sm md:text-lg p-2 md:pl-5">
//                         <div className="mt-1 mb-2 font-semibold">Name : {data?.name}</div>
//                         <div className="mt-1 mb-2 font-semibold">
//                             Mobile no. : {data?.mobileNo}
//                         </div>
//                         <div className="mt-1 mb-2 font-semibold">
//                             Address : {data?.address}
//                         </div>
//                         <div className="mt-1 mb-2 font-semibold">Join Date : {data?.createdAt.slice(0, 10).split('-').reverse().join('-')}</div>
//                         <div className="mt-1 mb-2 font-semibold">
//                             Next Bill Date : {data?.nextBilldate.slice(0, 10).split('-').reverse().join('-')}
//                         </div>

//                         {/* Status Toggle */}
//                         <div className="mt-1 mb-2 flex items-center gap-4 font-semibold">
//                             Status :
//                             <Switch
//                                 onColor="#6366f1"
//                                 height={25}
//                                 width={50}
//                                 checked={status === "Active"}
//                                 onChange={() => {
//                                     handleSwitchBtn();
//                                 }}
//                             />
//                         </div>

//                         {/* Payment Status */}
//                         {/* <div className="mt-1 mb-2 flex items-center gap-4 font-semibold">
//                             Payment Status :
//                             <Switch
//                                 onColor="#10B981" // green
//                                 height={25}
//                                 width={50}
//                                 checked={paymentStatus === "Paid"}
//                                 onChange={() => {
//                                     setPaymentStatus(paymentStatus === "Paid" ? "Unpaid" : "Paid");
//                                 }}
//                             />
//                         </div> */}

//                         {/* change */}
//                         <div className="mt-1 mb-10 flex items-center gap-4 font-semibold">
//                             Payment Status :
//                             <Switch
//                                 onColor="#10B981"
//                                 height={25}
//                                 width={50}
//                                 checked={paymentStatus === "Paid"}
//                                 onChange={async () => {
//                                     if (status !== "Active" || isDateInpast(data?.nextBilldate)) {
//                                         setPaymentStatus("Unpaid");
//                                         await axios.post(`http://localhost:4000/members/update-payment/${id}`,
//                                             { paymentStatus: "Unpaid" },
//                                             { withCredentials: true }
//                                         ).catch(() => toast.error("Failed to reset payment status"));
//                                         return;
//                                     }

//                                     const newStatus = paymentStatus === "Paid" ? "Unpaid" : "Paid";
//                                     setPaymentStatus(newStatus);

//                                     await axios.post(`http://localhost:4000/members/update-payment/${id}`,
//                                         { paymentStatus: newStatus },
//                                         { withCredentials: true }
//                                     ).catch(() => toast.error("Failed to update payment status"));
//                                 }}
//                             />
//                         </div>




//                         {/* Renew Button */}
//                         {
//                             isDateInpast(data?.nextBilldate) && <div
//                                 onClick={() => {
//                                     setRenew((prev) => !prev);
//                                 }}
//                                 className={`mt-0 rounded-lg p-2 border border-slate-900 text-center w-full md:w-1/2 ${renew && status === "Active"
//                                     ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
//                                     : "mb-12 md:mb-0"
//                                     } cursor-pointer hover:text-white hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500`}
//                             >
//                                 Renew
//                             </div>
//                         }

//                         {/* Membership Select */}
//                         {renew && status === "Active" ? (
//                             <div className="rounded-lg p-3 mt-3 bg-slate-50 w-full md:w-[40%] mb-13 md:mb-0">
//                                 <div className="w-full">
//                                     <div className="my-3">
//                                         <div className="mb-2">Membership</div>
//                                         <select value={planMember} onChange={handleOnhangeSelect} className="w-full border p-2 rounded-lg text-sm md:text-base">
//                                             {
//                                                 membership.map((item, index) => {
//                                                     return (
//                                                         <option value={item._id} >{item.months} Month Membership</option>
//                                                     )
//                                                 })
//                                             }
//                                         </select>
//                                         <div onClick={() => { handleRenewSaveBtn() }} className="mt-3 rounded-lg p-2 border border-slate-900 text-center w-1/2 mx-auto cursor-pointer hover:text-white hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
//                                             Save
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ) : null}
//                     </div>
//                 </div>
//             </div>
//             <ToastContainer />
//         </div>
//     );
// };

// export default MemberDetail;





import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import Switch from "react-switch";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';

const MemberDetail = () => {

    const BASE_URL = import.meta.env.VITE_BACKEND_URL;

    const navigate = useNavigate();
    const [status, setStatus] = useState("Pending");
    const [renew, setRenew] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState("Unpaid");
    const [data, setData] = useState(null);
    const [membership, setMembership] = useState([]);
    const [planMember, setPlanMember] = useState("");
    const { id } = useParams();

    useEffect(() => {
        fetchData();
        fetchMembership();
    }, []);

    const fetchMembership = async () => {
        await axios
            .get(`${BASE_URL}/plans/get-membership`, { withCredentials: true })
            .then((res) => {
                setMembership(res.data.membership);
                setPlanMember(res.data.membership[0]._id);
            })
            .catch((err) => {
                console.log(err);
                toast.error("Something Went Wrong");
            });
    };

    const fetchData = async () => {
        await axios
            .get(`${BASE_URL}/members/get-member/${id}`, { withCredentials: true })
            .then((res) => {
                setData(res.data.member);
                setStatus(res.data.member.status);
                setPaymentStatus(res.data.member.paymentStatus);
            })
            .catch((err) => {
                console.log(err);
                toast.error("Something Went Wrong");
            });
    };

    const isDateInpast = (inputDate) => {
        const today = new Date();
        const givenDate = new Date(inputDate);
        return givenDate < today;
    };

    const handleSwitchBtn = async () => {
        let statuss = status === "Active" ? "Pending" : "Active";
        await axios
            .post(
                `${BASE_URL}/members/change-status/${id}`,
                { status: statuss },
                { withCredentials: true }
            )
            .catch((err) => {
                console.log(err);
                toast.error("Something Went Wrong");
            });

        setStatus(statuss);
    };

    const handleOnhangeSelect = (event) => {
        setPlanMember(event.target.value);
    };

    const handleRenewSaveBtn = async () => {
        await axios
            .put(
                `${BASE_URL}/members/update-member-plan/${id}`,
                { membership: planMember },
                { withCredentials: true }
            )
            .then((res) => {
                setData(res.data.member);
                toast.success(res.data.message);
            })
            .catch((err) => {
                toast.error("Something Went Wrong");
                console.log(err);
            });
    };

    return (
        <div className="w-full md:w-3/4 text-black p-5 overflow-y-auto h-screen">

            <div
                onClick={() => navigate(-1)}
                className="border-2 w-fit text-sm md:text-[16px] text-white p-2 rounded-xl bg-slate-900 cursor-pointer"
            >
                <ArrowBackIcon /> Go Back
            </div>

            <div className="mt-5 md:mt-10 p-2">
                <div className="w-full flex flex-col md:flex-row gap-5">

                    <div className="w-full md:w-1/3 mx-auto flex justify-center">
                        <img
                            src={data?.profilePic}
                            alt="img"
                            className="h-40 w-40 md:w-full md:h-auto rounded-lg object-cover"
                        />
                    </div>

                    <div className="w-full md:w-2/3 mt-1 md:mt-0 text-sm md:text-lg p-2 md:pl-5">
                        <div className="mt-1 mb-2 font-semibold">Name : {data?.name}</div>
                        <div className="mt-1 mb-2 font-semibold">Mobile no. : {data?.mobileNo}</div>
                        <div className="mt-1 mb-2 font-semibold">Address : {data?.address}</div>
                        <div className="mt-1 mb-2 font-semibold">
                            Join Date : {data?.createdAt.slice(0, 10).split('-').reverse().join('-')}
                        </div>
                        <div className="mt-1 mb-2 font-semibold">
                            Next Bill Date : {data?.nextBilldate.slice(0, 10).split('-').reverse().join('-')}
                        </div>

                        <div className="mt-1 mb-2 flex items-center gap-4 font-semibold">
                            Status :
                            <Switch
                                onColor="#6366f1"
                                height={25}
                                width={50}
                                checked={status === "Active"}
                                onChange={handleSwitchBtn}
                            />
                        </div>

                        <div className="mt-1 mb-10 flex items-center gap-4 font-semibold">
                            Payment Status :
                            <Switch
                                onColor="#10B981"
                                height={25}
                                width={50}
                                checked={paymentStatus === "Paid"}
                                onChange={async () => {
                                    if (status !== "Active" || isDateInpast(data?.nextBilldate)) {
                                        setPaymentStatus("Unpaid");
                                        await axios.post(
                                            `${BASE_URL}/members/update-payment/${id}`,
                                            { paymentStatus: "Unpaid" },
                                            { withCredentials: true }
                                        ).catch(() => toast.error("Failed to reset payment status"));
                                        return;
                                    }

                                    const newStatus = paymentStatus === "Paid" ? "Unpaid" : "Paid";
                                    setPaymentStatus(newStatus);

                                    await axios.post(
                                        `${BASE_URL}/members/update-payment/${id}`,
                                        { paymentStatus: newStatus },
                                        { withCredentials: true }
                                    ).catch(() => toast.error("Failed to update payment status"));
                                }}
                            />
                        </div>

                        {isDateInpast(data?.nextBilldate) && (
                            <div
                                onClick={() => setRenew(prev => !prev)}
                                className="mt-0 rounded-lg p-2 border border-slate-900 text-center w-full md:w-1/2 cursor-pointer hover:text-white hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                            >
                                Renew
                            </div>
                        )}

                        {renew && status === "Active" && (
                            <div className="rounded-lg p-3 mt-3 bg-slate-50 w-full md:w-[40%]">
                                <div className="my-3">
                                    <div className="mb-2">Membership</div>
                                    <select
                                        value={planMember}
                                        onChange={handleOnhangeSelect}
                                        className="w-full border p-2 rounded-lg"
                                    >
                                        {membership.map((item, index) => (
                                            <option key={index} value={item._id}>
                                                {item.months} Month Membership
                                            </option>
                                        ))}
                                    </select>

                                    <div
                                        onClick={handleRenewSaveBtn}
                                        className="mt-3 rounded-lg p-2 border border-slate-900 text-center w-1/2 mx-auto cursor-pointer hover:text-white hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                                    >
                                        Save
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <ToastContainer />
        </div>
    );
};

export default MemberDetail;
