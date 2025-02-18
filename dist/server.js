"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbConnection_1 = __importDefault(require("./utils/dbConnection"));
dotenv_1.default.config();
(0, dbConnection_1.default)();
app_1.default.listen(process.env.PORT || 4000, () => {
    console.log(`Server running on Port: ${process.env.PORT} Successfully!😊😊`);
});
