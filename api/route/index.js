import { Router } from "express";
import { register , loginUser } from "../controller/user";
const rootRoute = Router()

rootRoute.use('/auth/signup',register);
rootRoute.use('/auth/signin',loginUser);


export default rootRoute