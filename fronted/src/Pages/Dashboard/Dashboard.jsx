import React, { useEffect, useRef, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import ErrorIcon from "@mui/icons-material/Error";
import ReportIcon from "@mui/icons-material/Report";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [accordianDashboard, setAccordianDashboard] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const checkIfClicked = (e) => {
      if (accordianDashboard && ref.current && !ref.current.contains(e.target)) {
        setAccordianDashboard(false);
      }
    };
    document.addEventListener("mousedown", checkIfClicked);
    return () => {
      document.removeEventListener("mousedown", checkIfClicked);
    };
  }, [accordianDashboard]);

  const handleOnClickMenu = (value) => {
    sessionStorage.setItem("func", value);
  };

  return (
    <div className="flex-1 text-black p-5 relative min-h-screen">
      {/* Header */}
      <div className="w-full bg-slate-900 text-white rounded-lg flex p-3 justify-between items-center">
        <MenuIcon
          sx={{ cursor: "pointer" }}
          onClick={() => {
            setAccordianDashboard((prev) => !prev);
          }}
        />
        <img
          className="w-8 h-8 rounded-full border-2"
          src="https://static.vecteezy.com/system/resources/previews/002/265/650/large_2x/unknown-person-user-icon-for-web-vector.jpg"
          alt="Profile"
        />
      </div>

      {/* Popup */}
      {accordianDashboard && (
        <div
          ref={ref}
          className="absolute p-3 mt-2 bg-slate-900 text-white rounded-xl text-[12px] md:text-sm max-w-xs"
        >
          <div>Hi, Welcome to our Gym Management System.</div>
          <p>Feel free to ask any queries.</p>
        </div>
      )}

      {/* Dashboard Cards */}
      <div className="mt-12 pt-3 bg-slate-100/50 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full pb-5 overflow-y-auto h-[80%] mb-10 sm:mb-0">
        <Link
          to={"/member"}
          className="w-full border border-slate-200 bg-white rounded-lg shadow hover:shadow-lg transition"
        >
          <div className="h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          <div className="py-7 px-5 flex flex-col justify-center items-center text-center rounded-b-lg hover:bg-slate-900 hover:text-white transition">
            <PeopleAltIcon sx={{ color: "green", fontSize: "40px" }} />
            <p className="my-3 font-semibold font-mono">Joined Members</p>
          </div>
        </Link>

        <Link
          to={"/specific/monthly"}
          onClick={() => handleOnClickMenu("monthlyJoined")}
          className="w-full border border-slate-200 bg-white rounded-lg shadow hover:shadow-lg transition"
        >
          <div className="h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          <div className="py-7 px-5 flex flex-col justify-center items-center text-center rounded-b-lg hover:bg-slate-900 hover:text-white transition">
            <SignalCellularAltIcon sx={{ color: "purple", fontSize: "40px" }} />
            <p className="my-3 font-semibold font-mono">Monthly Joined</p>
          </div>
        </Link>

        <Link
          to={"/specific/expire-with-in-3-days"}
          onClick={() => handleOnClickMenu("threeDaysExpire")}
          className="w-full border border-slate-200 bg-white rounded-lg shadow hover:shadow-lg transition"
        >
          <div className="h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          <div className="py-7 px-5 flex flex-col justify-center items-center text-center rounded-b-lg hover:bg-slate-900 hover:text-white transition">
            <AccessAlarmIcon sx={{ color: "red", fontSize: "40px" }} />
            <p className="my-3 font-semibold font-mono">Expiring in 3 Days</p>
          </div>
        </Link>

        <Link
          to={"/specific/expire-with-in-4-7-days"}
          onClick={() => handleOnClickMenu("fourToSevenDaysExpire")}
          className="w-full border border-slate-200 bg-white rounded-lg shadow hover:shadow-lg transition"
        >
          <div className="h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          <div className="py-7 px-5 flex flex-col justify-center items-center text-center rounded-b-lg hover:bg-slate-900 hover:text-white transition">
            <AccessAlarmIcon sx={{ color: "orange", fontSize: "40px" }} />
            <p className="my-3 font-semibold font-mono">Expiring 4–7 Days</p>
          </div>
        </Link>

        <Link
          to={"/specific/expired"}
          onClick={() => handleOnClickMenu("expired")}
          className="w-full border border-slate-200 bg-white rounded-lg shadow hover:shadow-lg transition"
        >
          <div className="h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          <div className="py-7 px-5 flex flex-col justify-center items-center text-center rounded-b-lg hover:bg-slate-900 hover:text-white transition">
            <ErrorIcon sx={{ color: "red", fontSize: "40px" }} />
            <p className="my-3 font-semibold font-mono">Expired</p>
          </div>
        </Link>

        <Link
          to={"/specific/inactive-members"}
          onClick={() => handleOnClickMenu("inActiveMembers")}
          className="w-full border border-slate-200 bg-white rounded-lg shadow hover:shadow-lg transition"
        >
          <div className="h-3 rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          <div className="py-7 px-5 flex flex-col justify-center items-center text-center rounded-b-lg hover:bg-slate-900 hover:text-white transition">
            <ReportIcon sx={{ color: "brown", fontSize: "40px" }} />
            <p className="my-3 font-semibold font-mono">Inactive Members</p>
          </div>
        </Link>
      </div>

      
      
    </div>
  );
};

export default Dashboard;
