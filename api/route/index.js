import { Router } from "express";
import { register , loginUser } from "../controller/user.js";
const rootRoute = Router()

rootRoute.post('/auth/signup',register);
rootRoute.post('/auth/signin',loginUser);


export default rootRoute