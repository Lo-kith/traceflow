export const sanitizeHeader = (headers) => {
    const cloned = { ...headers };
    // remove sensitive headers
    if (cloned.authorization) {
        cloned.authorization = "Bearer ****";
    }
    if (cloned.cookie) {
        cloned.cookie = "****";
    }
    return cloned;
};
