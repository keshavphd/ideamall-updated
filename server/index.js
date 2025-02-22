import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import authRouter from "./router/authRouter.js";
import categoryRouter from "./router/categoryRouter.js";
import subCategoryRouter from "./router/subCategoryRouter.js";
import productRouter from "./router/uploadProductRouter.js";
import cartRouter from "./router/cartRouter.js";
import addressRouter from "./router/addressRouter.js";
import orderRouter from "./router/orderRouter.js";
import database from "./utils/database.js";

const PORT = 2000 || process.env.PORT;
const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  method: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
morgan.token("current-date", () => {
  const now =
    new Date().toLocaleDateString() +
    " and Time is " +
    new Date().toLocaleTimeString();
  return now;
});

app.use(
  morgan(
    "Method is = :method , Status is = :status , Response time is = :response-time ms , Date is = :current-date "
  )
);
app.get("/", (req, res) => {
  res.json({
    port: "server is running on " + PORT,
  });
});
app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/subcategory", subCategoryRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

database().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
});
