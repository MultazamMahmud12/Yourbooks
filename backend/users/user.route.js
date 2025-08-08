const express = require('express');
const router = express.Router();    
const bcrypt = require('bcrypt'); 
const User = require('./user.model');  
const jwt = require('jsonwebtoken');
const JWT_SECRET  = process.env.JWT_SECRET_KEY;
router.post("/admin",async (req, res) => {
    const {username,password} = req.body; 
    try {
        const admin = await User.findOne({username});
        if(!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
          const isPasswordValid = password === admin.password;
        console.log('🔑 Password valid:', isPasswordValid);
        
        if (!isPasswordValid) {
            return res.status(401).json({ 
                success: false,
                message: "Invalid credentials" 
            });
        }
        

        const token = jwt.sign(
            {id: admin._id, username : admin.username, role : admin.role}
        , JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
            success: true,
            message: "Admin authenticated successfully",
            token: token,                   
            user: {
                id: admin._id,
                username: admin.username,
                role: admin.role
            }
        });
    } catch (error) {
        console.error("Error in admin route:", error);
        res.status(500).json({ message: "Internal Server Error" });
        
    }

})

module.exports = router;
