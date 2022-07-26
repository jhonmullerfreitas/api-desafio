import express from "express"
import routes from "./routes/routes";

const app = express();

app.use(express.json())

app.use(routes)

app.listen(process.env.PORT || 3000);