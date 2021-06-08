interface IUser {
    id?: string;
    name: string
    email: string
    profilePicture: string
    token: string
    password: string
}
interface ILogin {
    email: string;
    password: string
}
export { IUser, ILogin }