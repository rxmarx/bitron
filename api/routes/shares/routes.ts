import { Router } from "express";
import createShares from "./create_shares";
import deleteShares from "./delete_shares";
import getShares from "./get_shares";
import updateSharesInfo from "./update_shares_info";

const router = Router();

router.get("/", getShares);
router.post("/", createShares);
router.delete("/", deleteShares);
router.put("/", updateSharesInfo);

export default router;
