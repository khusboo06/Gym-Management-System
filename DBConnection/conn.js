const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB connection successful!"))
  .catch((err) => {
    console.log("DB connection error:", err);
  });
