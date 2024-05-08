import { Router } from "express";
import createUser from "./create_user";
import deleteUser from "./delete_user";
import getUser from "./get_user";
import updateUserInfo from "./update_user_info";
import updateUserPurchasedTokens from "./update_user_purchased_tokens";
import updateUserShares from "./update_user_shares";
import updateUserPartneredCompanies from "./update_user_partnered_companies";
import updateUserBoughtItems from "./update_user_bought_items";

const router = Router();

router.get("/", getUser);
router.post("/", createUser);
router.delete("/", deleteUser);
router.put("/", updateUserInfo);
router.put("/purchasedTokens", updateUserPurchasedTokens);
router.put("/shares", updateUserShares);
router.put("/partneredCompanies", updateUserPartneredCompanies);
router.put("/boughtItems", updateUserBoughtItems);

export default router;
