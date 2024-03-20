import { useState } from "react";
import { BottomWarning } from "../components/Bottomwarning";
import {Button} from "../components/Button";
import {Heading} from '../components/Heading';
import {SubHeading} from '../components/SubHeading'
import {InputBox} from '../components/InputBox'
import axios from 'axios'
import { useNavigate } from "react-router-dom";



export const Signup=()=>{
    const [firstName,SetFirstName]=useState('');
    const [lastName,SetLastName]=useState('');
    const [username,SetUsername]=useState('');
    const [password,SetPassword]=useState('');
    const navigate=useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign up"}/>
                <SubHeading label={"Enter your information to create an account"}/>
                <InputBox onChange={e=>{
                    SetFirstName(e.target.value);
                }} placeholder={"john"} label={"First Name"}/>
                <InputBox onChange={e=>{
                    SetLastName(e.target.value)
                }} placeholder={"doe"} label={"Last Name"}/>
                <InputBox onChange={e=>{
                    SetUsername(e.target.value)
                }} placeholder={'abcdef@gmail.com'} label={'Email'}/>
                <InputBox onChange={e=>{
                    SetPassword(e.target.value)
                }} placeholder={'123456'} label={'Password'}/>

                <div className="pt-4">
                    <Button onClick={async()=>{
                        const response=await axios.post('http://localhost:3000/api/v1/user/signup',{
                            username,
                            firstName,
                            lastName,
                            password
                        });
                        localStorage.setItem('token',response.data.token);
                        navigate('/dashboard')
                    }} label={'sign up'}/>
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
            </div>
        </div>
    </div>
}



