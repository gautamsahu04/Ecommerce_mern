import mongoose from "mongoose";

const database = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error, "error connecting to database");
  }
};

export default database;
