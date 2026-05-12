import {
  ErrorPayload,
  TraceflowConfig
} from "./types";

class TraceFlow {
// catch errors url  globally and send to server

    private apiUrl = "";

  init(config: TraceflowConfig) {

    this.apiUrl = config.apiUrl;

    window.onerror = (
      message,
      source,
      lineno,
      colno,
      error
    ) => {

      this.captureError({
        message: String(message),
        source: String(source),
        lineno,
        colno,
        stack: error?.stack
      });

    };

    window.onunhandledrejection = (
      event
    ) => {

      this.captureError({
        message:
          event.reason?.message ||
          "Unhandled Promise Rejection",

        stack: event.reason?.stack
      });

    };
  }
//  method to send error data to server
  async captureError(
    errorData: ErrorPayload
  ) {

    try {

      await fetch(this.apiUrl, {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          error: errorData,

          url: window.location.href,

          userAgent:
            navigator.userAgent,

          time: new Date()
        })
      });

    } catch (err) {

      console.log(
        "TraceFlow Client Error",
        err
      );

    }
  }
}

export default new TraceFlow();