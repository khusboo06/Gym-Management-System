const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://khushbookumari200314_db_user:GymSystem@cluster0.9qfmjn6.mongodb.net/Gym')
.then(()=>console.log('DB connection successful!'))
.catch(err=>{
    console.log(err);
});