import express from "express";
import { connectDB } from "../lib/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { db } = await connectDB();
    const courses = await db.collection("courses").find().toArray();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
