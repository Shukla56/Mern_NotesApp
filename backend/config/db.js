import mongoose from "mongoose";

const DbCon = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB is connected");
  } catch (error) {
    console.log("❌ Error in MongoDB connection:", error.message);
    process.exit(1);
  }
};

export default DbCon;
