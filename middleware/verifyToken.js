const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const verifyToken = async (req, res, next) => {
    let token = req.headers.authorization;
    try {
        if (token) {
            token = token.split(" ")[1];
            const result = jwt.verify(token, SECRET_KEY);
            req.userId = result.id;
        } else {
            return res.status(401).send({ msg: "Unauthorized user" });
        }
        next();
    } catch (error) {
        return res.status(401).send({ msg: "Unauthorized user" });
    }
};
module.exports = { verifyToken };
