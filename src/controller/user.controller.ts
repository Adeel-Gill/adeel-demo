import { user } from "../schema/user.schema";
import { Request, Response } from "express";
import { Error } from "mongoose"
import { userInterest } from "../schema/interest.schema";
import { ILogin } from "../@types/user.dto";
import { compareSync } from "bcrypt"
import * as jwt from "jsonwebtoken"
class User {
  constructor() {
    this.getUserByEmail = this.getUserByEmail.bind(this)
    this.createUser = this.createUser.bind(this)
  }
  async login(req: Request, res: Response) {
    const { email, password }: ILogin = req.body
    return user.findOne({
      email: email
    }, async function (err: Error, user: any) {
      if (err) throw err;
      const flag = await compareSync(password, user.password)
      if (!flag || !user) {
        return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
      }
      return res.json({ token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, 'RESTFULAPIs') });
    });
  }
  async getUserByEmail(email: string) {
    const User = await user.findOne({ email })
    return User
  }
  async createUser(req: Request, res: Response) {
    const body = req?.body;
    const flag = await this.getUserByEmail(body?.email)
    if (flag) {
      return res.status(200).json({
        message: "User Already Exists!",
        data: null,
        error: true
      })
    }
    return user.create(body, function (err, result) {
      if (!err)
        return res.status(200).json({
          message: "User Created Successfully!",
          data: result,
          error: false
        })
      return res.status(200).json({
        message: "User Created Failed!",
        data: err,
        error: true
      })
    });
  }
  async getUserProfile(req: Request, res: Response) {
    const _id = req?.params?.id
    const result = await userInterest.aggregate(
      [
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user'
          }
        }]
    )
    return res.status(200).json({
      message: "User Results!",
      data: result,
      error: false
    })
  }
}
export { User }