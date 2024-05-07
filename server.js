import express from "express";
import "dotenv/config";
import cors from "cors";

const PORT = process.env.PORT || 5000;
const app = express();

// middleware

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());


app.get("/", (req, res) => {
  return res.json({
    message: "App is running",
  });
});

import routes from "./routes/index.js";

app.use(routes);

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});