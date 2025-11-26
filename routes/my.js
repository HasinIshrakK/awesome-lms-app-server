import express from "express";
import { connectDB } from "../lib/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const { db } = await connectDB();

        const remail = req.query.email;
        let query = {};
        if (remail) {
            query.email = remail;
        }

        const courses = await db.collection("courses").find(query).toArray();

        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


export default router;