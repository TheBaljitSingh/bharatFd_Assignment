import express from 'express';
import bodyParser from 'body-parser';
import cors from "cors";
import { configDotenv } from "dotenv";


configDotenv();

const app = express();

const corsOptions = {
  origin: `${process.env.FRONTEND_URL}`,
  methods: 'GET,POST',
  credentials: true,
};




app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));

// import user from "./routes/userRoute.js";
import faq from "./routes/faqRoute.js"

app.use("/api/v1/", faq);



app.get("/", function (req, res) {
  res.send("Services are up and running");
});

export default app;
