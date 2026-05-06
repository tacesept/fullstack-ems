import mongoose from "mongoose";

mongoose.connection.on("connected", () =>
  console.log("✅ Database: Connection established"),
);
mongoose.connection.on("error", (err) =>
  console.error("❌ Database connection error:", err),
);
mongoose.connection.on("disconnected", () =>
  console.warn("⚠️ Database: Disconnected"),
);

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("DB connection closed 🔌");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await mongoose.connection.close();
  console.log("DB connection closed 🔌");
  process.exit(0);
});
