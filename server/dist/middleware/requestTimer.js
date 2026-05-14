export const requestTimer = (req, res, next) => {
    //  This will be used in traceflowMiddleware to calculate API response time.
    // like  API took 120ms intha maari details track panna use panrom
    req.traceflowStart = Date.now();
    next();
};
