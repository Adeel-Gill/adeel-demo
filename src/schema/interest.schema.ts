import { Schema, model } from "mongoose";
const userInterests: Schema = new Schema({
    Interest: {
        type: Array,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }

});
const userInterest = model("userInterests", userInterests)
export { userInterest }