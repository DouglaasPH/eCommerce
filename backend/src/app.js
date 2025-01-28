import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./router.js";

const app = express();

app.use(cookieParser());

app.use(
    cors({
        origin: 'http://localhost:4200',
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: "Content-Type, Authorization",
        credentials: true,
    })
);

// indicar para o express ler body em json
app.use(express.json());

// usar o router
app.use(router);

export default app;