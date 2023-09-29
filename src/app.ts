import express from "express";
import userRoutes from "./routes/userRoutes";
import technologyRoutes from "./routes/technologyRoutes";

const app = express();

app.use(express.json());

app.use("/user", userRoutes);
app.use("/technologies", technologyRoutes);

export default app;
