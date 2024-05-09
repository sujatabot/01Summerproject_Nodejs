import { Users } from "../models/users.models";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from"jsonwebtoken";

const secretKey ="Meowmeow"

const getUserDetail = async (req,res)=>{
    try{
   const userId = req.params.userId;
   const user = await Users.findOne({where:{
    id:userId
   }});
   if(!user){
    return res.status(404).json({message:"User not found"})
   }
   res.status(200).json(user);

    }catch(error){
  console.error("Error fetching data",error)
  res.status(500).json({message:"Internal server problems"})

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
export {getUserDetail,deleteUser};