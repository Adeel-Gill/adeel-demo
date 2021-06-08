import { userInterest } from "../schema/interest.schema";
import { Request, Response } from "express";
class Interest {
    constructor() {
        this.getInterestByUserId = this.getInterestByUserId.bind(this)
        this.createInterest = this.createInterest.bind(this)
    }
    async getInterestByUserId(_id: string) {
        const User = await userInterest.findOne({ userId: _id })
        return User
    }
    async createInterest(req: Request, res: Response) {
        const body = req?.body;
        const flag = await this.getInterestByUserId(body?.userId)
        if (flag) {
            return userInterest.findOneAndUpdate({ userId: body.userId }, body, {}, function (err, result) {
                if (!err)
                    return res.status(200).json({
                        message: "Interest Updateed Successfully!",
                        data: result,
                        error: false
                    })
                return res.status(200).json({
                    message: "Interest Updated Failed!",
                    data: err,
                    error: true
                })
            });

        }
        return userInterest.create(body, function (err, result) {
            if (!err)
                return res.status(200).json({
                    message: "Interest Created Successfully!",
                    data: result,
                    error: false
                })
            return res.status(200).json({
                message: "Interest Created Failed!",
                data: err,
                error: true
            })
        });
    }
}
export { Interest }