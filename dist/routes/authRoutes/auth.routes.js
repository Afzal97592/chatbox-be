"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_1 = require("../../middleware/validate");
const controller_1 = require("../../controllers/auth/controller");
const auth_validation_1 = require("../../utils/validation/auth.validation");
const router = express_1.default.Router();
router.post("/signup", (0, validate_1.validate)(auth_validation_1.signupSchema), controller_1.signup);
router.post("/signin", (0, validate_1.validate)(auth_validation_1.loginSchema), controller_1.signin);
exports.default = router;
