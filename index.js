// const express=require('express')
// const app=express();
// const cookieParser=require("cookie-parser");
// require('dotenv').config()
// const cors=require('cors')

// const PORT=process.env.PORT;

// app.use(cors({
//     origin: 'http://localhost:5173, https://gym-management-system-fronted.vercel.app/',
//     credentials: true
// }))

// app.use(cookieParser());
// app.use(express.json());

// require('./DBConnection/conn');

// const GymRoutes=require('./Routes/gym')
// const MembershipRoutes=require('./Routes/membership')
// const MemberRoutes = require('./Routes/member')

// app.use("/auth",GymRoutes);
// app.use("/plans",MembershipRoutes);
// app.use("/members",MemberRoutes)

// app.listen(PORT,()=>{
//     console.log("Server is running on Port 4000")
// })



const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
require('dotenv').config();
const cors = require('cors');

const PORT = process.env.PORT;

const allowedOrigins = [
  "http://localhost:5173",
  "https://gym-management-system-fronted.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());

require('./DBConnection/conn');

const GymRoutes = require('./Routes/gym');
const MembershipRoutes = require('./Routes/membership');
const MemberRoutes = require('./Routes/member');

app.use("/auth", GymRoutes);
app.use("/plans", MembershipRoutes);
app.use("/members", MemberRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
