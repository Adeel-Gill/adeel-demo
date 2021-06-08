import { user } from "./user/user.route"
import { interest } from "./userInterest/interest.route"
function API(app: any) {
    app.use("/api/users", user)
    app.use("/api/interest", interest)
}
export { API }