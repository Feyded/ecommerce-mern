import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { UserRouter } from "./routes/user";

const port = 3001;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", UserRouter);

mongoose.connect(
  "mongodb+srv://deanzaballero:pFYpVdbW0AbznZxO@ecommerce.vzp7yjb.mongodb.net/ecommerce"
);

app.listen(port, () => {
  console.log(`Server is running in port ${port}`);
});

// pFYpVdbW0AbznZxO
