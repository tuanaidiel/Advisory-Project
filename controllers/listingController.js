const db = require('../config/db');
const jwt = require('jsonwebtoken');

exports.getListings = (req, res) => {
    const { access_token } = req.query;

 
    if (access_token !== "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6I...") {
        return res.status(401).json({
            status: 401,
            message: "Unauthorized. Invalid token"
        });
    }

    const listings = [
        {
            id: 4,
            name: "Starbucks Mid Valley",
            distance: "0.6",
            created_at: "2021-03-10 12:24:38",
            updated_at: "2021-03-10 12:24:38"
        },
        {
            id: 9,
            name: "Burger King",
            distance: "0.8",
            created_at: "2021-03-10 12:24:38",
            updated_at: "2021-03-10 12:24:38"
        },
        {
            id: 16,
            name: "Pizza Hut",
            distance: "8.52",
            created_at: "2021-03-10 12:24:38",
            updated_at: "2021-03-10 12:24:38"
        },
        {
            id: 25,
            name: "Sunway Pyramid",
            distance: "10.81",
            created_at: "2021-03-10 12:24:38",
            updated_at: "2021-03-10 12:24:38"
        }
    ];

    res.status(200).json({
        status: 200,
        message: "Success",
        result: {
            current_page: 1,
            data: listings
        }
    });
};

