exports.verifyToken = (req, res, next) => {
    const { access_token } = req.query;

    if (access_token !== "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6I...") {
        return res.status(401).json({
            status: 401,
            message: "Unauthorized. Invalid token"
        });
    }

    next();
};
