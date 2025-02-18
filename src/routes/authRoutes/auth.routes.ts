import express from "express";
import { validate } from "../../middleware/validate";
import { signin, signup } from "../../controllers/auth/controller";
import {
  loginSchema,
  signupSchema,
} from "../../utils/validation/auth.validation";

const router = express.Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/signin", validate(loginSchema), signin);

export default router;
