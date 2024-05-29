"use client";

import { useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/inputs/Inputs";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";

const Login = () => {

    const [isLoading, setIsLoading] = useState(false)
    const  {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
        defaultValues:{
            email: "",
            password: ""
        }
    })

    const onSubmit:SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        console.log(data)
    }


    return (
        <>
        <Heading title="Login"/>
        <Button
        outline
        label="Log in with google"
        icon={AiOutlineGoogle}
        onClick={() => {}}
        />
        <hr className="bg-slate-300 w-full h-px"/>

        <Input 
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        />
        <Input 
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
        />
        <Button label = {isLoading ? "Loading" : "Log in"} 
        onClick={handleSubmit(onSubmit)}
        />
        <p className="text-sm">
            A new customer? <Link className="underline"
            href="/register">
                Create an account
            </Link>
        </p>
        </>
    );
}
 
export default Login;