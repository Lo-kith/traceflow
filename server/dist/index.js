import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import logRoutes from "./routes/log.routes.js";
import { traceflowMiddleware } from "./middleware/traceflow.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({
    limit: "10mb"
}));
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
    console.log("MongoDB Connected ");
})
    .catch((err) => {
    console.log(err);
});
// TEST ROUTE
app.get("/", (_, res) => {
    res.send("TraceFlow Running ");
});
// TEST ERROR ROUTE
app.get("/error", (req, res) => {
    throw new Error("Production Crash Simulation");
});
// ROUTES
app.use("/api", logRoutes);
// TRACEFLOW ERROR LOGGER
app.use(traceflowMiddleware);
// FINAL ERROR HANDLER
app.use((err, req, res, next) => {
    res.status(500).json({
        success: false,
        message: err.message
    });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT} `);
});
