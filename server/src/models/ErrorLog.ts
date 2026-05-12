import mongoose from "mongoose";

const ErrorLogSchema = new mongoose.Schema(
  {

    // ERROR DETAILS
    error: {
      message: {
        type: String,
        required: true
      },

      stack: {
        type: String
      }
    },



    // REQUEST DETAILS
    request: {

      method: {
        type: String,
        required: true
      },

      url: {
        type: String,
        required: true
      },

      query: {
        type: Object
      },

      body: {
        type: Object
      },

      params: {
        type: Object
      }
    },



    // HEADERS
    headers: {
      type: Object,
      required: true
    },



    // USER DETAILS
    user: {

      ip: String,

      token: String
    },



    // DEVICE DETAILS
    device: {

      browser: String,

      browserVersion: String,

      os: String,

      deviceType: String,

      cpu: String
    },



    // RESPONSE DETAILS
    response: {

      statusCode: Number
    },



    // PERFORMANCE DETAILS
    performance: {

      responseTime: Number
    }

  },

  {
    timestamps: true
  }
);

const ErrorLog = mongoose.model(
  "ErrorLog",
  ErrorLogSchema
);

export default ErrorLog;