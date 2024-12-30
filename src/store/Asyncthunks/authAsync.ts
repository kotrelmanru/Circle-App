import { createAsyncThunk } from "@reduxjs/toolkit";
import { API,setAuthToken } from "../../lib/api";
import { IAuthor } from "../../types/app";
import { toast } from "react-toastify";


interface Ilogin {
    email:string,
    password:string
}
interface Iregister{
    fullname:string,
    email:string,
    password:string
}

export const registerAsync = createAsyncThunk<
Iregister,
Iregister,
{ rejectValue :string}>(
    "auth/register",async (props ,{ rejectWithValue}) =>{
        try {
            console.log(props);
            const {data} = await API.post("/auth/register",props)

            console.log(data);
            
            return data.data
        } catch (error) {
            return rejectWithValue("error")
        }
    }
)

const waitForToastToClose = (duration :number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, duration);
    });
  };

export const loginAsync = createAsyncThunk<
   string,
   Ilogin,
   { rejectValue: string }
>("auth/login", async (props, { rejectWithValue }) => {
   try {
      console.log("props", props);
      const { data } = await API.post("/auth/login", props);
      toast.success("Login Success", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark"
          
        });

        await waitForToastToClose(1500);
      
        console.log("data", data.token);
        const token = data.token;
        setAuthToken(token);
        localStorage.setItem("token", token);
      return token;
   } catch (error) {
    toast.error("Login failed, Please check your inputs and try again.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return rejectWithValue("error");
      
   }
});

export const authCheckAsync = createAsyncThunk<
IAuthor,
string,
{rejectValue:string}>(
    "auth/authcheck",async (_ ,{ rejectWithValue}) =>{
        try {
            const {data} = await API.get("/user/login",{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log(data.data);
            return data.data
        } catch (error) {
            return rejectWithValue("error");
        }
    }
)

export const logoutAsync = createAsyncThunk<
  void,
  void, 
  { rejectValue: string } 
>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      toast.success("Logout Successful", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        onClose:()=>{
          localStorage.removeItem("token");

      setAuthToken('');
        }
      });

      return;
    } catch (error) {
      toast.error("Logout failed, Please try again.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      return rejectWithValue("error");
    }
  }
);