const router = require("express").Router();
const User = require("../models/User")
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken")
const referralCodeGenerator =  require ('referral-code-generator')
const mongoose = require("mongoose");
const dotenv = require("dotenv");



// REGISTER
router.post("/register", async (req, res) => {

    const level1 = {
        link: referralCodeGenerator.alpha('uppercase', 12),
        address: null,

    }
    const level2 = {
        link: referralCodeGenerator.alpha('uppercase', 12),
        address: null,
    }
    const level3 = {
        link: referralCodeGenerator.alpha('uppercase', 12),
        address: null,

        
    }
    const level4 = {
        link: referralCodeGenerator.alpha('uppercase', 12),
        address: null,

    }
    const level5 = {
        link: referralCodeGenerator.alpha('uppercase', 12),
        address: null,

    }

    const refferal = [
        level1,
        level2,
        level3,
        level4,
        level5
    ]

    const newUser = new User({
        username: req.body.username,
        address: req.body.address,
        refferal: refferal
    });
    

    try{
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
        
    }
    catch(e) {
        res.status(500).json(e)
    }

   
})

router.post("/finduser", async (req, res) =>{
    try{
        console.log(req.body.address)
        const user = await User.findOne({address: req.body.address})
        console.log(user)
        res.status(201).json(user);

        
    }
    catch(e){
        console.log(e)
    }
})

router.get("/delete", async (req, res) => {
    try{
        // const user = await User.findOneAndDelete({link: "D0588392B0851682B1499124Q0777288W6181012S5437155U8750740O3698125"});
        const user = await User.updateOfne({_id:"629ed691eca5ee6968d1fddb"}, {$pull: {link: "T5547402D4091284P1083500R1047195E5436356U7164292Y1978585J3317496"}})
        console.log(user)
    }
    catch(e){
        console.log(res.status(500).json(e))
    }
})

router.post("/unpaiduser",async(req,res)=> {
    try{
        const user = await User.find({refferal: {$elemMatch:{link:req.body.link}}})
        if(user !== null) {
            user.map(async (arr) => {
               let referalInfo = arr.refferal.filter((obj) => {
                return obj.link === req.body.link
                
               })
               referalInfo = referalInfo[0]
               console.log(referalInfo._id)
               

               if(referalInfo.address === null){
               const hello = await User.updateOne({"refferal._id":referalInfo.id},{$set:{"refferal.$.address":req.body.address}});
               }
               else{
                   res.json("User Code Expired")
               }

               
            })

        }


       
    }
    catch(e){
        res.json(e)
    }
})


// LOGIN
// router.post("/login", async(req, res) => {

//     try{
//     const user = await User.findOne({username: req.body.username});
//     console.log("user", user)
//     !user && res.status(401).json("Wrong Credentials!")
//     const hashedPassword = CryptoJs.AES.decrypt(user.password, process.env.PASS_SEC);
//     const OriginalPassword = hashedPassword.toString(CryptoJs.enc.Utf8)
//     OriginalPassword !== req.body.password && res.status(401).json("Wrong Password");
    
//     const accessToken = jwt.sign({
//         id: user.id,
//         isAdmin: user.isAdmin,
//     }, process.env.JWT_SEC,
//         {expiresIn: "3d"}
//     );

//     const {password, others} = user._doc;
//     res.status(200).json({others, accessToken});
//     }
//     catch(e){
//         res.status(500).json(e)
//     }

// })

module.exports = router