import express from "express";
import { validate } from "../../middleware/validate";
import {
  signin,
  signup,
  updateUserProfile,
} from "../../controllers/auth/controller";
import {
  loginSchema,
  signupSchema,
} from "../../utils/validation/auth.validation";
import { isAuthenticated } from "../../middleware/auth";

const router = express.Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/signin", validate(loginSchema), signin);
router.post("/update/profile", isAuthenticated, updateUserProfile);

export default router;
