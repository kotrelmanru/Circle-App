import { useForm } from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import *as yup from "yup";

export interface Iregister {
    fullname:string,
    email:string,
    password:string
}

const UseRegisterValidate =()=>{
    const initialValue : Iregister ={
        fullname:"",
        email:"",
        password:""
    }

    const schema = yup.object().shape({
        fullname: yup.string().required("Please Input Your Fullname").min(5,"enter fullname minimum 5"),
        email: yup.string().email().required("Please Input Your Email"),
        password :yup.string().required("Please Input Your Password").min(8,"enter password minimmum 8")
    })

    return useForm<Iregister>({
        defaultValues:initialValue,
        mode:"all",
        reValidateMode:"onBlur",
        resolver:yupResolver(schema)
    })
}

export default UseRegisterValidate