const db = require('../config/db');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    const { email, password } = req.query;

    if (email === "test@gmail.com" && password === "test1234") {
        // Simulate token generation
        const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6I...";

        res.status(200).json({
            status: 200,
            message: "Logged in",
            result: {
                user_id: 5,
                access_token: accessToken,
                token_type: "Bearer",
                role_type: "u",
                expires_at: "2022-03-16 12:31:39"
            }
        });
    } else {
        res.status(401).json({
            status: 401,
            message: "Invalid email or password"
        });
    }
};

