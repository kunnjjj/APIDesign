// Libs
import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";

// Middleware
import { protect, updateResponseWhenUnauthorized } from "./modules/auth";

// Handlers
import { createNewUser, signIn } from "./handlers/user";

// Constants
import { ErrorType } from "./constants";

const app = express();

app.use(cors());
app.use(morgan("dev")); // used for logs
app.use(express.json()); // allows client to send JSON
app.use(express.urlencoded({ extended: true })); // express to recognize the incoming Request Object as strings or arrays for Query Params etc

app.use((req, res, next) => {
  (req as any).mySecret = "someSecret";
  next();
});

app.get("/", (req, res) => {
  console.log("HELLO");
  res.status(200);
  res.json({ message: "Hello" });
});

app.use("/api", protect, router);

app.post("/user", createNewUser);

app.post("/sign-in", signIn);

app.use((err, req, res, next) => {
  if (err.type === ErrorType.AUTHENTICATION) {
    updateResponseWhenUnauthorized({ res });
  } else if (err.type === ErrorType.INPUT) {
    res.status(400).json({ message: "invalid input" });
  } else {
    res.status(500).json({ message: "server error" });
  }
}); // TODO: Add Route Level Handlers

export default app;
