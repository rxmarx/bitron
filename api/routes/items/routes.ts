import { Router } from "express";
import getItem from "./get_item";

const router = Router();

router.get("/", getItem);

export default router;
