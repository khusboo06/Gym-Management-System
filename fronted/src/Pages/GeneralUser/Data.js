// import axios from 'axios'


// const getMonthlyJoined=async()=>{
//      try{
//         const response=await axios.get('http://localHost:4000/members/monthly-member',{ withCredentials: true})
//         return response.data;
//      }catch(err){
//         console.log('Error fetching data:',err);
//         throw err;
//      }
// }

// const threedaysExpire=async()=>{
//    try{
//       const response=await axios.get('http://localhost:4000/members/within-3-days-expiring',{ withCredentials: true})
//       return response.data;
//    }catch(error){
//       console.error('Error fetching data:',error)
//       throw error;
//    }
// }

// const fourToSevenDaysExpire=async()=>{
//    try{
//       const response=await axios.get('http://localhost:4000/members/within-4-to-7-days-expiring',{ withCredentials: true})
//       return response.data;
//    }catch(error){
//       console.error('Error fetching data:',error)
//       throw error;
//    }
// }

// const expired=async()=>{
//    try{
//       const response=await axios.get('http://localhost:4000/members/expired-member',{ withCredentials: true})
//       return response.data;
//    }catch(error){
//       console.error('Error fetching data:',error)
//       throw error;
//    }
// }

// const inActiveMembers=async()=>{
//    try{
//       const response=await axios.get('http://localhost:4000/members/inactive-member',{ withCredentials: true})
//       return response.data;
//    }catch(error){
//       console.error('Error fetching data:',error)
//       throw error;
//    }
// }

// export {getMonthlyJoined, threedaysExpire, fourToSevenDaysExpire, expired, inActiveMembers };



import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const getMonthlyJoined = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/members/monthly-member`,
      { withCredentials: true }
    );
    return response.data;
  } catch (err) {
    console.log('Error fetching data:', err);
    throw err;
  }
};

const threedaysExpire = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/members/within-3-days-expiring`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const fourToSevenDaysExpire = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/members/within-4-to-7-days-expiring`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const expired = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/members/expired-member`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const inActiveMembers = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/members/inactive-member`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export {
  getMonthlyJoined,
  threedaysExpire,
  fourToSevenDaysExpire,
  expired,
  inActiveMembers
};
