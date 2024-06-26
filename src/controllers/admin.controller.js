import { Users } from "../models/users.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from"jsonwebtoken";

const secretKey ="Meowmeow"

const loginAdmin = asyncHandler(async (req, res) => {
  try{
  const { email, password } = req.body;

  const user = await Users.findOne({ where: { email, password } });
  console.log("user",user);

  if (user.isAdmin) {
    jwt.sign({ user }, secretKey, (err, token) => {
      if (err) {
        console.error("Error generating token:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      res.status(200).json({
        message: "login Successful",
        token,
        isAdmin: user.isAdmin,
        
      });
    });
  } else {
    return res.json("unvalid user or password");
  }
} catch (error) {
  res.status(500).json("somenthing went wrong");
}
});

const getUserDetail = async (req, res) => {
  try {
      const users = await Users.findAll(); // findall bhaney data base ko fucntion ho sabai lai find garxa
      if (!users || users.length === 0) { // users bhetayena bhaney error fyaleko 
          return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(users);
  } catch (error) {
      console.error("Error fetching data", error);
      res.status(500).json({ message: "Internal server problems" });
  }
};

const deleteUser = async(req,res)=>{
    try{
    const userId = req.params.userId;
    const user = await Users.findOne({where:{id:userId

    }})
    if(!user){
        return res.status(404).json({message:"Something went wrong"})

    }

    await Users.destroy({where:{id:userId}});
    res.status(200).json({message:"successfully deleted the User"})
}catch(error){
 console.error("Error detected:", error);
 res.status(500).json({message:"Internal server problem"})

}
};

const updateUser= async(req,res)=>{
    try{
      const userId = req.params.userId;
      const {email,username} =req.body;

      const user = await Users.findOne({where:{id:userId}});

      if(!user){
        return res.status(404).json({message:"User not availablewith thsi id"})
      }

      user.email = email;
      user.username = username;
      await user.save();

      res.status(200).json({message:"Updated user successfully"}

      );
    }catch(error){
        console.error("Error updating user",error);
        res.status(500).json({message:"Internal error"})


    }
}

 export {getUserDetail,deleteUser,updateUser, loginAdmin};