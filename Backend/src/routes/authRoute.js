import express from "express";
import { signUp, logIn, logOut,onboard } from "../controllers/authController.js";
import {protectRoute} from "../middlewares/authMiddleware.js";
const router = express.Router();


router.post("/signup",signUp);
router.post("/login",logIn);
router.post("/logout",logOut);


router.post("/onboarding",protectRoute,onboard);

// check user if logged in
router.get("/me",protectRoute,(req,res)=>{
    res.status(200).json({success:true , user:req.user});
})
export default router;