import express from "express";
import router from "./router.js";

const app = express();

// indicar para o express ler body em json
app.use(express.json());

// usar o router
app.use(router);

export default app;