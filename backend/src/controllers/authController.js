import JWT  from "jsonwebtoken"
import User from "../models/User.js"
import bcrypt from "bcryptjs"

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password){
            return res.status(400).json({message: 'harap isi semua field' });
        }

        const userExist = await User.findOne({ email })
        if (userExist){
            return res.status(400).json({ message: 'Email sudah terdaftar' })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({
            username, email, password: hashedPassword
        })
        if (newUser){
            res.status(201).json({
                _id : newUser._id,
                username : newUser.username,
                email : newUser.email,
                isAdmin : newUser.isAdmin,
                token : generateToken(newUser._id)
            });
        } else {
            res.status(401).json({ message: 'Data user tidak valid' })
        }
    } catch(error){
        res.status(500).json({ message: error.message })
    }
}

const generateToken = (id) => {
  return JWT.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d", 
  });
};

const login = async (req, res) => {
    try {
        const { email , password } = req.body;
        const user = await User.findOne({ email })

        if ( user && (await bcrypt.compare(password, user.password)) ){
            res.json({
                _id : user._id,
                username : user.username,
                email : user.email,
                isAdmin : user.isAdmin,
                token : generateToken(user._id)
            })
        } else {
            res.status(402).json({ message : "email atau sandi salah" })
        }
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}

export { register, login };