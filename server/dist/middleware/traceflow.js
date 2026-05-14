import { UAParser } from "ua-parser-js";
import ErrorLog from "../models/ErrorLog.js";
import { sanitizeHeader } from "../utils/sanitize.js";
export const traceflowMiddleware = async (err, req, res, next) => {
    try {
        // Used for response performance tracking.
        //  like API took 120ms intha maari details track panna use panrom
        const responseTime = Date.now() -
            (req.traceflowStart || Date.now());
        // Mozilla/5.0 (Linux; Android 13)
        const parser = new UAParser(req.headers["user-agent"]);
        //   Converts raw user-agent into structured data.
        //   {
        //  browser: {
        //    name: "Chrome"
        //  },
        //  os: {
        //    name: "Android"
        //  }
        // }
        const device = parser.getResult();
        // Makes request headers safe before DB save.
        const headers = sanitizeHeader(req.headers);
        //   token la maari sensitive info mask panrom
        const token = req.headers.authorization?.split(" ")[1] || "";
        //   This entire object will go into DB.
        const errorData = {
            error: {
                message: err.message,
                stack: err.stack
            },
            request: {
                method: req.method,
                // og url la query params irundha athu kooda capture panrom
                url: req.originalUrl,
                query: req.query,
                body: req.body,
                params: req.params
            },
            headers,
            user: {
                ip: req.headers["x-forwarded-for"] ||
                    req.socket.remoteAddress ||
                    "",
                token: token ? "******" : ""
            },
            //  device details on the basis of user agent
            device: {
                browser: device.browser.name,
                browserVersion: device.browser.version,
                os: device.os.name,
                deviceType: device.device.type || "desktop",
                cpu: device.cpu.architecture
            },
            response: {
                statusCode: res.statusCode
            },
            performance: {
                responseTime: responseTime
            }
        };
        await ErrorLog.create(errorData);
        console.log(" Error logged successfully ");
    }
    catch (loggingError) {
        console.log("Logger Failed", loggingError);
    }
    next(err);
};
