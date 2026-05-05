import mongoose from "mongoose";

const connectDB = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.error(
      "❌ FATAL ERROR: MONGODB_URI environment variable is undefined.",
    );
    process.exit(1);
  }

  mongoose.connection.on("connected", () =>
    console.log("✅ Database: Connection established"),
  );
  mongoose.connection.on("error", (err) =>
    console.error("❌ Database runtime error:", err),
  );
  mongoose.connection.on("disconnected", () =>
    console.warn("⚠️ Database: Disconnected. Attempting to reconnect..."),
  );

  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      serverSelectionTimeoutMS: 5000,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("🔥 Connection failed:", error.message);
    } else {
      console.error("🔥 An unknown error occurred:", error);
    }

    process.exit(1);
  }
};

export default connectDB;
