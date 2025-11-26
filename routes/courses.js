import express from "express";
import { connectDB } from "../lib/db.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const { db } = await connectDB();
        const courses = await db.collection("courses").find({}, { projection: { _id: 1, title: 1, shortDescription: 1, image: 1, price: 1, rating: 1, email: 1, } }).toArray();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    };

});

router.get("/:id", async (req, res) => {
    try {
        const { db } = await connectDB();
        const courseId = req.params.id;

        let course = null;

        if (ObjectId.isValid(courseId)) {
            course = await db.collection("courses").findOne({ _id: new ObjectId(courseId) });
        }

        if (!course) {
            course = await db.collection("courses").findOne({ _id: courseId });
        }

        if (!course) {
            return res.status(404).json({ message: `Course not found for ID: ${courseId}` });
        }

        res.json(course);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post("/", async (req, res) => {
    try {
        const { db } = await connectDB();
        const course = req.body;

        const result = await db.collection("courses").insertOne(course);

        res.json({ msg: "Course added", id: result.insertedId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const { db } = await connectDB();
        const id = req.params.id;

        const result = await db.collection("courses").deleteOne({
            _id: new ObjectId(id),
        });

        if (result.deletedCount === 0)
            return res.status(404).json({ msg: "Course not found" });

        res.json({ msg: "Course deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


export default router;