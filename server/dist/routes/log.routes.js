import { Router } from "express";
import ErrorLog from "../models/ErrorLog.js";
const router = Router();
router.post("/log", async (req, res) => {
    try {
        await ErrorLog.create({
            frontend: true,
            ...req.body
        });
        res.json({
            success: true
        });
    }
    catch (err) {
        res.status(500).json({
            success: false
        });
    }
});
export default router;
