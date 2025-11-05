import express from "express";
import {protectRoute} from "../middlewares/authMiddleware.js";
import {getRcommendedUsers,getMyFriends,sendFriendRequest,acceptFriendRequest,getMyFriendRequests,getOutgoingFriendReqs} from "../controllers/userController.js"

const router = express.Router();

router.use(protectRoute);

router.get("/",getRcommendedUsers);
router.get("/friends",getMyFriends);

router.post("/friend-request/:id",sendFriendRequest);
router.put("/friend-request/:id/accept",acceptFriendRequest);

router.get("/friend-requests",getMyFriendRequests);
router.get("/outgoing-friend-requests",getOutgoingFriendReqs);
export default router;
