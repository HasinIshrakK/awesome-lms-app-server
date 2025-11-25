import express from "express";
import { connectDB } from "../lib/db.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const { db } = await connectDB();
        const courses = await db.collection("courses").find({}, { projection: { _id: 1, title: 1, shortDescription: 1, image: 1, price: 1, rating: 1 } }).toArray();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    };

});
router.get("/:id", async (req, res) => {
  try {
    const { db } = await connectDB();
    const courseId = req.params.id;

    const course = await db
      .collection("courses")
      .findOne({ _id: courseId }); // <-- query as string

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
