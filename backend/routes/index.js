const express=require('express');
const userRouter=require('./user');
export const router=express.Router();

router.use('/user',userRouter);