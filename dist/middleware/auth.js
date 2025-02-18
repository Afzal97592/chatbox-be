"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;
const verifyToken = (token) => {
    let decodedToken;
    jsonwebtoken_1.default.verify(token, SECRET_KEY, (err, decodedData) => {
        if (err)
            return;
        decodedToken = decodedData;
    });
    return decodedToken;
};
const isAuthenticated = (req, res, next) => {
    var _a;
    const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token)
        return res.status(401).json({ message: "Token is required" });
    const decodedToken = verifyToken(token);
    if (!decodedToken)
        return res.status(404).json({ message: "Invalid token" });
    req.user = decodedToken;
    next();
};
exports.isAuthenticated = isAuthenticated;
