// import React, { useEffect, useState } from 'react'
// import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
// import AddIcon from '@mui/icons-material/Add';
// import SearchIcon from '@mui/icons-material/Search';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { Link } from 'react-router-dom'
// import MemberCard from '../../Components/MemberCard/MemberCard';
// import Modal from '../../Components/Modal/Modal';
// import AddMembership from '../../Components/AddMembership/AddMembership';
// import AddMembers from '../../Components/AddMembers/AddMembers';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify'

// const Member = () => {
//     const [addMembership, setAddMembership] = useState(false);
//     const [addMember, setAddMember] = useState(false);
//     const [data, setData] = useState([]);
//     const [skip, setSkip] = useState(0);
//     const [search, setSearch] = useState("");
//     const [isSearchModeOn, setIsSearchModeOn] = useState(false);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [startFrom, setStartFrom] = useState(0);
//     const [endTo, setEndTo] = useState(9);
//     const [totalData, setTotalData] = useState(0);
//     const [noOfPage, setNoOfPage] = useState(0);
//     const [limit, setLimit] = useState(9);

//     useEffect(() => {
//         fetchData(0, 9);
//     }, [])

//     const fetchData = async (skip, limits) => {

//         await axios.get(`http://localhost:4000/members/all-member?skip=${skip}&limit=${limits}`, { withCredentials: true })
//             .then((res) => {
//                 console.log(res);
//                 let totalData = res.data.totalMembers;
//                 setTotalData(totalData)
//                 setData(res.data.members)
//                 let extraPage = totalData % limit === 0 ? 0 : 1;
//                 let totalPage = parseInt(totalData / limit) + extraPage;
//                 setNoOfPage(totalPage)

//                 if (totalData === 0) {
//                     setStartFrom(-1);
//                     setEndTo(0)
//                 } else if (totalData < 10) {
//                     setStartFrom(0);
//                     setEndTo(totalData);
//                 }
//             }).catch((err) => {
//                 toast.error("Some Technical Fault");
//                 console.log(err);
//             })

//     }

//     const handlememberShip = () => setAddMembership(prev => !prev);
//     const handleMembers = () => setAddMember(prev => !prev);

//     const handlePrev = () => {
//         if (currentPage !== 1) {
//             let currPage = currentPage - 1;
//             setCurrentPage(currPage)
//             let from = (currPage - 1) * 9;
//             let to = (currPage * 9);
//             setStartFrom(from);
//             setEndTo(to);
//             let skipVal = skip - 9;
//             setSkip(skipVal)
//             fetchData(skipVal, 9);

//         }
//     }

//     const handleNext = () => {
//         if (currentPage !== noOfPage) {
//             let currPage = currentPage + 1;
//             setCurrentPage(currPage);
//             let from = (currPage - 1) * 9;
//             let to = (currPage * 9);
//             if (to > totalData) to = totalData;
//             setStartFrom(from);
//             setEndTo(to);
//             let skipVal = skip + 9;
//             setSkip(skipVal)
//             fetchData(skipVal, 9);
//         }


//     }

//     const handleSearchData = async () => {
//         if (search !== "") {
//             setIsSearchModeOn(true);
//             await axios.get(`http://localhost:4000/members/searched-member?searchTerm=${search}`, { withCredentials: true })
//                 .then((res) => {
//                     console.log(res);
//                     setData(res.data.members);
//                     setTotalData(res.data.totalMembers)
//                 }).catch((err) => {
//                     toast.error("Some Technical Fault");
//                     console.log(err);
//                 })
//         }else{
//             if(isSearchModeOn){
//                 window.location.reload();
//             }else{
//                 toast.error("Please Enter Any Value");
//             }
//         }
//     }

//     return (
//         <div className='flex-1 flex flex-col h-screen overflow-y-auto p-4'>
//             {/* Banner */}
//             <div className='border-2 bg-slate-900 flex flex-col md:flex-row justify-between w-full text-white rounded-lg p-2 gap-2 text-sm sm:text-base'>
//                 <div className='border-1 pl-3 pr-3 pt-1 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black flex items-center gap-1' onClick={handleMembers}>
//                     <FitnessCenterIcon className='text-base sm:text-lg' /> Add Member
//                 </div>
//                 <div className='border-1 pl-3 pr-3 pt-1 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black flex items-center gap-1' onClick={handlememberShip}>
//                     <AddIcon className='text-base sm:text-lg' /> Membership
//                 </div>
//             </div>

//             {/* Back to Dashboard */}
//             <Link to={'/dashboard'} className='mt-4 flex items-center gap-1 text-slate-700 hover:text-slate-900 text-sm sm:text-base'>
//                 <ArrowBackIcon className='text-base sm:text-lg' /> Back to Dashboard
//             </Link>

//             {/* Search */}
//             <div className='mt-4 w-full md:w-1/2 flex gap-2 text-sm sm:text-base'>
//                 <input type="text" value={search} onChange={(e) => { setSearch(e.target.value) }} className='border-2 border-slate-200 w-full p-2 rounded-lg' placeholder='Search By Name or Mobile No.' />
//                 <div onClick={() => { handleSearchData() }} className='bg-slate-900 p-2 border-2 border-slate-200 text-white rounded-lg cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black'>
//                     <SearchIcon className='text-base sm:text-lg' />
//                 </div>
//             </div>

//             {/* Pagination Info */}
//             <div className='mt-5 font-semibold flex flex-col md:flex-row justify-between text-slate-900 items-center gap-2 text-sm sm:text-base'>
//                 <div>Total Members {isSearchModeOn?totalData:null}</div>
//                 {
//                     !isSearchModeOn ? <div className='flex gap-3 items-center'>
//                         <div>{startFrom + 1}-{endTo} of {totalData} Members</div>
//                         <div className={`w-8 h-8 cursor-pointer flex items-center justify-center rounded-md hover:text-white hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ${currentPage === 1 ? 'bg-gray-200 text-gray-400' : ''}`} onClick={handlePrev}>
//                             <ChevronLeftIcon className='text-base sm:text-lg' />
//                         </div>
//                         <div className={`w-8 h-8 cursor-pointer flex items-center justify-center rounded-md hover:text-white hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ${currentPage === noOfPage ? 'bg-gray-200 text-gray-400' : ''}`} onClick={handleNext}>
//                             <ChevronRightIcon className='text-base sm:text-lg' />
//                         </div>
//                     </div> : null
//                 }
//             </div>

//             {/* Members Grid */}
//             <div className='bg-slate-100 p-5 mt-4 rounded-lg grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mb-10 sm:mb-0'>
//                 {
//                     data.map((item, index) => {
//                         return (
//                             <MemberCard item={item} />
//                         )
//                     })
//                 }

//             </div>

//             {/* Modals */}
//             {addMembership && <Modal header="Add Membership" handleClose={handlememberShip} content={<AddMembership handleClose={handlememberShip} />} />}
//             {addMember && <Modal header="Add New Member" handleClose={handleMembers} content={<AddMembers />} />}
//             <ToastContainer />
//         </div>
//     )
// }

// export default Member;


import React, { useEffect, useState } from 'react'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom'
import MemberCard from '../../Components/MemberCard/MemberCard';
import Modal from '../../Components/Modal/Modal';
import AddMembership from '../../Components/AddMembership/AddMembership';
import AddMembers from '../../Components/AddMembers/AddMembers';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'

const Member = () => {

    const BASE_URL = import.meta.env.VITE_BACKEND_URL;

    const [addMembership, setAddMembership] = useState(false);
    const [addMember, setAddMember] = useState(false);
    const [data, setData] = useState([]);
    const [skip, setSkip] = useState(0);
    const [search, setSearch] = useState("");
    const [isSearchModeOn, setIsSearchModeOn] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [startFrom, setStartFrom] = useState(0);
    const [endTo, setEndTo] = useState(9);
    const [totalData, setTotalData] = useState(0);
    const [noOfPage, setNoOfPage] = useState(0);
    const [limit, setLimit] = useState(9);

    useEffect(() => {
        fetchData(0, 9);
    }, [])

    const fetchData = async (skip, limits) => {
        await axios
            .get(
                `${BASE_URL}/members/all-member?skip=${skip}&limit=${limits}`,
                { withCredentials: true }
            )
            .then((res) => {
                let totalData = res.data.totalMembers;
                setTotalData(totalData)
                setData(res.data.members)

                let extraPage = totalData % limit === 0 ? 0 : 1;
                let totalPage = parseInt(totalData / limit) + extraPage;
                setNoOfPage(totalPage)

                if (totalData === 0) {
                    setStartFrom(-1);
                    setEndTo(0)
                } else if (totalData < 10) {
                    setStartFrom(0);
                    setEndTo(totalData);
                }
            })
            .catch((err) => {
                toast.error("Some Technical Fault");
                console.log(err);
            })
    }

    const handlememberShip = () => setAddMembership(prev => !prev);
    const handleMembers = () => setAddMember(prev => !prev);

    const handlePrev = () => {
        if (currentPage !== 1) {
            let currPage = currentPage - 1;
            setCurrentPage(currPage)
            let from = (currPage - 1) * 9;
            let to = (currPage * 9);
            setStartFrom(from);
            setEndTo(to);
            let skipVal = skip - 9;
            setSkip(skipVal)
            fetchData(skipVal, 9);
        }
    }

    const handleNext = () => {
        if (currentPage !== noOfPage) {
            let currPage = currentPage + 1;
            setCurrentPage(currPage);
            let from = (currPage - 1) * 9;
            let to = (currPage * 9);
            if (to > totalData) to = totalData;
            setStartFrom(from);
            setEndTo(to);
            let skipVal = skip + 9;
            setSkip(skipVal)
            fetchData(skipVal, 9);
        }
    }

    const handleSearchData = async () => {
        if (search !== "") {
            setIsSearchModeOn(true);
            await axios
                .get(
                    `${BASE_URL}/members/searched-member?searchTerm=${search}`,
                    { withCredentials: true }
                )
                .then((res) => {
                    setData(res.data.members);
                    setTotalData(res.data.totalMembers)
                })
                .catch((err) => {
                    toast.error("Some Technical Fault");
                    console.log(err);
                })
        } else {
            if (isSearchModeOn) {
                window.location.reload();
            } else {
                toast.error("Please Enter Any Value");
            }
        }
    }

    return (
        <div className='flex-1 flex flex-col h-screen overflow-y-auto p-4'>

            {/* Banner */}
            <div className='border-2 bg-slate-900 flex flex-col md:flex-row justify-between w-full text-white rounded-lg p-2 gap-2 text-sm sm:text-base'>
                <div
                    className='border-1 pl-3 pr-3 pt-1 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black flex items-center gap-1'
                    onClick={handleMembers}
                >
                    <FitnessCenterIcon /> Add Member
                </div>

                <div
                    className='border-1 pl-3 pr-3 pt-1 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black flex items-center gap-1'
                    onClick={handlememberShip}
                >
                    <AddIcon /> Membership
                </div>
            </div>

            {/* Back */}
            <Link to={'/dashboard'} className='mt-4 flex items-center gap-1 text-slate-700 hover:text-slate-900'>
                <ArrowBackIcon /> Back to Dashboard
            </Link>

            {/* Search */}
            <div className='mt-4 w-full md:w-1/2 flex gap-2'>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='border-2 border-slate-200 w-full p-2 rounded-lg'
                    placeholder='Search By Name or Mobile No.'
                />
                <div
                    onClick={handleSearchData}
                    className='bg-slate-900 p-2 text-white rounded-lg cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
                >
                    <SearchIcon />
                </div>
            </div>

            {/* Pagination */}
            <div className='mt-5 font-semibold flex justify-between items-center'>
                <div>Total Members {isSearchModeOn ? totalData : null}</div>

                {!isSearchModeOn && (
                    <div className='flex gap-3 items-center'>
                        <div>{startFrom + 1}-{endTo} of {totalData}</div>

                        <div onClick={handlePrev}
                            className={`w-8 h-8 flex justify-center items-center cursor-pointer ${currentPage === 1 ? 'text-gray-400' : ''}`}>
                            <ChevronLeftIcon />
                        </div>

                        <div onClick={handleNext}
                            className={`w-8 h-8 flex justify-center items-center cursor-pointer ${currentPage === noOfPage ? 'text-gray-400' : ''}`}>
                            <ChevronRightIcon />
                        </div>
                    </div>
                )}
            </div>

            {/* Members */}
            <div className='bg-slate-100 p-5 mt-4 rounded-lg grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
                {data.map((item, index) => (
                    <MemberCard key={index} item={item} />
                ))}
            </div>

            {/* Modals */}
            {addMembership && (
                <Modal
                    header="Add Membership"
                    handleClose={handlememberShip}
                    content={<AddMembership handleClose={handlememberShip} />}
                />
            )}

            {addMember && (
                <Modal
                    header="Add New Member"
                    handleClose={handleMembers}
                    content={<AddMembers />}
                />
            )}

            <ToastContainer />
        </div>
    )
}

export default Member;
