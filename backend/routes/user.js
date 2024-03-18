const express=require('express');
const router=express.Router();
const zod=require('zod');
const jwt=require('jsonwebtoken')
const {User, Account} =require('../db')
const { JWT_TOKEN } =require('../config')
const { authMiddleware } =require('../middleware');

const signupSchema=zod.object({
    username:zod.string().email(),
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string()
})
router.post('/signup',async (req,res)=>{
    const body=req.body
    const {success}=signupSchema.safeParse(body);
    if(!success){
        return res.json({
            msg:'check your inputs'
        });
    }
    const user=await User.findOne({
        username:body.username
    })
    if (user && user._id) {
        return res.json({
            msg: 'Username is already taken'
        });
    }

    const dbUser=await User.create(body);
    const token=jwt.sign({
        userId:dbUser._id
    },JWT_TOKEN)

    await Account.create({
        userId:dbUser._id,
        balance:1+Math.random()*10000
    })

    res.json({
        msg:'user created',
        token:token
    })
})

const signinSchema=zod.object({
    username:zod.string().email(),
    password:zod.string()
});

router.post('/signin',async (req,res)=>{
    const body=req.body
    const {success}= signinSchema.safeParse(body);
    if(!success){
        return res.status(411).json({
            msg:'check your inputs'
        });
    }
    const user=await User.findOne({
        username:req.body.username,
        password:req.body.password
    });
    if(user){
        const token=jwt.sign({
            userId:user._id
        },JWT_TOKEN)
        res.json({
            token:token
        })
        return;
    }
    res.status(411).json({
        msg:'error while signing in'
    })
})

const updateSchema=zod.object({
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional()
});

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne(req.body, {
        id: req.userId
    })

    res.json({
        message: "Updated successfully"
    })
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})




module.exports=router;