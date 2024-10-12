// Libs
import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";

// Middleware
import { protect } from "./modules/auth";

// Handlers
import { createNewUser, signIn } from "./handlers/user";

const app = express();

app.use(cors());
app.use(morgan("dev")); // used for logs
app.use(express.json()); // allows client to send JSON
app.use(express.urlencoded({ extended: true })); // express to recognize the incoming Request Object as strings or arrays for Query Params etc

app.use((req, res, next) => {
  (req as any).mySecret = "someSecret";
  next();
  console.log("INSIDE MIDDLEWARE AFTER NEXT");
});

app.get("/", (req, res) => {
  console.log("HELLO");
  res.status(200);
  res.json({ message: "Hello" });
});

app.use("/api", protect, router);

app.post("/user", createNewUser);

app.post("/sign-in", signIn);

export default app;
