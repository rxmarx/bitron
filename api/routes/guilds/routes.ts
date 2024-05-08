import { Router } from "express";
import createGuild from "./create_guild";
import deleteGuild from "./delete_guild";
import getGuild from "./get_guild";
import updateGuildInfo from "./update_guild_info";

const router = Router();

router.get("/", getGuild);
router.post("/", createGuild);
router.delete("/", deleteGuild);
router.put("/", updateGuildInfo);

export default router;
