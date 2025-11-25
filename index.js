import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import coursesRoutes from "./routes/courses.js";

const PORT = process.env.PORT || 4000;

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/courses", coursesRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
