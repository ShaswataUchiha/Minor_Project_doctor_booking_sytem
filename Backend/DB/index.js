import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDatabase = async () => {
  try {
    const databaseInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `MongoDb connected !! DB host : ${databaseInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDb connection error: " + error);
    throw error;
    process.exit(1);
  }
};

export default connectDatabase;