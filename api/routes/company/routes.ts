import { Router } from "express";
import createCompany from "./create_company";
import deleteCompany from "./delete_company";
import getCompany from "./get_company";
import updateCompanyAcquiredTokens from "./update_company_acquired_tokens";

const router = Router();

router.get("/", getCompany);
router.post("/", createCompany);
router.delete("/", deleteCompany);
router.put("/acquiredTokens", updateCompanyAcquiredTokens);

export default router;
