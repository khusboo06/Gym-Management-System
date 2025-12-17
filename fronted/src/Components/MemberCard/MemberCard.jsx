import React from 'react'
import CircleIcon from '@mui/icons-material/Circle';
import { Link } from 'react-router-dom';

const MemberCard = ({item}) => {
    return (
        <Link 
            to={`/member/${item?._id}`} 
            className='bg-white rounded-lg p-3 hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-white cursor-pointer'
        >
            <div className='w-18 h-18 flex justify-center relative items-center border-2 mx-auto rounded-full'>
                <img 
                    className="w-full h-full rounded-full" 
                    src={item?.profilePic}
                    alt="Profile Pic" 
                />
                <CircleIcon className='absolute top-0 left-0' sx={{ color: item?.status==="Active"?"greenyellow":"red", width: "16px" }} />
            </div> 

            <div className='mx-auto mt-3 text-center text-sm sm:text-[16px] md:text-[18px] font-semibold font-mono'>
                {item?.name}
            </div>
            <div className='mx-auto text-center text-xs sm:text-[14px] md:text-[16px] font-mono mt-1.5'>
                {"+91" + item?.mobileNo}
            </div>
            <div className='mx-auto text-center text-xs sm:text-[14px] md:text-[16px] font-mono mt-1.5'>
                Next Bill Date : {item?.nextBilldate.slice(0,10).split('-').reverse().join('-')}
            </div>
        </Link>
    )
}

export default MemberCard
