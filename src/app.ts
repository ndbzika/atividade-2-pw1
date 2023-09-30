import express from "express";
import userRoutes from "./routes/userRoutes";
import technologyRoutes from "./routes/technologyRoutes";
import { errorMiddleware } from "./middlewares/error";

const app = express();

app.use(express.json());

app.use("/user", userRoutes);
app.use("/technologies", technologyRoutes);

app.use(errorMiddleware);

export default app;
