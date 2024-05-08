import { Router } from "express";
import createBank from "./create_bank";
import deleteBank from "./delete_bank";
import getBank from "./get_bank";
import updateBankShares from "./update_bank_shares";
import updateBankStoredTokens from "./update_bank_stored_tokens";
import updateUserInfo from "../users/update_user_info";

const router = Router();

router.get("/", getBank);
router.post("/", createBank);
router.delete("/", deleteBank);
router.put("/", updateUserInfo);
router.put("/storedTokens", updateBankStoredTokens);
router.put("/shares", updateBankShares);

export default router;
