import React, { useEffect, useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const SideBar = () => {
  const [greeting, setGreeting] = useState("")
  const location = useLocation();
  const navigate = useNavigate(); 

  const greetingMessage = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting("Good Morning 🌞");
    } else if (currentHour < 18) {
      setGreeting("Good Afternoon ☀️");
    } else if (currentHour < 21) {
      setGreeting("Good Evening 😊")
    } else {
      setGreeting("Good Night 🌙")
    }
  }
  useEffect(() => {
    greetingMessage()
  }, [])

  const handleLogout = async () => {
    localStorage.clear();
    navigate('/')
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <div className='hidden md:block w-1/4 h-[100vh] border-2 bg-black text-white p-5 font-extralight'>
        <div className='text-center text-3xl'>
          {localStorage.getItem('gymName')}
        </div>
        <div className='flex gap-5 my-5'>
          <div className='w-[90px] h-[90px] rounded-lg'>
            <img
              src={localStorage.getItem('gymPic')}
              alt="gym pic"
              className='w-full h-full rounded-full'
            />
          </div>
          <div>
            <div className='text-xl'>{greeting}</div>
            <div className='text-xl font-semibold mt-1'>admin</div>
          </div>
        </div>

        <div className='mt-10 py-10 border-t-2 border-gray-700'>
          <Link to='/dashboard'
            className={`flex items-center gap-8 font-semibold text-xl bg-slate-800 p-3 rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black ${location.pathname === "/dashboard" ? 'border-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500' : ""}`}>
            <HomeIcon />
            <div>Dashboard</div>
          </Link>

          <Link to='/member'
            className={`flex items-center mt-5 gap-8 font-semibold text-xl bg-slate-800 p-3 rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black ${location.pathname === "/member" ? 'border-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500' : ""}`}>
            <GroupIcon />
            <div>Members</div>
          </Link>

          <div
            onClick={handleLogout}
            className='flex items-center mt-5 gap-8 font-semibold text-xl bg-slate-800 p-3 rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black'>
            <LogoutIcon />
            <div>Logout</div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navbar */}
      <div className="fixed bottom-0 left-0 w-full bg-black text-white flex justify-around items-center py-2 md:hidden z-50 shadow-lg">
        {/* Profile */}
        <div className="flex flex-col items-center text-xs">
          <img
            src="https://png.pngtree.com/thumb_back/fh260/background/20240329/pngtree-rows-of-dumbbells-in-the-gym-image_15662386.jpg"
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
          <span className="text-[10px]">{greeting.split(" ")[1]}</span>
        </div>

        {/* Dashboard */}
        <Link
          to="/dashboard"
          className={`flex flex-col items-center ${location.pathname === "/dashboard" ? "text-blue-400" : ""}`}
        >
          <HomeIcon fontSize="small" />
          <span className="text-[12px]">Dashboard</span>
        </Link>

        {/* Members */}
        <Link
          to="/member"
          className={`flex flex-col items-center ${location.pathname === "/member" ? "text-blue-400" : ""}`}
        >
          <GroupIcon fontSize="small" />
          <span className="text-[12px]">Members</span>
        </Link>

        {/* Logout */}
        <div
          onClick={handleLogout}
          className="flex flex-col items-center cursor-pointer"
        >
          <LogoutIcon fontSize="small" />
          <span className="text-[12px]">Logout</span>
        </div>
      </div>
    </>
  )
}

export default SideBar
