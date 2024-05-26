import express from "express";
import userRouter from "./routes/user.router.js";
import cors from "cors";
import path from "path";
import session from "express-session";
import passportRoute from "./passport/router.passport.js";
import passport from "passport";
import bodyParser from "body-parser";
import MongoStore from "connect-mongo";
import messagesRouter from "./routes/messages.router.js";
import morgan from "morgan";
import { initPassport } from "./passport/passportCongi.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

const db_url = process.env.DB_URL;
const session_password = process.env.SECRET_SESSION;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(express.json());
app.use("/uploads", express.static(path.resolve("uploads")));

app.use(
  session({
    secret: session_password,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: db_url,
      ttl: 14 * 24 * 60,
    }),
  })
);

initPassport();
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan("dev"));

app.use("/", userRouter);
app.use("/", passportRoute);
app.use("/", messagesRouter);

export default app;
