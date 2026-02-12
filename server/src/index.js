import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../lib/auth.js";

dotenv.config({ path: "./.env" });

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(express.json());

/* ⭐ Better Auth Route */
app.use("/api/auth", toNodeHandler(auth));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get('/device', (req, res) => {
  const userCode = req.query.user_code;

  console.log(`Received user_code: ${userCode}`);

  res.redirect(`http://localhost:3000/device?device_code=${userCode}`);
});


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
