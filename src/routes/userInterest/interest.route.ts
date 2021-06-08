import { Interest } from "../../controller/interest.controller"
import { Router } from "express"
const Controller = new Interest()
const interest = Router()
interest.post("/", Controller.createInterest)
export { interest }