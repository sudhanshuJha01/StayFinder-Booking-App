import User from "../model/user"
import bcrypt from "bcrypt"
export const register = async (req , res)=>{
    try {
        const {name , email , password}=req.body
        const user = await User.findOne({email})
        if(user){
            return res.status(403).json({
                success:false,
                msg:"user already registerd",
                user
            })
        }
        const hashedPassword = bcrypt.hashSync(password , 12)

        const newUser = new User({
            name , email , password:hashedPassword
        })

        await newUser.save()

        return res.staus(202).json({
            success:true,
            msg:"user is registed successfully"
        })
    } catch (error) {
        console.log("error in register " , err);
        res.staus(500).json({
            success:false,
            msg:'user register server error '
        })
        
    }
}


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

    const camparedPassword = await bcrypt.compare(hashpassword, password);
    if (!camparedPassword) {
      return res.status(409).json({
        success:false,
        msg: "user password is wrong",
      });
    }

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