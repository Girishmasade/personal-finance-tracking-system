
import bcrypt from 'bcrypt'
import User from '../models/user.model.js'

export const register = async(req, res) => {
    try {
        const {username, email, password} = req.body
       
        if (!username || !email || !password) {
            return res.status(400).json({success:false, message: "all fields required"})
        }

        const existingUser = await User.findOne({email})

        if (existingUser) {
            return res.status(400).json({success:false, message: "user already exists"})
        }

        const hashPassword = await bcrypt.hash(password, 10)

      const user = await User.create({
            username,
            email,
            password: hashPassword
        })

        // console.log(user);

        return res.status(200).json({success: true, message: 'User created successfully', user})

    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: error.message})
    }
}