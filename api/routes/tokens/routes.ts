import { Router } from "express";
import createToken from "./create_token";
import deleteToken from "./delete_token";
import getToken from "./get_token";
import updateTokenInfo from "./update_token_info";

const router = Router();

router.get("/", getToken);
router.post("/", createToken);
router.delete("/", deleteToken);
router.put("/", updateTokenInfo);

export default router;
