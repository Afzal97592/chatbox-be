"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("../../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;
// User signup controller
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        // check if user already
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser)
            return res.status(400).json({ error: "User already exists" });
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = new User_1.default({ name, email, password: hashedPassword });
        yield newUser.save();
        // Generate the token
        // const token = jwt.sign({ userId: newUser._id }, SECRET_KEY, {
        //   expiresIn: "7d",
        // });
        res.status(201).json({ message: "signup successfully", user: newUser });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, email } = req.body;
        const user = yield User_1.default.findOne({ email: email });
        if (!user)
            return res.status(400).json({ message: "Invalid email or password" });
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(404).json({ message: "Invalid email or password" });
        // Generate the token
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, SECRET_KEY, {
            expiresIn: "7d",
        });
        res.status(200).json({ message: "signin successfully", user, token });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});
exports.signin = signin;
