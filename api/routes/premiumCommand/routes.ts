import { Router } from "express";
import connectUserPremiumCommand from "./connect_user_premium_command";
import createPremiumCommand from "./create_premium_command";
import getPremiumCommand from "./get_premium_command";
import updatePremiumCommandInfo from "./update_premium_command_info";

const router = Router();

router.get("/", getPremiumCommand);
router.post("/", createPremiumCommand);
router.put("/", updatePremiumCommandInfo);
router.put("/user", connectUserPremiumCommand);

export default router;
