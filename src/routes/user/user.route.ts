import { User } from "../../controller/user.controller"
import { Router } from "express"
const Controller = new User()
const user = Router()
user.post("/", Controller.createUser)
user.get("/:id", Controller.getUserProfile)
user.post("/login", Controller.login)
export { user }