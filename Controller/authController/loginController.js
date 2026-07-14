import User from "../../Modals/teamModal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const loginUser = async(req,res)=>{

try{

const {email,password}=req.body;


if(!email || !password){

return res.status(400).json({
success:false,
message:"Email and Password are required"
});

}


// Find user

const user = await User.findOne({
email:email.toLowerCase()
});


if(!user){

return res.status(401).json({
success:false,
message:"Invalid Email or Password"
});

}



// Check password

const match = await bcrypt.compare(
password,
user.password
);


if(!match){

return res.status(401).json({
success:false,
message:"Invalid Email or Password"
});

}



// Create JWT

const token = jwt.sign(

{
id:user._id,
email:user.email,
role:user.role
},

process.env.JWT_SECRET,

{
expiresIn:"7d"
}

);



res.status(200).json({

success:true,

message:"Login Successfully",

token,

user:{
_id:user._id,
name:user.name,
email:user.email,
role:user.role
}

});


}catch(error){

res.status(500).json({
success:false,
message:error.message
});

}

};