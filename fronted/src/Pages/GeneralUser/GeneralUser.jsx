import React, { useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import MemberCard from '../../Components/MemberCard/MemberCard';
import { getMonthlyJoined, threedaysExpire, fourToSevenDaysExpire, expired, inActiveMembers} from './Data';


const GeneralUser = () => {
    const [header, setHeader] = useState("")
    const [data,setData]=useState([]);

    useEffect(() => {
        const func = sessionStorage.getItem('func');
        functionCall(func);
    }, [])

    const functionCall = async (func) => {
        switch (func) {
            case "monthlyJoined":
                setHeader("Monthly Joined Members")
                var datas=await getMonthlyJoined();
                setData(datas.members)
                break;
            case "threeDaysExpire":
                setHeader("Expiring In 3 Days Members")
                var datas=await threedaysExpire();
                setData(datas.members)
                break;
            case "fourToSevenDaysExpire":
                setHeader("Expiring In 4-7 Days Members")
                var datas=await fourToSevenDaysExpire();
                setData(datas.members)
                break;
            case "expired":
                setHeader("Expired Members")
                var datas=await expired();
                setData(datas.members)
                break;
            case "inActiveMembers":
                setHeader("InActive Members")
                var datas=await inActiveMembers();
                setData(datas.members)
                break;
            default:
                setHeader("Members")
        }
    }

    return (
        <div className='flex flex-col h-screen p-4'>
            {/* Top bar with back button */}
            <div className='bg-slate-900 flex justify-between w-full text-white rounded-lg p-3 flex-shrink-0'>
                <Link
                    to={'/dashboard'}
                    className='pl-3 pr-3 pt-1 pb-1 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black flex items-center gap-1'
                >
                    <ArrowBackIcon /> Back To Dashboard
                </Link>
            </div>

            {/* Header text */}
            <div className='mt-5 text-lg md:text-xl text-slate-900 font-semibold flex-shrink-0'>
                {header}
            </div>

            {/* Scrollable member cards */}
            <div className='flex-1 mt-5 overflow-y-auto pb-20 md:pb-5'>
                <div className='bg-slate-100 p-5 rounded-lg grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3'>
                    {
                        data.map((item,index)=>{
                            return(
                                <MemberCard item={item}/>
                            )
                        })
                    } 
                </div>
            </div>
        </div>
    )
}

export default GeneralUser;
