import User from "../model/user.js";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const checkUser = await User.findOne({ email })
    if (checkUser) {
      return res.status(409).json({
        success:false,
        msg: "User already registerd",
        user: checkUser,
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashpassword = bcrypt.hashSync(password, salt);
    const user = new User({
      name,
      email,
      password: hashpassword,
    });

   const newUser= await user.save();

    return res.status(201).json({
        success: true,
       msg: "user saved successfuly",
       newUser
    });
  } catch (error) {
    console.log("error in the user register ", error);
    return res.status(500).json({
     success: false,
      msg: "user register server error",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    
    if (!user) {
      return res.status(403).json({
        success:false,
        msg: `user is not registerd`,
      });
    }

    const hashpassword = user.password;

    
    const comparedPassword = bcrypt.compareSync(password,hashpassword);

    if (!comparedPassword) {
      return res.status(409).json({
        success:false,
        msg: "user password is wrong",
      });
    }
    console.log("here ");
    
    user.password = undefined;

    const token =jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECERET
    );

    res.cookie("access-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", 
      path: "/",
    });

    return res.status(200).json({
      success: true,
      user,
      msg: "user signed in successfuly",
    });
  } catch (error) {
    console.log("error in signup ", error);
    return res.status(500).json({
      success:false,
      msg:'error in the login'
    })
  }
};


export const logoutUser = async (req ,res)=>{
  try {
        res.clearCookie("access-token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", 
      path: "/",
    });

    return res.status(200).json({
      success: true,
      msg: "user logged out successfuly",
    });
  } catch (error) {
    res.status(500).json({
      success:false,
      msg:"server error in logged out"
    })
  }
}