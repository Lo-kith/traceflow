# TraceFlow Monitor 🚀

Production-ready Express.js error tracking and request monitoring middleware.

TraceFlow automatically captures:

- API crashes
- Request details
- Headers
- Device & browser info
- Response time
- Stack traces
- User IP
- Query params
- Route params
- Request body

and stores them directly into MongoDB.

---

# Installation

```bash
npm install traceflow-monitor

Required Dependencies:

npm install express mongoose dotenv


Setup

1. Create .env
MONGO_URI=mongodb://localhost:27017/traceflow
PORT=3000


2. Connect MongoDB
import mongoose from "mongoose";

mongoose.connect(
  process.env.MONGO_URI as string
);
Usage
Basic Example
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import {
  traceflowMiddleware
} from "traceflow-monitor";

dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect(
  process.env.MONGO_URI as string
);



// TEST ROUTE
app.get("/error", () => {

  throw new Error(
    "Production Crash Simulation"
  );

});



// TRACEFLOW LOGGER
app.use(traceflowMiddleware);



// FINAL ERROR HANDLER
app.use((err, req, res, next) => {

  res.status(500).json({
    success: false,
    message: err.message
  });

});



app.listen(3000, () => {

  console.log(
    "Server Running 🚀"
  );

});
Middleware Order ⚠️

TraceFlow must be placed AFTER routes.

✅ Correct

app.use("/api", routes);

app.use(traceflowMiddleware);

❌ Wrong

app.use(traceflowMiddleware);

app.use("/api", routes);
What Gets Logged
Request Data
HTTP Method
URL
Query Params
Route Params
Request Body
User Data
IP Address
Authorization Token (masked)
Device Data
Browser
Browser Version
OS
Device Type
CPU Architecture
Error Data
Error Message
Stack Trace
Performance Data
Response Time
Status Code


Example Logged Data
{
  "error": {
    "message": "Production Crash Simulation",
    "stack": "Error stack..."
  },

  "request": {
    "method": "GET",
    "url": "/payment/create",
    "query": {},
    "params": {},
    "body": {}
  },

  "headers": {
    "content-type": "application/json"
  },

  "device": {
    "browser": "Chrome",
    "browserVersion": "136.0",
    "os": "Linux",
    "deviceType": "desktop"
  },

  "response": {
    "statusCode": 500
  },

  "performance": {
    "responseTime": 120
  }
}