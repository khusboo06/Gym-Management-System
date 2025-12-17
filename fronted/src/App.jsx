import { useEffect, useState } from 'react';
import './App.css';
import SideBar from './Components/sideBar/SideBar';
import Dashboard from './Pages/Dashboard/Dashboard';
import Home from './Pages/Home/Home';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Member from './Pages/Member/Member';
import GeneralUser from './Pages/GeneralUser/GeneralUser';
import MemberDetail from './Pages/MemberDetail/MemberDetail';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(false);


  useEffect(() => {
    let isLogedIn = localStorage.getItem("isLogin");

    if (isLogedIn) {
      setIsLogin(true);
      navigate('/dashboard')
    } else {
      setIsLogin(false);
      navigate('/')
    }
  }, [localStorage.getItem("isLogin")])

  return (
    <div className="flex overflow-x-hidden">
      {/* Sidebar: only show if logged in AND not on Home page */}
      {isLogin && location.pathname !== '/' && <SideBar />}

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isLogin && location.pathname !== '/' ? 'md:ml-1/4' : ''
        }`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/member" element={<Member />} />
          <Route path="/specific/:page" element={<GeneralUser />} />
          <Route path="/member/:id" element={<MemberDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
