import express from "express"
import { json } from "body-parser"
import { config } from "dotenv"
import { connect } from "mongoose"
import { API } from "./routes/api"
import morgan from "morgan"
//Variable And Constants
const PORT = process.env.PORT || 3000
const app = express();
config()
//Middlewares
app.use(morgan("dev"))
app.use(json())
API(app)
//Database Configuration
const uri = `mongodb+srv://${process.env.MONGO_NAME}:${process.env.MONGO_PASSWORD}@cluster0.el4a3.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(res => console.log("DB CONNECTED!")).catch(error => console.log("DB ERROR", error))
//Listning APP
app.listen(PORT, () => console.log(`APP IS RUNNING AT ${PORT}`))

