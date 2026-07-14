import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import teamRoutes from './routing/teamRouting.js'
import roleRoutes from './routing/roleRoutes.js'
import blogRoutes from './routing/blogRoutes.js'
import workRoutes from './routing/workRoutes.js'
import aboutRoutes from './routing/aboutRoute.js'
import categoryRoutes from './routing/categoryRoutes.js'
import cors from 'cors'
import serviceRoutes from "./routing/servicesRoutes.js";
import contactUsRoutes from "./routing/contactUsRoute.js";
import leadStageRoutes from "./routing/leadStagesRoute.js";
import loginRoutes from "./routing/loginRoute.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect MongoDB
await connectDB();

// Import routes
app.use("/api/users", teamRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/works", workRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/contact", contactUsRoutes);
app.use("/api/leadsStage", leadStageRoutes);
app.use("/api/auth/", loginRoutes);

app.get("/", (req, res) => {
    res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

app.use((err, req, res, next) => {
    console.error("Global Error:", err);

    return res.status(400).json({
        success: false,
        message: err.message || "Something went wrong",
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

