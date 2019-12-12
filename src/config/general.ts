const generalConfig = {
    rateLimiter: {
        windowMs: 5 * 60 * 1000, // 15 minutes
        max: 1000 // limit each IP to 100 requests per windowMs
    }
};

export default generalConfig;
